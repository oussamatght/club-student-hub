'use client';

import Link from 'next/link';
import { Home, Users, Calendar, FileText, Menu, X } from 'lucide-react';

export default function Navbar({ className = '' }) {
  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Clubs', href: '/clubs', icon: Users },
    { name: 'Events', href: '/event', icon: Calendar },
    { name: 'Posts', href: '/post', icon: FileText },
  ];

  return (
    <nav className={`bg-white shadow-md sticky top-0 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-blue-600">Club Hub</h1>

          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50 hover:shadow-md transition"
              >
                <item.icon className="w-5 h-5 text-blue-600" />
                <span>{item.name}</span>
              </Link>
            ))}
            <Link
              href="/login"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <div
              className="p-2 rounded-md bg-white shadow-md mobile-menu-toggle"
              onClick={() => {
               const menu = document.getElementById('mobile-menu');
menu?.classList.toggle('hidden');
              }}
            >
              <Menu className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div id="mobile-menu" className="hidden md:hidden bg-white shadow-lg">
        <nav className="flex flex-col gap-2 p-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50 hover:shadow-md transition"
            >
              <item.icon className="w-5 h-5 text-blue-600" />
              <span>{item.name}</span>
            </Link>
          ))}
          <Link
            href="/login"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </nav>
  );
}
