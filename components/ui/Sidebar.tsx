'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Users, Calendar, FileText, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile open/close
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop collapsed
  const [isDesktop, setIsDesktop] = useState(false);

  const navItems = [
    
    { name: 'Home', href: '/', icon: Home },
    { name: 'Clubs', href: '/clubs', icon: Users },
    { name: 'Events', href: '/event', icon: Calendar },
    { name: 'Posts', href: '/post', icon: FileText },
  ];

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

 useEffect(() => {
  if (isDesktop) {
    const updateIsOpen = () => setIsOpen((prevIsOpen: boolean) => !prevIsOpen);
    if (!isOpen) {
      updateIsOpen();
    }
  }
}, [isDesktop]);
  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6 text-blue-600" /> : <Menu className="w-6 h-6 text-blue-600" />}
      </button>

      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white shadow-lg z-40
          flex flex-col p-4 transition-all duration-300 ease-in-out
          ${isDesktop ? (isCollapsed ? 'w-20' : 'w-64') : 'w-64'}
          transform ${!isDesktop && !isOpen ? '-translate-x-full' : 'translate-x-0'}
        `}
      >
        {isDesktop && (
          <button
            className="self-end mb-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5 text-blue-600" /> : <ChevronLeft className="w-5 h-5 text-blue-600" />}
          </button>
        )}

        <h2 className={`text-2xl font-bold mb-8 ${isCollapsed ? 'hidden' : 'block'}`}>Club Hub</h2>

        <nav className="flex flex-col gap-4 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all font-medium ${
                isCollapsed ? 'justify-center' : ''
              }`}
              onClick={() => !isDesktop && setIsOpen(false)}
            >
              <item.icon className="w-5 h-5 text-blue-600" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {isOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black/30 z-30 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
