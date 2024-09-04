// app/layout.js
// app/special/layout.js
import React from 'react';

type SpecialLayoutProps = {
  children: React.ReactNode;
};

export default function SpecialLayout({ children }: SpecialLayoutProps) {
  return (
    <html lang="en">
      <body>
        <header>Special Header</header>
        {children}
      </body>
    </html>
  );
}
