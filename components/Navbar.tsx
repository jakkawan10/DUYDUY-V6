"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center text-xl font-bold text-blue-500">
            <span className="text-2xl">✌</span> <span className="ml-1">DUYDUY</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavItem label="หน้าแรก" href="/" />
            <NavItem label="อัปโหลด" href="/upload" />
            <NavItem label="กระเป๋า" href="/wallet" />
            <NavItem label="แจ้งเตือน" href="/notifications" />
            <NavItem label="โปรไฟล์" href="/profile" />
            <NavItem label="แอดมิน" href="/admin" />
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow">
          <NavItem label="หน้าแรก" href="/" />
          <NavItem label="อัปโหลด" href="/upload" />
          <NavItem label="กระเป๋า" href="/wallet" />
          <NavItem label="แจ้งเตือน" href="/notifications" />
          <NavItem label="โปรไฟล์" href="/profile" />
          <NavItem label="แอดมิน" href="/admin" />
        </div>
      )}
    </nav>
  );
}

function NavItem({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="block text-gray-700 hover:text-blue-500 font-medium"
    >
      {label}
    </Link>
  );
}
