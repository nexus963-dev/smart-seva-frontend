'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useUser, SignInButton, UserButton } from '@clerk/nextjs'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isSignedIn, user } = useUser()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg h-20' : 'bg-transparent h-24'
    }`}>
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className={`text-2xl font-bold transition-colors ${
          isScrolled ? 'text-green-600' : 'text-gray-800'
        }`}>
          🌾 Smart <span className="text-emerald-500">Kisan Seva</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#home" className={`transition-colors hover:text-green-600 ${
            isScrolled ? 'text-gray-800' : 'text-gray-800'
          }`}>Home</Link>
          <Link href="#services" className={`transition-colors hover:text-green-600 ${
            isScrolled ? 'text-gray-800' : 'text-gray-800'
          }`}>Features</Link>
          <Link href="#about" className={`transition-colors hover:text-green-600 ${
            isScrolled ? 'text-gray-800' : 'text-gray-800'
          }`}>About</Link>
          <Link href="#testimonials" className={`transition-colors hover:text-green-600 ${
            isScrolled ? 'text-gray-800' : 'text-gray-800'
          }`}>Success Stories</Link>
          
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-green-600 hover:text-green-700 font-medium">
                Dashboard
              </Link>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
            </div>
          ) : (
            <SignInButton mode="modal">
              <button className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-5 py-2 rounded-full hover:shadow-lg transition-all">
                Get Started
              </button>
            </SignInButton>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
            <nav className="flex flex-col p-4 space-y-4">
              <Link href="#home" className="text-gray-800 hover:text-green-600">Home</Link>
              <Link href="#services" className="text-gray-800 hover:text-green-600">Features</Link>
              <Link href="#about" className="text-gray-800 hover:text-green-600">About</Link>
              <Link href="#testimonials" className="text-gray-800 hover:text-green-600">Success Stories</Link>
              
              {isSignedIn ? (
                <div className="flex flex-col space-y-2">
                  <Link href="/dashboard" className="text-green-600 font-medium">Dashboard</Link>
                  <div className="flex items-center gap-2">
                    <UserButton />
                    <span className="text-sm text-gray-600">{user?.firstName}</span>
                  </div>
                </div>
              ) : (
                <SignInButton mode="modal">
                  <button className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-5 py-2 rounded-full text-center">
                    Get Started
                  </button>
                </SignInButton>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
