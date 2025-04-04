import { MongoClient } from 'mongodb';
import { FormSchema } from '../entities/definitions';
import { z } from 'zod';
import { unstable_noStore } from 'next/cache';

const uri: string = process.env.MONGODB_URI || "";
if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so the MongoClient is not constantly recreated
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb() {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB);
}

export async function getAllWordDB() {
  unstable_noStore();
  const db = await getDb();
  const getDataCollection = await db.collection('db_words').find().toArray();
  const validatedData = z.array(FormSchema).parse(getDataCollection);
  const getCountDocuments = await db.collection('db_words').countDocuments();
  return [validatedData, getCountDocuments] as const;
}
