import React from "react";
import Link from "next/link";
export default function AdminNav() {
  return (
    <>
      <div className="flex flex-col items-start">
        <Link href="/admin/dashboard/portfolio">Portfolio</Link>
        <button>Sketchbook</button>
        <button>Shop</button>
      </div>
    </>
  );
}
