'use server'

import { z } from "zod";
import { getDb } from "./mongodb";
import { revalidatePath } from "next/cache";
import bcrypt from 'bcrypt';
import { signIn, signOut } from "../auth";
import { AuthError } from "next-auth";

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
  // const db = await getDb();
  // const getDataCollection = await db.collection('db_words').aggregate([
  //   { $sort: { id: -1 } }
  // ]).limit(1).toArray();
  // const validatedData = z.array(FormSchema).parse(getDataCollection);
  // await db.collection('db_words').insertOne({
  //   id: validatedData[0].id + 1,
  //   compare_id: validatedData[0].id + 1,
  //   english_word: eng,
  //   vietnamese_word: vn
  // }).catch(() => {
  //   return false;
  // }
  // ).then(() => {
  //   revalidatePath('/list-word');
  //   return true;
  // });
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

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
export async function SignOut() {
  await signOut();
}