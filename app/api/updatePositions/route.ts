// app/api/updatePositions/route.ts
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

interface PositionUpdate {
  id: string;
  position: number;
}

export async function PUT(request: Request) {
  try {
    const items: PositionUpdate[] = await request.json();

    // Update all positions in a single query
    for (const item of items) {
      await sql`
        UPDATE products
        SET
          position = ${item.position},
          updated_at = NOW()
        WHERE id = ${item.id}::uuid
      `;
    }

    return NextResponse.json({ message: "Positions updated successfully" });
  } catch (error) {
    console.error("Error updating positions:", error);
    return NextResponse.json(
      { error: "Failed to update positions" },
      { status: 500 },
    );
  }
}
