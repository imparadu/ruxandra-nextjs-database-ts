// app/layout.js
// app/special/layout.js
import Link from 'next/link';
import React from 'react';

type SpecialLayoutProps = {
  children: React.ReactNode;
};

export default function SpecialLayout({ children }: SpecialLayoutProps) {
  return (
    <>
      <div className="flex flex-col items-start">
        <Link href="/admin/dashboard/portfolio">Portfolio</Link>
        <button>Sketchbook</button>
        <button>Shop</button>
      </div>
      {children}
    </>
  );
}
