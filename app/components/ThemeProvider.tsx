'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface WoodTheme {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  textLight: string
  border: string
}

const defaultWoodTheme: WoodTheme = {
  primary: '#8B7355',
  secondary: '#A67C52',
  accent: '#D4A76A',
  background: '#FAF3E0',
  text: '#5D4037',
  textLight: '#795548',
  border: '#BCAAA4',
}

const ThemeContext = createContext<WoodTheme>(defaultWoodTheme)

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<WoodTheme>(defaultWoodTheme)

  useEffect(() => {
    // Helper function untuk convert hex to rgb
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };

    // Load theme from environment variables
    const envTheme: Partial<WoodTheme> = {
      primary: process.env.NEXT_PUBLIC_THEME_PRIMARY || defaultWoodTheme.primary,
      secondary: process.env.NEXT_PUBLIC_THEME_SECONDARY || defaultWoodTheme.secondary,
      accent: process.env.NEXT_PUBLIC_THEME_ACCENT || defaultWoodTheme.accent,
      background: process.env.NEXT_PUBLIC_THEME_BACKGROUND || defaultWoodTheme.background,
      text: process.env.NEXT_PUBLIC_THEME_TEXT || defaultWoodTheme.text,
      textLight: process.env.NEXT_PUBLIC_THEME_TEXT_LIGHT || defaultWoodTheme.textLight,
      border: process.env.NEXT_PUBLIC_THEME_BORDER || defaultWoodTheme.border,
    }
    
    setTheme(envTheme as WoodTheme)
    
    // Apply CSS variables ke root element
    const root = document.documentElement
    
    // Set warna utama
    root.style.setProperty('--color-wood-primary', envTheme.primary || defaultWoodTheme.primary)
    root.style.setProperty('--color-wood-secondary', envTheme.secondary || defaultWoodTheme.secondary)
    root.style.setProperty('--color-wood-accent', envTheme.accent || defaultWoodTheme.accent)
    root.style.setProperty('--color-wood-background', envTheme.background || defaultWoodTheme.background)
    root.style.setProperty('--color-wood-text', envTheme.text || defaultWoodTheme.text)
    root.style.setProperty('--color-wood-text-light', envTheme.textLight || defaultWoodTheme.textLight)
    root.style.setProperty('--color-wood-border', envTheme.border || defaultWoodTheme.border)
    
    // Set warna dalam format rgb untuk opacity
    const primaryRgb = hexToRgb(envTheme.primary || defaultWoodTheme.primary)
    const accentRgb = hexToRgb(envTheme.accent || defaultWoodTheme.accent)
    const borderRgb = hexToRgb(envTheme.border || defaultWoodTheme.border)
    
    root.style.setProperty('--color-wood-primary-rgb', `${primaryRgb.r} ${primaryRgb.g} ${primaryRgb.b}`)
    root.style.setProperty('--color-wood-accent-rgb', `${accentRgb.r} ${accentRgb.g} ${accentRgb.b}`)
    root.style.setProperty('--color-wood-border-rgb', `${borderRgb.r} ${borderRgb.g} ${borderRgb.b}`)
  }, [])

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}