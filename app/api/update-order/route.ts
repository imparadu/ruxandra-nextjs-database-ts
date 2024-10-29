import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const updatedItems = req.body;

    try {
      // Update each item's display order in the database
      for (const item of updatedItems) {
        await sql`
          UPDATE your_table_name
          SET display_order = ${item.display_order}
          WHERE id = ${item.id};
        `;
      }

      res.status(200).json({ message: "Order updated successfully" });
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Failed to update order" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

