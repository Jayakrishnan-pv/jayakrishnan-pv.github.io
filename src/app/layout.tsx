import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Coming Soon | Building a New Reality...',
  description: "Jayakrishnan's Portfolio Coming Soon Page",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Eater&family=Mountains+of+Christmas:wght@400;700&family=Roboto+Mono&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
