"use server";

import db from "@/db/drizzle";
import { imageQuestions, images } from "@/db/schema";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { generateQuestionsForImage } from "./openai";

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadImageToS3(formData: FormData) {
  const { userId } = auth();

  try {
    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("No file provided");
    }

    // Convert File to Buffer for S3 upload
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `uploads/${Date.now()}-${file.name}`;

    // Upload to S3
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
        // ACL: "public-read",
      })
    );

    // Generate public URL
    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    // Generate questions using OpenAI
    const openAiQuery = await generateQuestionsForImage(imageUrl);

    if (openAiQuery.success) {
      // Save image and questions to database
      // Save image record
      const [image] = await db
        .insert(images)
        .values({
          userId: userId!,
          filePath: imageUrl,
          // TODO: add dateAdded, dateTaken, lat/lon
        })
        .returning();

      // Insert questions into the database
      const questions = openAiQuery.questions;

      const questionInserts = questions.map((question) => ({
        imageID: image.id,
        userId: userId!,
        questionText: question.question,
        optionA: question.optionA,
        optionB: question.optionB,
        optionC: question.optionC,
        optionD: question.optionD,
        correctAnswer: question.correctAnswer,
      }));

      // Batch insert all questions
      await db.insert(imageQuestions).values(questionInserts);
    }

    revalidatePath("/learn");

    return {
      success: true,
      imageUrl,
      questionsCount: openAiQuery.questions?.length || 0,
    };
  } catch (error) {
    console.error("Error in uploadImageToS3:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to upload image"
    );
  }
}
