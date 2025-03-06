import chromadb

# Initialize ChromaDB in persistent mode (saves data)
chroma_client = chromadb.PersistentClient(path="./chroma_db")

# Create a collection (like a table in SQL)
collection = chroma_client.get_or_create_collection(name="frontline_resources")

# Manually add Frontline-related information
collection.add(
    ids=["doc1", "doc2"],
    documents=[
        "Frontline Education provides software solutions for K-12 school management.",
        "Frontline’s Professional Growth platform helps educators track and complete PD requirements."
    ],
    metadatas=[{"source": "frontline_website"}, {"source": "frontline_support"}]
)

print("Frontline data added to ChromaDB successfully.")
