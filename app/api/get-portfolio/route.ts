// /api/get-portfolio/route.ts

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const portfolio = await sql`SELECT * FROM portfolio;`;
    return NextResponse.json({ portfolio }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

