'use server'

import { z } from "zod";
import { getDb } from "./mongodb";
import { revalidatePath } from "next/cache";

const FormSchema = z.object({
  id: z.number(),
  compare_id: z.number(),
  english_word: z.string(),
  vietnamese_word: z.string()
});

let limit = 10;

export async function getListWord() {
  const db = await getDb();
  const getDataCollection = await db.collection('db_words').aggregate([{ $sample: { size: 20 } }]).toArray();
  const validatedData = z.array(FormSchema).parse(getDataCollection);
  return validatedData;
}

export async function getListWordLimit() {
  const db = await getDb();
  const getDataCollection = await db.collection('db_words').find({}).limit(limit).toArray();
  const validatedData = z.array(FormSchema).parse(getDataCollection);
  const getCountDocuments = await db.collection('db_words').countDocuments();
  return [validatedData, getCountDocuments] as const;
}

export async function getMoreListWord() {
  limit += 10;
  revalidatePath('/list-words');
}