import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatRequestSchema, insertMessageSchema } from "@shared/schema";
import { getChatResponse } from "./lib/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = chatRequestSchema.parse(req.body);

      // Store user message
      const userMessage = await storage.createMessage({
        content: message,
        role: "user"
      });

      // Get AI response
      const aiResponse = await getChatResponse(message);

      // Store AI response
      const assistantMessage = await storage.createMessage({
        content: aiResponse,
        role: "assistant"
      });

      res.json(assistantMessage);
    } catch (error) {
      console.error("Chat API Error:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "An unexpected error occurred"
      });
    }
  });

  app.get("/api/messages", async (_req, res) => {
    try {
      const messages = await storage.getMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
