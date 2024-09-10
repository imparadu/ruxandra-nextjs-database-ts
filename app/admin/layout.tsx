// app/layout.js
// app/special/layout.js
import React from 'react';

type SpecialLayoutProps = {
  children: React.ReactNode;
};

export default function SpecialLayout({ children }: SpecialLayoutProps) {
  return (
      <>
        <header>Special Header from layout</header>
        {children}
      </>
  );
}
