import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const portfolio = await sql`SELECT * FROM portfolio;`;
    return NextResponse.json(
      { portfolio },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export const revalidate = 0; // This tells Next.js to not cache this route
