"use server";
import { revalidatePath } from "next/cache";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ruxandra-nextjs-database-ts.vercel.app";

export async function fetchPortfolio() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/get-portfolio?t=${Date.now()}`,
      {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      },
    );
    const data = await response.json();

    if (response.ok) {
      console.log("din dbfunctions", data.portfolio.rows);
      return data.portfolio.rows;
    } else {
      console.error("Error fetching portfolio:", data.error);
      return [];
    }
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return [];
  }
}

// export async function handleDelete(id: string) {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/deleteItem/${id}`, {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       console.log("asta e dbfunctions");
//       revalidatePath("/admin/portfolio"); // Update this to the correct path
//       return true;
//     } else {
//       console.error("Error deleting item:", await response.text());
//       return false;
//     }
//   } catch (error) {
//     console.error("Error deleting item:", error);
//     return false;
//   }
// }
