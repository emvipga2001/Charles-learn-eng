import { z } from "zod";
import { getDb } from "../../../lib/mongodb";
import { FormSchema } from "../../../lib/definitions";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 0;

    const db = await getDb();
    const getDataCollection = await db.collection('db_words').find({}).limit(limit).toArray();
    const validatedData = z.array(FormSchema).parse(getDataCollection);

    return Response.json(validatedData);
}
