import { users, type User, type InsertUser } from "@shared/schema";
import { messages, type Message, type InsertMessage } from "@shared/schema";
import { vectorStore } from "./lib/vectorstore";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(): Promise<Message[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private messages: Message[];
  currentId: number;

  constructor() {
    this.users = new Map();
    this.messages = [];
    this.currentId = 1;
    this.initialize();
  }

  private async initialize() {
    try {
      await vectorStore.initialize();
      console.log("Vector store initialized successfully");
    } catch (error) {
      console.error("Failed to initialize vector store:", error);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messages.length + 1;
    const message: Message = {
      id,
      content: insertMessage.content,
      role: insertMessage.role,
      timestamp: new Date(),
    };
    this.messages.push(message);
    return message;
  }

  async getMessages(): Promise<Message[]> {
    return this.messages;
  }
}

export const storage = new MemStorage();