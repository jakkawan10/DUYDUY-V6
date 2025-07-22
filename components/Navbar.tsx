'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: '🏠 หน้าแรก' },
  { href: '/upload', label: '⬆️ อัปโหลด' },
  { href: '/wallet', label: '💰 กระเป๋า' },
  { href: '/topup', label: '💸 เติมเงิน' },
  { href: '/withdraw', label: '📤 ถอนเงิน' },
  { href: '/history', label: '📜 ประวัติ' },
  { href: '/profile', label: '👤 โปรไฟล์' },
  { href: '/admin', label: '🛡️ แอดมิน' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-lg font-bold">DUYDUY</div>
        <div className="flex gap-3 text-sm">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1 rounded ${
                pathname === href
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-200 text-gray-700'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
