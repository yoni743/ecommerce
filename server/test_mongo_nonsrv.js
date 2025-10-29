const { MongoClient } = require("mongodb");

// Notice: The '@' in password is encoded as %40
const uri = "mongodb://ecommerceUser:Qwert1234%40@ac-lcayjhp-shard-00-00.idutnqw.mongodb.net:27017,ac-lcayjhp-shard-00-01.idutnqw.mongodb.net:27017,ac-lcayjhp-shard-00-02.idutnqw.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-kup2w1-shard-0&authSource=admin&retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Non-SRV: Connected successfully to MongoDB Atlas!");
  } catch (err) {
    console.error("❌ Non-SRV connection failed:", err);
  } finally {
    await client.close();
  }
}

run();
