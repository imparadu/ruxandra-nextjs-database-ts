"use server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchPortfolio() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/get-portfolio`);
    const data = await response.json();

    if (response.ok) {
      return data.portfolio.rows;
    } else {
      console.error("Error fetching portfolio items:", data.error);
      return [];
    }
  } catch (error) {
    console.error("Error fetching portfolio items:", error);
    return [];
  }
}

export async function fetchSketchbook() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/get-sketchbook`);
    const data = await response.json();

    if (response.ok) {
      return data.sketchbook.rows;
    } else {
      console.error("Error fetching sketchbook items:", data.error);
      return [];
    }
  } catch (error) {
    console.error("Error fetching sketchbook items:", error);
    return [];
  }
}

export async function fetchShop() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/get-shop-products`);
    const data = await response.json();

    if (response.ok) {
      return data.shop.rows;
    } else {
      console.error("Error fetching shop items:", data.error);
      return [];
    }
  } catch (error) {
    console.error("Error fetching shop items:", error);
    return [];
  }
}
