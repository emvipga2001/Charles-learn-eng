'use server'

import { z } from "zod";
import { getDb } from "$root/lib/adapters/mongodb";
import { FormSchema } from "../entities/definitions";

export async function getListWordRandom(typeId: number) {
  const db = await getDb();
  const getDataCollection = await db.collection('db_words')
    .aggregate([
      { $match: { type_id: typeId } },
      { $sample: { size: 20 } }
    ]).toArray();
  const validatedData = z.array(FormSchema).parse(getDataCollection);
  return validatedData;
}

export async function getListWordLimit(limit: number, typeId: number) {
  const db = await getDb();
  const getDataCollection = await db.collection('db_words')
    .find({ type_id: typeId })
    .limit(limit)
    .toArray();
  const validatedData = z.array(FormSchema).parse(getDataCollection);
  const getCountDocuments = await db.collection('db_words')
    .countDocuments({ type_id: typeId });
  return [validatedData, getCountDocuments] as const;
}

export async function insertWord(eng: string, vn: string, typeId: number) {
  const db = await getDb();
  const lastDoc = await db.collection('db_words')
    .findOne({ type_id: typeId }, { sort: { id: -1 } });
  if (!lastDoc) {
    return false;
  }
  const newId = lastDoc.id + 1;
  try {
    await db.collection('db_words').insertOne({
      id: newId,
      compare_id: newId,
      english_word: eng,
      vietnamese_word: vn,
      type_id: typeId
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function editWord(eng: string, vn: string, id: number, typeId: number) {
  const db = await getDb();
  await db.collection('db_words').updateOne({
    id: id,
    type_id: typeId
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

export async function deleteWord(id: number, typeId: number) {
  const db = await getDb();
  await db.collection('db_words').deleteOne({
    id: id,
    type_id: typeId
  }).catch(() => {
    return false;
  }
  ).then(() => {
    return true;
  });
}