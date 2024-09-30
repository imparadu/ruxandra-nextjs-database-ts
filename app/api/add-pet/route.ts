import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const price = searchParams.get("price");
  const currency = searchParams.get("currency");
  const imgUrl = searchParams.get("imgUrl");
  const width = searchParams.get("width");
  const height = searchParams.get("height");
  const alt = searchParams.get("alt");

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
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Fetch all portfolio entries
  const portfolio = await sql`SELECT * FROM portfolio;`;
  return NextResponse.json({ portfolio }, { status: 200 });
}
