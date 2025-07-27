const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://rdoptdomal:Helena2270184!@ferratech.wbmjhml.mongodb.net/?retryWrites=true&w=majority&appName=ferratech";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function testConnection() {
  try {
    console.log('🔌 Conectando ao MongoDB...');
    
    // Connect the client to the server
    await client.connect();
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Pinged your deployment. You successfully connected to MongoDB!");
    
    // Test database operations
    const db = client.db("ferratech");
    
    // Test creating a collection
    const testCollection = db.collection("test");
    await testCollection.insertOne({ 
      test: "connection", 
      timestamp: new Date() 
    });
    console.log("✅ Test collection created and document inserted");
    
    // Test reading
    const result = await testCollection.findOne({ test: "connection" });
    console.log("✅ Document read successfully:", result);
    
    // Clean up test data
    await testCollection.deleteOne({ test: "connection" });
    console.log("✅ Test data cleaned up");
    
    console.log("🎉 All MongoDB tests passed!");
    
  } catch (error) {
    console.error("❌ Error testing MongoDB connection:", error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("🔌 Connection closed");
  }
}

testConnection().catch(console.dir); 