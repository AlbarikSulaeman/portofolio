'use client'

import { PortfolioProfile } from '@/types'
import { Mail, Instagram, Phone, Globe, Linkedin, Github } from 'lucide-react'
import { useTheme } from './ThemeProvider'

interface HeroProps {
  profile: PortfolioProfile
}

export default function Hero({ profile }: HeroProps) {
  const theme = useTheme()

  return (
    <div className="relative overflow-hidden rounded-wood-xl shadow-wood-lg">
      <div 
        className="absolute inset-0 bg-wood-gradient opacity-10"
        style={{ backgroundImage: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)` }}
      />
      
      <div className="relative z-10 p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Avatar Section */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {profile.avatar_url ? (
                <div className="w-40 h-40 sm:w-44 sm:h-44 lg:w-72 lg:h-72 overflow-hidden shadow-wood-lg 
                                rounded-full lg:rounded-wood-xl border-4">
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="w-40 h-40 sm:w-44 sm:h-44 lg:w-72 lg:h-72 
                            flex items-center justify-center text-5xl font-bold shadow-wood-lg
                            rounded-full lg:rounded-wood-xl"
                  style={{
                    backgroundColor: theme.accent,
                    color: theme.text,
                  }}
                >
                  {profile.full_name.charAt(0)}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="">
              <span className="badge-wood-accent mb-2">Available for opportunities</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold">
              {profile.full_name}
            </h1>
            
            <h2 className="text-2xl md:text-3xl mb-4" style={{ color: theme.accent }}>
              {profile.title}
            </h2>
            
            <p className="text-lg mb-4 leading-relaxed">
              {profile.description || 'Passionate developer creating beautiful digital experiences.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {profile.email && (
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-wood bg-wood-primary/10">
                    <Mail className="w-5 h-5" style={{ color: theme.primary }} />
                  </div>
                  <span className="text-wood-text">{profile.email}</span>
                </div>
              )}
              
              {profile.phone && (
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-wood bg-wood-primary/10">
                    <Phone className="w-5 h-5" style={{ color: theme.primary }} />
                  </div>
                  <span className="text-wood-text">{profile.phone}</span>
                </div>
              )}
              
              {/* {profile.location && (
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-wood bg-wood-primary/10">
                    <MapPin className="w-5 h-5" style={{ color: theme.primary }} />
                  </div>
                  <span className="text-wood-text">{profile.location}</span>
                </div>
              )} */}
              
              {profile.website && (
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-wood bg-wood-primary/10">
                    <Globe className="w-5 h-5" style={{ color: theme.primary }} />
                  </div>
                  <a 
                    href={profile.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-wood-text hover:underline"
                  >
                    {profile.website.replace('https://', '')}
                  </a>
                </div>
              )}
            </div>

            {/* <div className="flex flex-wrap gap-4">
              {profile.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wood-outline flex items-center space-x-2"
                  style={{
                    borderColor: theme.primary,
                    color: theme.primary
                  }}
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              )}
              
              {profile.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wood-outline flex items-center space-x-2"
                  style={{
                    borderColor: theme.primary,
                    color: theme.primary
                  }}
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
              )}
              
              <a
                href="#contact"
                className="btn-wood flex items-center space-x-2"
                style={{
                  backgroundColor: theme.accent,
                  color: theme.text
                }}
              >
                <Mail className="w-5 h-5" />
                <span>Contact Me</span>
              </a>
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
                <Award className="w-5 h-5" />
                <span>Download CV</span>
              </a>
              )}

            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}