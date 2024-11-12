"use server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ruxandra-nextjs-database-ts.vercel.app";

export async function fetchPortfolio() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/get-portfolio`,
    );
    const data = await response.json();

    if (response.ok) {
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
