'use client'

import { useTheme } from './ThemeProvider'
import { PortfolioProfile } from '@/types'
import { Heart,Coffee,ArrowUp,Linkedin,Github,FileText } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ProfileProps {
  profile: PortfolioProfile
}
const quotes = [
  "Build things that matter.",
  "Consistency beats talent.",
  "Code with purpose, not pressure.",
  "Great software starts with empathy.",
  "Small steps today, big impact tomorrow."
]

export default function Footer({ profile }: ProfileProps) {
  const theme = useTheme()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [quoteIndex, setQuoteIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)

    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length)
    }, 5000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(interval)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative mt-20 pt-12 pb-8 border-t border-wood-border/50">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(45deg, ${theme.primary} 25%, transparent 25%),
                           linear-gradient(-45deg, ${theme.primary} 25%, transparent 25%),
                           linear-gradient(45deg, transparent 75%, ${theme.primary} 75%),
                           linear-gradient(-45deg, transparent 75%, ${theme.primary} 75%)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* About */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-bold text-lg" style={{ color: theme.primary }}>
              About Me
            </h4>
            <p className="text-wood-text-light text-sm leading-relaxed max-w-md">
              I’m a passionate developer who loves building clean, scalable, and
              meaningful digital products. Always learning, always improving.
            </p>

            {/* Motivation Quote */}
            <blockquote
              className="italic text-sm border-l-4 pl-4 mt-4 transition-all"
              style={{ borderColor: theme.primary }}
            >
              “{quotes[quoteIndex]}”
            </blockquote>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4" style={{ color: theme.primary }}>
              Other
            </h4>
            <div className="space-y-2 text-sm">
              {/* {['Home', 'Projects', 'Skills', 'Experience', 'Contact'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-wood-text-light hover:text-wood-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )} */}
              {profile.cv_url && (
                <a
                  href={profile.cv_url}
                  download
                  className="flex items-center gap-2 text-wood-text-light hover:text-wood-primary transition-colors"
                >
                  Download CV
                </a>
              )}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-bold mb-4" style={{ color: theme.primary }}>
              Connect
            </h4>
            

            <div className="space-y-3 text-sm">
              {profile.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  className="flex items-center gap-2 text-wood-text-light hover:text-wood-primary transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              )}
              
              {profile.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  className="flex items-center gap-2 text-wood-text-light hover:text-wood-primary transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-wood-text-light gap-4">
          <div className="flex items-center">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-500 mx-1 animate-pulse" />
            <span>and</span>
            <Coffee className="w-3 h-3 text-amber-700 mx-1" />
          </div>

          <span>© {new Date().getFullYear()} Albarik Sulaeman</span>
        </div>

        {/* Scroll to Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full shadow-wood-lg transition-all hover:scale-110 z-50"
            style={{ backgroundColor: theme.primary, color: '#fff' }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </footer>
  )
}
