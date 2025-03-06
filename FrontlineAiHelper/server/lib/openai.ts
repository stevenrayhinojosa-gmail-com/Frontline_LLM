import OpenAI from "openai";
import { vectorStore } from "./vectorstore";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are a specialized AI assistant for the Frontline Education platform. You help educators navigate and use Frontline Education's software solutions.

Your responses should:
1. Be focused exclusively on Frontline Education's products and services
2. Only use the context provided to answer questions
3. If you cannot find relevant information in the context, admit that you don't know
4. Format responses using markdown when appropriate
5. Keep responses concise and clear

If a query seems unrelated to the provided context about Frontline Education, politely explain that you can only assist with Frontline Education related topics.`;

export async function getChatResponse(message: string): Promise<string> {
  try {
    // Get relevant context from vector store
    const contextDocs = await vectorStore.query(message);
    const context = contextDocs.join('\n\n');

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Context: ${context}\n\nQuestion: ${message}` }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content || "I apologize, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to get response from AI service");
  }
}