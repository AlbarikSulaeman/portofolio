'use client'

import { PortfolioSkill, PortfolioWorkExperience } from '@/types'
import { useTheme } from './ThemeProvider'
import { Code, Database, Palette, Cpu, Briefcase, Calendar, MapPin } from 'lucide-react'
import { format } from 'date-fns'
import { useState } from 'react'

interface SkillsSectionProps {
  skills: PortfolioSkill[]
  workExperiences?: PortfolioWorkExperience[]
}

const categoryIcons = {
  'Frontend': <Code className="w-6 h-6" />,
  'Backend': <Cpu className="w-6 h-6" />,
  'Database': <Database className="w-6 h-6" />,
  'Other': <Palette className="w-6 h-6" />,
}

const proficiencyColors = {
  'Beginner': 'bg-green-100 text-green-800',
  'Intermediate': 'bg-blue-100 text-blue-800',
  'Advanced': 'bg-purple-100 text-purple-800',
  'Expert': 'bg-amber-100 text-amber-800',
}

const ITEMS_PER_PAGE = 3

export default function SkillsSection({ skills, workExperiences = [] }: SkillsSectionProps) {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState<string>('Frontend')
  const [skillPage, setSkillPage] = useState(1)
  const [workPage, setWorkPage] = useState(1)
  
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {} as Record<string, PortfolioSkill[]>)

  const categories = Object.keys(groupedSkills)
  const activeCategory = categories.includes(activeTab) ? activeTab : (categories[0] || 'Other')

  // Skills pagination
  const activeCategorySkills = groupedSkills[activeCategory] || []
  const skillTotalPages = Math.ceil(activeCategorySkills.length / ITEMS_PER_PAGE)
  const paginatedSkills = activeCategorySkills.slice(
    (skillPage - 1) * ITEMS_PER_PAGE,
    skillPage * ITEMS_PER_PAGE
  )
  const showSkillPagination = activeCategorySkills.length > ITEMS_PER_PAGE

  // Work experience pagination
  const workTotalPages = Math.ceil(workExperiences.length / ITEMS_PER_PAGE)
  const paginatedWork = workExperiences.slice(
    (workPage - 1) * ITEMS_PER_PAGE,
    workPage * ITEMS_PER_PAGE
  )
  const showWorkPagination = workExperiences.length > ITEMS_PER_PAGE

  return (
    <div className="space-y-12">
      {/* Technical Skills Section */}
      <div className="space-y-8">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-semibold">Technical Skills</h3>
            
        </div>

        {skills.length > 0 ? (
          <>
            {/* Category Tabs */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveTab(category)
                    setSkillPage(1)
                  }}
                  className={`px-4 py-2 rounded-wood font-medium transition-all ${activeTab === category 
                    ? 'btn-wood' 
                    : 'bg-wood-primary/10 text-wood-text hover:bg-wood-primary/20'}`}
                  style={activeTab === category ? {
                    backgroundColor: theme.primary,
                    color: '#FFFFFF'
                  } : {}}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Skills Content */}
            <div className="card-wood">
              <div className="space-y-4">
                {paginatedSkills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between p-3 hover:bg-wood-primary/5 rounded-wood transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{skill.skill_name}</span>
                        {skill.years_of_experience && (
                          <span className="text-sm text-wood-text-light">
                            {skill.years_of_experience} {skill.years_of_experience === 1 ? 'year' : 'years'}
                          </span>
                        )}
                      </div>
                      
                      <div className="h-2 bg-wood-border/30 rounded-full overflow-hidden mb-2">
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

                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${proficiencyColors[skill.proficiency_level]}`}>
                        {skill.proficiency_level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Pagination */}
            {showSkillPagination && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setSkillPage(prev => Math.max(prev - 1, 1))}
                  disabled={skillPage === 1}
                  className="px-4 py-2 rounded-wood font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: skillPage === 1 ? '#BCAAA4' : theme.primary,
                    color: '#FFFFFF'
                  }}
                >
                  Previous
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: skillTotalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setSkillPage(page)}
                      className={`px-3 py-2 rounded-wood font-medium transition-all ${
                        skillPage === page ? 'btn-wood' : 'bg-wood-primary/10 text-wood-text hover:bg-wood-primary/20'
                      }`}
                      style={skillPage === page ? {
                        backgroundColor: theme.primary,
                        color: '#FFFFFF'
                      } : {}}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setSkillPage(prev => Math.min(prev + 1, skillTotalPages))}
                  disabled={skillPage === skillTotalPages}
                  className="px-4 py-2 rounded-wood font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: skillPage === skillTotalPages ? '#BCAAA4' : theme.primary,
                    color: '#FFFFFF'
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="card-wood text-center py-12">
            <div className="text-wood-text-light mb-4">No skills listed yet</div>
            <p className="text-sm text-wood-text-light">Skills will appear here once added</p>
          </div>
        )}
      </div>

      {/* Work Experience Section */}
      {workExperiences.length > 0 ? (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2" style={{ color: theme.primary }}>
              Work Experience
            </h2>
          </div>

          <div className="space-y-4">
            {paginatedWork.map((experience, index) => (
              <WorkExperienceCard 
                key={experience.id} 
                experience={experience} 
                theme={theme}
                isLast={index === paginatedWork.length - 1}
              />
            ))}
          </div>

          {/* Work Experience Pagination */}
          {showWorkPagination && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setWorkPage(prev => Math.max(prev - 1, 1))}
                disabled={workPage === 1}
                className="px-4 py-2 rounded-wood font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: workPage === 1 ? '#BCAAA4' : theme.primary,
                  color: '#FFFFFF'
                }}
              >
                Previous
              </button>

              <div className="flex gap-1">
                {Array.from({ length: workTotalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setWorkPage(page)}
                    className={`px-3 py-2 rounded-wood font-medium transition-all ${
                      workPage === page ? 'btn-wood' : 'bg-wood-primary/10 text-wood-text hover:bg-wood-primary/20'
                    }`}
                    style={workPage === page ? {
                      backgroundColor: theme.primary,
                      color: '#FFFFFF'
                    } : {}}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setWorkPage(prev => Math.min(prev + 1, workTotalPages))}
                disabled={workPage === workTotalPages}
                className="px-4 py-2 rounded-wood font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: workPage === workTotalPages ? '#BCAAA4' : theme.primary,
                  color: '#FFFFFF'
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}

function WorkExperienceCard({
  experience,
  theme,
  isLast
}: {
  experience: PortfolioWorkExperience
  theme: any
  isLast: boolean
}) {
  const endDate = experience.end_date 
    ? format(new Date(experience.end_date), 'MMM yyyy')
    : 'Present'

  return (
    <div className="relative">
      {!isLast && (
        <div 
          className="absolute left-5 top-20 bottom-0 w-0.5"
          style={{ backgroundColor: `${theme.primary}30` }}
        />
      )}

      <div className="card-wood pl-16 hover:shadow-wood-lg transition-all duration-300">
        <div 
          className="absolute left-2 top-6 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: theme.primary }}
        >
          <Briefcase className="w-5 h-5 text-white" />
        </div>

        <div>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="text-lg font-bold">{experience.position}</h4>
              <p className="text-wood-text-light font-medium">{experience.company_name}</p>
            </div>
            {experience.is_current && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Current
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 text-sm text-wood-text-light mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {format(new Date(experience.start_date), 'MMM yyyy')} - {endDate}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {experience.location}
            </div>
            {experience.employment_type && (
              <span className="px-2 py-1 rounded-full text-xs font-medium w-fit"
                style={{
                  backgroundColor: `${theme.secondary}20`,
                  color: theme.text
                }}
              >
                {experience.employment_type}
              </span>
            )}
          </div>

          {experience.description && (
            <p className="text-wood-text-light text-sm leading-relaxed">
              {experience.description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}