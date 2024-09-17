import { z } from "zod";
import { getDb } from "../../../lib/mongodb";
import { FormSchema } from "../../../lib/definitions";

export async function GET() {
    const db = await getDb();
    const getDataCollection = await db.collection('db_words').aggregate([{ $sample: { size: 20 } }]).toArray();
    const validatedData = z.array(FormSchema).parse(getDataCollection);
    return Response.json(validatedData);
}