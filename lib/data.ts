'use server'

import { z } from "zod";
import { getDb } from "./mongodb";

const FormSchema = z.object({
  id: z.number(),
  compare_id: z.number(),
  english_word: z.string(),
  vietnamese_word: z.string()
});

export async function getListWord() {
  const db = await getDb();
  const getDataCollection = await db.collection('Word').find({}).toArray();
  const validatedData = z.array(FormSchema).parse(getDataCollection);
  return validatedData;
}