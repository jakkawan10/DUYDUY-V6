"use client"

import { Button } from "@/components/ui/button"
import { Home, Compass, Wallet, User } from "lucide-react"

interface BottomNavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export default function BottomNavigation({ currentPage, onPageChange }: BottomNavigationProps) {
  const navItems = [
    { id: "home", icon: Home, label: "หน้าแรก" },
    { id: "discover", icon: Compass, label: "ค้นพบ" },
    { id: "wallet", icon: Wallet, label: "กระเป๋าเงิน" },
    { id: "profile", icon: User, label: "โปรไฟล์" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id

          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex flex-col items-center gap-1 p-3 ${
                isActive ? "text-[#42d3d1]" : "text-gray-500 hover:text-[#42d3d1]"
              }`}
              onClick={() => onPageChange(item.id)}
            >
              <Icon className={`w-6 h-6 ${isActive ? "fill-current" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
