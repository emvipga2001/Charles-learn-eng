import { z } from "zod";
import { NextRequest } from "next/server";
import { getDb } from "$root/lib/adapters/mongodb";
import { FormSchema } from "$root/lib/entities/definitions";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 0;

    const db = await getDb();
    const getDataCollection = await db.collection('db_words').find({}).limit(limit).toArray();
    const validatedData = z.array(FormSchema).parse(getDataCollection);

    return Response.json(validatedData);
}
