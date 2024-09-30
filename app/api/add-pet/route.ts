import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const price = searchParams.get("price");

  try {
    if (!title || !price) throw new Error("Pet and owner names required");
    await sql`INSERT INTO portfolio (title, price) VALUES (${title}, ${price});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const portfolio = await sql`SELECT * FROM portfolio;`;
  return NextResponse.json({ portfolio }, { status: 200 });
}
