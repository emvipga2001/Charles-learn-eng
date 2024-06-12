'use server'

import { z } from "zod";
import fs from 'fs';
import path from 'path';

const FormSchema = z.object({
  id: z.number(),
  compare_id: z.number(),
  english_word: z.string(),
  vietnamese_word: z.string()
});

export async function getListWord() {
  const filePath = path.join(process.cwd(), 'list-word.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);
  const validatedData = z.array(FormSchema).parse(data);

  return validatedData;
}