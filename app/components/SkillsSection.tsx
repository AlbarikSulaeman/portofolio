'use client'

import { PortfolioSkill } from '@/types'
import { useTheme } from './ThemeProvider'
import { Code, Database, Smartphone, Palette, Cpu, Cloud } from 'lucide-react'

interface SkillsSectionProps {
  skills: PortfolioSkill[]
}

const categoryIcons = {
  'Frontend': <Code className="w-6 h-6" />,
  'Backend': <Cpu className="w-6 h-6" />,
  'Database': <Database className="w-6 h-6" />,
  'Mobile': <Smartphone className="w-6 h-6" />,
  'Other': <Palette className="w-6 h-6" />,
}

const proficiencyColors = {
  'Beginner': 'bg-green-100 text-green-800',
  'Intermediate': 'bg-blue-100 text-blue-800',
  'Advanced': 'bg-purple-100 text-purple-800',
  'Expert': 'bg-amber-100 text-amber-800',
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const theme = useTheme()
  
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {} as Record<string, PortfolioSkill[]>)

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2" style={{ color: theme.primary }}>
          Technical Skills
        </h2>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="card-wood">
            <div className="flex items-center mb-4">
              <div 
                className="p-3 rounded-wood mr-3"
                style={{ backgroundColor: `${theme.primary}15` }}
              >
                <div style={{ color: theme.primary }}>
                  {categoryIcons[category as keyof typeof categoryIcons] || <Cloud className="w-6 h-6" />}
                </div>
              </div>
              <h3 className="text-xl font-semibold" style={{ color: theme.text }}>
                {category}
              </h3>
            </div>

            <div className="space-y-3">
              {categorySkills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-3 hover:bg-wood-primary/5 rounded-wood transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{skill.skill_name}</span>
                      {skill.years_of_experience && (
                        <span className="text-sm text-wood-text-light">
                          {skill.years_of_experience} {skill.years_of_experience === 1 ? 'year' : 'years'}
                        </span>
                      )}
                    </div>
                    
                    {/* Progress bar */}
                    <div className="h-2 bg-wood-border/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: 
                            skill.proficiency_level === 'Beginner' ? '25%' :
                            skill.proficiency_level === 'Intermediate' ? '50%' :
                            skill.proficiency_level === 'Advanced' ? '75%' : '100%',
                          backgroundColor: theme.accent
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${proficiencyColors[skill.proficiency_level]}`}>
                      {skill.proficiency_level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {skills.length === 0 && (
          <div className="card-wood text-center py-12">
            <div className="text-wood-text-light mb-4">No skills listed yet</div>
            <p className="text-sm text-wood-text-light">
              Skills will appear here once added
            </p>
          </div>
        )}
      </div>
    </div>
  )
}