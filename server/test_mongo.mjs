import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('❌ MONGODB_URI is not set in environment');
  process.exit(1);
}

console.log('🔗 Trying to connect to MongoDB Atlas...');
const client = new MongoClient(uri);

try {
  await client.connect();
  console.log('✅ Connected successfully to MongoDB Atlas!');
  const admin = client.db().admin();
  const dbs = await admin.listDatabases();
  console.log('📚 Databases:', dbs.databases.map(d => d.name));
} catch (err) {
  console.error('❌ MongoDB Connection Failed:', err.message);
  process.exitCode = 1;
} finally {
  await client.close();
}
