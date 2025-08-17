import type React from 'react';
import '../styles/globals.css';

export const metadata = {
  title: 'Jayakrishnan P.V',
  description: 'This is my portfolio'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
