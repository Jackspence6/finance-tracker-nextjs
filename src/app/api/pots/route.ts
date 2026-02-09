import { NextResponse } from "next/server";
import { getPots } from "../../../../lib/pots";

export async function GET() {
    const pots = await getPots();
    return NextResponse.json(pots);
}
