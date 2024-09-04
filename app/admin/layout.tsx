// app/layout.js
// app/special/layout.js
import React from 'react';

export default function SpecialLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>Special Header</header>
        {children}
      </body>
    </html>
  );
}
