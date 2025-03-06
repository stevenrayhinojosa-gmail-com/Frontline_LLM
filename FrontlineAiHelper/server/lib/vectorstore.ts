import { ChromaClient, Collection, OpenAIEmbeddingFunction } from 'chromadb';
import path from 'path';
import fs from 'fs/promises';

interface Document {
  title: string;
  content: string;
  url: string;
}

class VectorStore {
  private client: ChromaClient;
  private collection: Collection | null = null;
  private embedding: OpenAIEmbeddingFunction;

  constructor() {
    this.client = new ChromaClient();
    this.embedding = new OpenAIEmbeddingFunction(process.env.OPENAI_API_KEY || '');
  }

  async initialize(): Promise<void> {
    // Create or get collection
    this.collection = await this.client.createCollection({
      name: "frontline_docs",
      embeddingFunction: this.embedding
    });
  }

  async addDocuments(documents: Document[]): Promise<void> {
    if (!this.collection) throw new Error("Collection not initialized");

    // Process documents in batches
    const batchSize = 20;
    for (let i = 0; i < documents.length; i += batchSize) {
      const batch = documents.slice(i, i + batchSize);
      await this.collection.add({
        ids: batch.map((_, idx) => `doc_${i + idx}`),
        documents: batch.map(doc => doc.content),
        metadatas: batch.map(doc => ({ title: doc.title, url: doc.url }))
      });
    }
  }

  async query(question: string, numResults: number = 3): Promise<string[]> {
    if (!this.collection) throw new Error("Collection not initialized");

    const results = await this.collection.query({
      queryTexts: [question],
      nResults: numResults
    });

    return results.documents[0] || [];
  }
}

export const vectorStore = new VectorStore();
