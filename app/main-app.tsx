"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import VideoFeed from "@/components/video-feed"
import DiscoverPage from "@/components/discover-page"
import CreatePage from "@/components/create-page"
import ProfilePage from "@/components/profile-page"

export default function MainApp() {
  const [currentPage, setCurrentPage] = useState("home")

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <VideoFeed />
      case "discover":
        return <DiscoverPage />
      case "create":
        return <CreatePage />
      case "profile":
        return <ProfilePage />
      default:
        return <VideoFeed />
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {renderCurrentPage()}
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  )
}
