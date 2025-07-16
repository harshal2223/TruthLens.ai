'use client'

import Link from 'next/link'
import { Search, Menu, X, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import AuthButton from './AuthButton'
import AdvancedFactCheckModal from './AdvancedFactCheckModal'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFactCheckOpen, setIsFactCheckOpen] = useState(false)

  const navLinks = [
    { name: 'Politics', href: '/politics' },
    { name: 'Economy', href: '/economy' },
    { name: 'Fact Check', href: '/fact-check' },
    { name: 'RTI', href: '/rti' },
    { name: 'Culture', href: '/culture' },
    { name: 'Opinion', href: '/opinion' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-[#111] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-white font-['Playfair_Display']">
              TruthLens
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <AuthButton />
            <button 
              onClick={() => setIsFactCheckOpen(true)}
              className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200"
            >
              <CheckCircle size={16} />
              <span className="hidden sm:inline text-sm">Fact Check</span>
            </button>
            <button className="text-gray-300 hover:text-white transition-colors duration-200">
              <Search size={20} />
            </button>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-white transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-800">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <AdvancedFactCheckModal 
        isOpen={isFactCheckOpen} 
        onClose={() => setIsFactCheckOpen(false)} 
      />
    </nav>
  )
}
