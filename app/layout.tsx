import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from '@/components/ui/Sidebar';
import { Menu } from 'lucide-react';
import Link from 'next/link';

import Navbar from '@/components/ui/Navbar';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ClubStudent Hub",
  description: "University Clubs & Events Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>

    <div className="flex min-h-screen">
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col">
        <div className="md:hidden">
          <Navbar />
        </div>

        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>

      </body>
    </html>
  );
}
