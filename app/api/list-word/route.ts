import { getAllWordDB } from "$root/lib/adapters/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    const [words, _] = await getAllWordDB();
    return NextResponse.json(
        {
            words
        },
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            }
        }
    )
}