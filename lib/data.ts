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

let limit = 5;

export async function getListWord() {
  const db = await getDb();
  const getDataCollection = await db.collection('db_words').find({}).toArray();
  const validatedData = z.array(FormSchema).parse(getDataCollection);
  return validatedData;
}

export async function getListWordLimit() {
  const db = await getDb();
  const getDataCollection = await db.collection('db_words').find({}).limit(5).toArray();
  const validatedData = z.array(FormSchema).parse(getDataCollection);
  return validatedData;
}

export async function getMoreListWord() {
  const db = await getDb();
  const getDataCollection = await db.collection('db_words').find({}).limit(limit).toArray();
  const validatedData = z.array(FormSchema).parse(getDataCollection);
  limit += 5;
  revalidatePath('/dashboard/invoices');
  return validatedData;
}