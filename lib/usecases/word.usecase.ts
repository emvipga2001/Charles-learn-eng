'use server'

import { z } from "zod";
import { getDb } from "$root/lib/adapters/mongodb";
import { FormSchema } from "../entities/definitions";
import { API_ENDPOINTS } from "../constant/api";
import { getAuthToken } from "./auth.usecase";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function getListWordRandom() {
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

export async function insertWord(eng: string, vn: string) {
  const db = await getDb();
  const lastDoc = await db.collection('db_words').findOne({}, { sort: { id: -1 } });
  if (!lastDoc) {
    return false;
  }
  const newId = lastDoc.id + 1;
  try {
    await db.collection('db_words').insertOne({
      id: newId,
      compare_id: newId,
      english_word: eng,
      vietnamese_word: vn
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function editWord(eng: string, vn: string, id: number) {
  const db = await getDb();
  await db.collection('db_words').updateOne({
    id: id
  }, {
    $set: {
      english_word: eng,
      vietnamese_word: vn
    }
  }).catch(() => {
    return false;
  }
  ).then(() => {
    return true;
  });
}

export async function deleteWord(id: number) {
  const db = await getDb();
  await db.collection('db_words').deleteOne({
    id: id
  }).catch(() => {
    return false;
  }
  ).then(() => {
    return true;
  });
}

export async function getAllWords() {
  try {
    const token = await getAuthToken();
    
    const data = await fetch(API_ENDPOINTS.GET_ALL_WORDS, {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      },
      next: { tags: ['list-word-api'] }
    });

    if (!data.ok) throw new Error("Failed to fetch words");
    const { words } : { words: z.infer<typeof FormSchema>[] } = await data.json();
    return words;
  } catch (error) {
    console.error("Error fetching all words:", error);
    throw error;
  }
}

export async function reloadGetAllWords() {
  revalidateTag('list-word-api');
  revalidatePath('/list-word');
  redirect('/list-word');
}
