Frontline Education Chatbot

Overview

This project is an AI-powered chatbot designed to assist educators as they navigate the Frontline Education SaaS platform. The chatbot is trained exclusively on publicly available Frontline Education resources and ensures users receive accurate, context-aware support while interacting with the software.

Features

Real-time Assistance: Provides instant help for educators using Frontline Education.

Context-Aware Responses: Pulls information only from Frontline-related documentation.

Clever Filtering: Redirects users if queries are outside the scope of Frontline Education.

FastAPI Backend: A lightweight API to serve chatbot responses.

ChromaDB for Knowledge Retrieval: Stores and retrieves relevant Frontline Education data.

LangChain Integration: Enhances query processing and information retrieval.

Tech Stack

FastAPI - Backend framework

ChromaDB - Vector database for efficient data retrieval

LangChain - Query processing and retrieval

OpenAI API (or Local Model) - Natural language processing

BeautifulSoup/Scrapy - Web scraping for data collection

Replit - Initial development environment

VS Code - Fine-tuning and deployment

Setup Instructions

Clone the Repository

git clone https://github.com/stevenrayhinojosa-gmail-com/frontline-chatbot.git
cd frontline-chatbot

Create a Virtual Environment & Install Dependencies

python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt

Run the API

uvicorn app.main:app --reload

Access the Chatbot
Open your browser and go to http://127.0.0.1:8000/docs to test the API.

How It Works

Data Collection: Publicly available Frontline Education resources are scraped and stored.

Data Processing: Text is chunked, embedded using OpenAI or a local model, and stored in ChromaDB.

Query Handling: Users' queries are matched with stored knowledge, retrieving relevant responses.

Response Filtering: If a query is unrelated to Frontline Education, a custom message is returned.

Future Enhancements

Deploy a Web UI for better user interaction.

Integrate Speech-to-Text for accessibility.

Expand Dataset with more structured resources from Frontline Education.

Connect with Me

GitHub: stevenrayhinojosa-gmail-com

LinkedIn: Steven Hinojosa

License

This project is for demonstration purposes and is not affiliated with or endorsed by Frontline Education.

