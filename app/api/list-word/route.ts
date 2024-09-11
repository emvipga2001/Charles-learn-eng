import { getListWord } from "../../../lib/data";

export async function GET(){
    const listWord = await getListWord();
    
    return Response.json(listWord)
}