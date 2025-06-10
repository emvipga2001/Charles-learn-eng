import { z } from "zod";

export type FormattedListWord = {
  id : number,
  compare_id : number,
  english_word : string,
  vietnamese_word : string,
  type_id: number
};

export const formSchema = z.object({
  english_word: z.string(),
  vietnamese_word: z.string()
})

export type User = {
  email: string;
  password: string;
};

export const FormSchema = z.object({
  id: z.number(),
  compare_id: z.number(),
  english_word: z.string(),
  vietnamese_word: z.string(),
  type_id: z.number()
});