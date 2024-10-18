import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { title, price, currency, imgUrl, width, height, alt } = body;

  try {
    // Validate required fields
    if (!title || !price || !currency || !imgUrl || !width || !height || !alt) {
      throw new Error(
        "All fields (title, price, currency, imgUrl, width, height, alt) are required.",
      );
    }

    // Convert price, width, and height to numbers
    const numericPrice = parseFloat(price);
    const numericWidth = parseInt(width, 10);
    const numericHeight = parseInt(height, 10);

    // Check if conversion was successful
    if (isNaN(numericPrice) || isNaN(numericWidth) || isNaN(numericHeight)) {
      throw new Error("Price, width, and height must be valid numbers.");
    }

    // Insert into the portfolio table
    await sql`
      INSERT INTO portfolio (title, price, currency, imgurl, width, height, alt)
      VALUES (${title}, ${numericPrice}, ${currency}, ${imgUrl}, ${numericWidth}, ${numericHeight}, ${alt});
    `;

    // Fetch all portfolio entries
    const portfolio = await sql`SELECT * FROM portfolio;`;
    return NextResponse.json({ portfolio }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
