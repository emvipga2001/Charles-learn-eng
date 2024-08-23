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

export async function getListWord() {
  const db = await getDb();
  const getDataCollection = await db.collection('db_words').aggregate([{ $sample: { size: 20 } }]).toArray();
  const validatedData = z.array(FormSchema).parse(getDataCollection);
  return validatedData;
}

export async function getListWordLimit(limit: number) {
  const db = await getDb();
  const getDataCollection = await db.collection('db_words').find({}).limit(limit).toArray();
  const validatedData = z.array(FormSchema).parse(getDataCollection);
  const getCountDocuments = await db.collection('db_words').countDocuments();
  return [validatedData, getCountDocuments] as const;
}

export async function insertWord(eng: string, vn: string, id: number) {
  const db = await getDb();
  await db.collection('db_words').insertOne({
    id: id,
    compare_id: id,
    english_word: eng,
    vietnamese_word: vn
  }).catch(() => {
    return false;
  }
  ).then(() => {
    revalidatePath('/dashboard/invoices');
    return true;
  });
}