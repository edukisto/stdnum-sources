import React from 'react';
import './globals.css';

function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru-luna1918">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title lang="en">stdnum</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
