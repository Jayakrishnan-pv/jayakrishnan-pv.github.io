import type React from 'react';
import '../styles/globals.css';

export const metadata = {
  title: 'Next Atomic',
  description: 'Next.js 15 App Router with Atomic Design and Tailwind CSS'
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
