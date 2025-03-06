import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';

// Base URLs for Frontline documentation
const FRONTLINE_DOCS_URLS = [
  'https://www.frontlineeducation.com/solutions/',
  'https://www.frontlineeducation.com/resources/',
  // Add more URLs as needed
];

interface ScrapedDocument {
  title: string;
  content: string;
  url: string;
}

export async function scrapeFrontlineDocs(): Promise<ScrapedDocument[]> {
  const documents: ScrapedDocument[] = [];

  for (const baseUrl of FRONTLINE_DOCS_URLS) {
    try {
      const response = await axios.get(baseUrl);
      const $ = cheerio.load(response.data);
      
      // Remove unnecessary elements
      $('nav, footer, script, style, header').remove();
      
      // Extract main content
      const content = $('main, article, .content').text().trim();
      const title = $('title').text().trim();
      
      if (content) {
        documents.push({
          title,
          content: content.replace(/\s+/g, ' '), // Normalize whitespace
          url: baseUrl
        });
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`Error scraping ${baseUrl}:`, error);
    }
  }

  return documents;
}

// Save documents to disk
export async function saveDocuments(documents: ScrapedDocument[]): Promise<void> {
  const dataDir = path.join(process.cwd(), 'data');
  await fs.mkdir(dataDir, { recursive: true });
  
  await fs.writeFile(
    path.join(dataDir, 'frontline_docs.json'),
    JSON.stringify(documents, null, 2)
  );
}
