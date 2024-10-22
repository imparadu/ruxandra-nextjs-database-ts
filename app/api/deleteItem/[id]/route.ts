// app/api/delete-portfolio-item/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  try {
    await sql`DELETE FROM portfolio WHERE id = ${id}`;
    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json(
      { message: "Error deleting item" },
      { status: 500 },
    );
  }
}
