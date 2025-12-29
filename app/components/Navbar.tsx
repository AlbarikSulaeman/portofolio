'use client'

import { useState } from 'react'
import { useTheme } from './ThemeProvider'
import { PortfolioProfile } from '@/types'

interface NavbarProps {
  profile: PortfolioProfile
}

export default function Navbar({ profile }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const theme = useTheme()

  return (
    <nav className="sticky top-0 z-30 bg-wood-bg/80 backdrop-blur-md border-b border-wood-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {profile.avatar_url && (
              <div className="w-12 h-12 rounded-wood overflow-hidden border-2 border-wood-accent/30">
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold">{profile.full_name}</h1>
              <p className="text-sm text-wood-text-light">{profile.title}</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {/* <a href="#projects" className="nav-link">
              Projects
            </a>
            <a href="#skills" className="nav-link">
              Skills
            </a>
            <a href="#experience" className="nav-link">
              Experience
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a> */}
            {profile.cv_url && (
                <a
                  href={profile.cv_url}
                  download
                  className="btn-wood-outline flex items-center space-x-2"
                  style={{
                    borderColor: theme.accent,
                    color: theme.accent,
                  }}
                >
                <span>Download CV</span>
              </a>
              )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-wood hover:bg-wood-primary/10"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 relative">
              <span className={`absolute left-0 top-1 w-full h-0.5 bg-wood-text transition-transform ${isMenuOpen ? 'rotate-45 top-3' : ''}`} />
              <span className={`absolute left-0 top-3 w-full h-0.5 bg-wood-text transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 top-5 w-full h-0.5 bg-wood-text transition-transform ${isMenuOpen ? '-rotate-45 top-3' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-slide-down">
            <div className="flex flex-col space-y-2">
              {/* <a 
                href="#projects" 
                className="nav-link active:bg-wood-primary/20"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </a>
              <a 
                href="#skills" 
                className="nav-link active:bg-wood-primary/20"
                onClick={() => setIsMenuOpen(false)}
              >
                Skills
              </a>
              <a 
                href="#experience" 
                className="nav-link active:bg-wood-primary/20"
                onClick={() => setIsMenuOpen(false)}
              >
                Experience
              </a>
              <a 
                href="#contact" 
                className="nav-link active:bg-wood-primary/20"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a> */}
              {profile.cv_url && (
                <a
                  href={profile.cv_url}
                  download
                  className="btn-wood-outline flex items-center space-x-2"
                  style={{
                    borderColor: theme.accent,
                    color: theme.accent,
                  }}
                >
                <span>Download CV</span>
              </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}