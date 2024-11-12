import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

type Params = Promise<{ id: string }>;

export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const data = await request.json();

    // Validate required fields
    const requiredFields = [
      "title",
      "price",
      "currency",
      "imgUrl",
      "width",
      "height",
      "alt",
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    // Validate numeric fields
    const price = parseFloat(data.price);
    const width = parseInt(data.width);
    const height = parseInt(data.height);

    if (isNaN(price) || isNaN(width) || isNaN(height)) {
      return NextResponse.json(
        { error: "Invalid numeric values for price, width, or height" },
        { status: 400 },
      );
    }

    const result = await sql`
      UPDATE portfolio
      SET
        title = ${data.title},
        price = ${price},
        currency = ${data.currency},
        imgurl = ${
          data.imgUrl
        }, -- Note: form sends imgUrl, database column is imgurl
        width = ${width},
        height = ${height},
        alt = ${data.alt},
        updated_at = ${new Date().toISOString()}
      WHERE id = ${id}
      RETURNING *`;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // Return the updated item data
    return NextResponse.json({
      success: true,
      id,
      item: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating item:", error);
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 },
    );
  }
}

// For debugging purposes, you might want to add a GET method to verify the item exists
export async function GET(
  request: Request,
  { params }: { params: Params },
) {
  try {
    const {id} = await params;
    const result = await sql`
      SELECT * FROM portfolio
      WHERE id = ${id}
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching item:", error);
    return NextResponse.json(
      { error: "Failed to fetch item" },
      { status: 500 },
    );
  }
}
