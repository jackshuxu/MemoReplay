"use server";

import db from "@/db/drizzle";
import { imageQuestions, images } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

interface Question {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
}

export async function generateQuestionsForImage(imageId: number) {
  const { userId } = await auth();

  try {
    // Fetch the image from the database
    const imageRecord = await db.query.images.findFirst({
      where: eq(images.id, imageId),
    });

    if (!imageRecord) {
      throw new Error("Image not found");
    }

    // System prompt to specify the format
    const systemPrompt = `You are an expert in reminiscence therapy. Analyze the image and create 20 multiple-choice questions that will help the user recall details about their life and memories. Each question should have exactly 4 options.

    The first 10 questions should have an objectively correct answer based on the contents of the image: do not infer anything about the user's life. Please list the correct answer in the "correctAnswer" field: spread the correct answers evenly across options A, B, C, and D.

    The second 10 questions should prompt the user to think about their life more reflectively and not have an objective answer. For these questions, set the correctAnswer field to null.

    Format your response in the following JSON structure. Please do not enclose it in a code block: just the plain text will suffice.
    {
      "questions": [
        {
          "question": "string",
          "optionA": "string",
          "optionB": "string",
          "optionC": "string",
          "optionD": "string",
          "correctAnswer": "string" | null // should be one of: "optionA", "optionB", "optionC", "optionD", or null - as per above
        }
      ]
    }`;

    // Make the API call to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please generate questions based on this image that will help with reminiscence therapy.",
            },
            {
              type: "image_url",
              image_url: {
                url: imageRecord.filePath,
                detail: "high",
              },
            },
          ],
        },
      ],
      max_tokens: 4096,
      temperature: 0.7,
    });

    // Parse the response
    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content received from OpenAI");
    }

    // TODO: add better validation to responses from OpenAI
    console.log(content);

    const parsedContent = JSON.parse(content);
    const questions: Question[] = parsedContent.questions;

    // Insert questions into the database
    const questionInserts = questions.map((question) => ({
      imageID: imageId,
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

    return {
      success: true,
      questionsGenerated: questions.length,
    };
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
}
