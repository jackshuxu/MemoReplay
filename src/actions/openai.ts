"use server";

import { images, imageQuestions } from "@/db/schema";
import OpenAI from "openai";
import { eq } from "drizzle-orm";
import db from "@/db/drizzle";

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

    Format your response in the following JSON structure. Please do not enclose it in a code block: just the plain text will suffice.
    {
      "questions": [
        {
          "question": "string",
          "optionA": "string",
          "optionB": "string",
          "optionC": "string",
          "optionD": "string",
          "correctAnswer": "string" // should be one of: "optionA", "optionB", "optionC", or "optionD"
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
