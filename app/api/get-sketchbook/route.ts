import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sketchbook =
      await sql`SELECT * FROM products WHERE type = 'sketchbook';`;
    return NextResponse.json({ sketchbook });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export const revalidate = 0; // This tells Next.js to not cache this route
