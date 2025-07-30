"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (user) {
    return (
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#F28C8C] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="varsity-font text-2xl text-[#4A7C59]">PlateFull</span>
          </Link>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user.name}</span>
            <Button onClick={logout} className="bg-[#F5EEDC] hover:bg-[#B7C4A1] text-white rounded-full px-6">
              Logout
            </Button>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-[#F28C8C] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="varsity-font text-2xl text-[#4A7C59]">PlateFull</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("home")}
            className="text-[#4A7C59] hover:text-[#F28C8C] transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-[#4A7C59] hover:text-[#F28C8C] transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection("impact")}
            className="text-[#4A7C59] hover:text-[#F28C8C] transition-colors"
          >
            Impact
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-[#4A7C59] hover:text-[#F28C8C] transition-colors"
          >
            Contact Us
          </button>
        </div>

        <Link href="/auth">
          <Button className="bg-[#F5EEDC] hover:bg-[#B7C4A1] text-[#4A7C59] rounded-full px-6 shadow-lg hover:shadow-xl transition-all">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  )
}
