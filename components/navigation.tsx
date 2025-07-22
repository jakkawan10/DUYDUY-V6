"use client"
import { Home, Search, Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-gray-800 z-50">
      <div className="flex items-center justify-around py-2">
        <Button
          variant="ghost"
          className={`flex flex-col items-center gap-1 p-3 ${currentPage === "home" ? "text-white" : "text-gray-400"}`}
          onClick={() => onPageChange("home")}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">หน้าแรก</span>
        </Button>

        <Button
          variant="ghost"
          className={`flex flex-col items-center gap-1 p-3 ${
            currentPage === "discover" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => onPageChange("discover")}
        >
          <Search className="w-6 h-6" />
          <span className="text-xs">ค้นพบ</span>
        </Button>

        <Button
          variant="ghost"
          className={`flex flex-col items-center gap-1 p-3 ${
            currentPage === "create" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => onPageChange("create")}
        >
          <div
            className={`w-8 h-8 ${currentPage === "create" ? "bg-blue-500" : "bg-white"} rounded-lg flex items-center justify-center`}
          >
            <Plus className={`w-5 h-5 ${currentPage === "create" ? "text-white" : "text-black"}`} />
          </div>
          <span className="text-xs">สร้าง</span>
        </Button>

        <Button
          variant="ghost"
          className={`flex flex-col items-center gap-1 p-3 ${
            currentPage === "profile" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => onPageChange("profile")}
        >
          <User className="w-6 h-6" />
          <span className="text-xs">โปรไฟล์</span>
        </Button>
      </div>
    </div>
  )
}
