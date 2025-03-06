import { scrapeFrontlineDocs, saveDocuments } from './lib/scraper';
import { vectorStore } from './lib/vectorstore';

async function setupSystem() {
  try {
    console.log('Starting system setup...');
    
    // Scrape Frontline documentation
    console.log('Scraping Frontline documentation...');
    const documents = await scrapeFrontlineDocs();
    await saveDocuments(documents);
    console.log(`Scraped and saved ${documents.length} documents`);
    
    // Initialize vector store
    console.log('Initializing vector store...');
    await vectorStore.initialize();
    
    // Add documents to vector store
    console.log('Adding documents to vector store...');
    await vectorStore.addDocuments(documents);
    console.log('Documents added to vector store');
    
    console.log('Setup completed successfully');
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
}

setupSystem();
