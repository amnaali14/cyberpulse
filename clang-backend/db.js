const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Connection string for local MongoDB
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect(); // Connect to MongoDB
        console.log("✅ Connected to MongoDB successfully!");
        return client.db("ai_vas"); 
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err);
    }
}

module.exports = connectDB;
