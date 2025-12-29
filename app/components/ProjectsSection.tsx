'use client'

import { PortfolioEducation, PortfolioProfile ,PortfolioProject } from '@/types'
import { useTheme } from './ThemeProvider'
import { ExternalLink, Github, Calendar, Code, Star, Users, MessageCircle, Lock } from 'lucide-react'
import { format } from 'date-fns'
import { useState, useEffect } from 'react'

interface TunnelStatus {
  id: string
  web_url: string
  online_status: 'up' | 'down' | 'unknown'
}

interface ProjectWithTunnel extends PortfolioProject {
  category: 'work' | 'personal'
  id_tunnel: string | null
  tunnelStatus?: TunnelStatus
}

interface ProjectsSectionProps {
  projects: PortfolioProject[]
  educations: PortfolioEducation[]
  profile: PortfolioProfile
}

const ITEMS_PER_PAGE = 2

export default function ProjectsSection({ projects, educations, profile }: ProjectsSectionProps) {
  const theme = useTheme()
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [projectsWithTunnel, setProjectsWithTunnel] = useState<ProjectWithTunnel[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  
  const projectTypes = ['all', 'Web', 'Mobile', 'Game', 'Other']

  useEffect(() => {
    const fetchTunnelStatuses = async () => {
      try {
        const projectsWithEnhancedData = await Promise.all(
          projects.map(async (project) => {
            const p = project as ProjectWithTunnel
            if (p.id_tunnel) {
              try {
                const response = await fetch(`/api/tunnel-status/${p.id_tunnel}`)
                if (response.ok) {
                  const tunnelStatus = await response.json()
                  return { ...p, tunnelStatus }
                }
              } catch (error) {
                console.error(`Failed to fetch tunnel status for ${p.id_tunnel}:`, error)
              }
            }
            return p
          })
        )
        setProjectsWithTunnel(projectsWithEnhancedData)
      } catch (error) {
        console.error('Failed to fetch tunnel statuses:', error)
        setProjectsWithTunnel(projects as ProjectWithTunnel[])
      } finally {
        setLoading(false)
      }
    }

    fetchTunnelStatuses()
  }, [projects])

  const filteredProjects = activeFilter === 'all' 
    ? projectsWithTunnel 
    : projectsWithTunnel.filter(project => project.project_type === activeFilter)

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )
  const showPagination = filteredProjects.length > ITEMS_PER_PAGE

  const handleWhatsAppTunnel = (projectName: string, phoneNumber: string) => {
    const message = encodeURIComponent(`Hi, can you please start the tunnel for the "${projectName}" project?`)
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold">All Projects</h3>
          <span className="text-wood-text-light">
            {projectsWithTunnel.length} {projectsWithTunnel.length === 1 ? 'project' : 'projects'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {projectTypes.map((type) => (
            <button
              key={type}
              onClick={() => {
                setActiveFilter(type)
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-wood font-medium transition-all ${activeFilter === type 
                ? 'btn-wood' 
                : 'bg-wood-primary/10 text-wood-text hover:bg-wood-primary/20'}`}
              style={activeFilter === type ? {
                backgroundColor: theme.primary,
                color: '#FFFFFF'
              } : {}}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="card-wood text-center py-12">
            <div className="text-wood-text-light">Loading projects...</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6">
              {paginatedProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  profile={profile} 
                  theme={theme}
                  onWhatsAppTunnel={handleWhatsAppTunnel}
                />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="card-wood text-center py-12">
                <div className="text-wood-text-light mb-4">No projects found</div>
                <p className="text-sm text-wood-text-light">
                  {activeFilter === 'all' 
                    ? 'No projects have been added yet' 
                    : `No ${activeFilter.toLowerCase()} projects found`}
                </p>
              </div>
            )}

            {showPagination && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-wood font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: currentPage === 1 ? '#BCAAA4' : theme.primary,
                    color: '#FFFFFF'
                  }}
                >
                  Previous
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-wood font-medium transition-all ${
                        currentPage === page ? 'btn-wood' : 'bg-wood-primary/10 text-wood-text hover:bg-wood-primary/20'
                      }`}
                      style={currentPage === page ? {
                        backgroundColor: theme.primary,
                        color: '#FFFFFF'
                      } : {}}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-wood font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: currentPage === totalPages ? '#BCAAA4' : theme.primary,
                    color: '#FFFFFF'
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="text-center mb-2">
        <h2 className="text-3xl font-bold mb-2" style={{ color: theme.primary }}>
          Educations
        </h2>
      </div>

      {educations.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <h3 className="text-2xl font-semibold"></h3>
          </div>

          <div className="relative flex flex-col md:flex-row gap-10">            
            {educations.map((edu) => (
              <EducationCard key={edu.id} education={edu} theme={theme} />
            ))}
          </div>
        </div>
      )}

      {educations.length === 0 && (
        <div className="card-wood text-center py-12">
          <div className="text-wood-text-light mb-4">No education listed yet</div>
          <p className="text-sm text-wood-text-light">
            Education will appear here once added
          </p>
        </div>
      )}
    </div>
  )
}

function EducationCard({
  education,
  theme,
}: {
  education: PortfolioEducation
  theme: any
}) {
  return (
    <div className="relative bg-white/70 backdrop-blur rounded-wood px-8 py-6 w-full md:w-1/2 shadow-sm flex flex-col min-h-55">
      <div className="mb-4 min-h-14">
        <h4 className="text-xl font-semibold leading-snug">
          {education.institution_name}
        </h4>
      </div>

      <p className="text-sm font-medium text-wood-text mb-1">
        {education.degree}
      </p>

      <p className="text-sm text-wood-text-light">
        {education.field_of_study}
      </p>

      <div className="flex items-center justify-between text-sm text-wood-text-light mt-auto pt-4">
        <span>
          {education.start_year} –{' '}
          {education.is_current ? 'Present' : education.end_year}
        </span>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            education.is_current
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-100 text-blue-700'
          }`}
        >
          {education.is_current ? 'Studying' : 'Completed'}
        </span>
      </div>
    </div>
  )
}

function ProjectCard({ 
  project, 
  profile, 
  theme, 
  onWhatsAppTunnel 
}: { 
  project: ProjectWithTunnel
  profile: any
  theme: any
  onWhatsAppTunnel: (projectName: string, phone: string) => void
}) {
  const isTunnelDown = project.id_tunnel && (!project.tunnelStatus || project.tunnelStatus.online_status !== 'up')
  const isPersonalCompleted = project.category === 'personal' && !project.is_ongoing
  const isWorkProject = project.category === 'work'
  const hasWebUrl = project.tunnelStatus?.web_url || project.project_url

  return (
    <div className="card-wood hover:shadow-wood-lg transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Project Image */}
        <div className="md:w-1/3 shrink-0">
          <div className="relative w-full h-48 md:h-56 rounded-wood overflow-hidden">
            {project.image_url ? (
              <img
                src={project.image_url}
                alt={project.project_name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: `${theme.primary}10` }}
              >
                <Code className="w-16 h-16" style={{ color: theme.primary, opacity: 0.3 }} />
              </div>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="md:w-2/3">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-xl font-bold">{project.project_name}</h4>
                {isWorkProject && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">
                    <Lock className="w-3 h-3" />
                    Work
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm text-wood-text-light flex-wrap">
                <span className="badge-wood">{project.project_type}</span>
                <span className="badge-wood capitalize">{project.category}</span>
                
                {project.client_name && (
                  <span className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {project.client_name}
                  </span>
                )}
              </div>
            </div>
            
            {project.featured && (
              <Star className="w-5 h-5" style={{ color: theme.accent }} />
            )}
          </div>

          <p className="text-wood-text-light mb-4">
            {project.description || 'No description available'}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${theme.secondary}20`,
                  color: theme.text
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Role and Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-wood-border/30">
            <div>
              <span className="text-sm font-medium" style={{ color: theme.primary }}>
                {project.role}
              </span>
              <div className={`text-xs px-2 py-1 rounded-full inline-block ml-2 ${
                project.is_ongoing 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {project.is_ongoing ? 'Ongoing' : 'Completed'}
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {isTunnelDown && (
                <button
                  onClick={() => onWhatsAppTunnel(project.project_name, profile.phone)}
                  className="btn-wood-outline text-sm py-1 px-3 flex items-center"
                  style={{
                    borderColor: '#ef4444',
                    color: '#ef4444'
                  }}
                  title="Tunnel is down - Request to start"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Start Tunnel
                </button>
              )}

              {isPersonalCompleted && hasWebUrl && (
                <a
                  href={project.tunnelStatus?.web_url || project.project_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wood-outline text-sm py-1 px-3 flex items-center"
                  style={{
                    borderColor: theme.accent,
                    color: theme.accent
                  }}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View Site
                </a>
              )}

              {project.github_url && !isWorkProject && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wood-outline text-sm py-1 px-3 flex items-center"
                  style={{
                    borderColor: theme.primary,
                    color: theme.primary
                  }}
                >
                  <Github className="w-3 h-3 mr-1" />
                  Code
                </a>
              )}

              {isWorkProject && project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wood-outline text-sm py-1 px-3 flex items-center opacity-60"
                  style={{
                    borderColor: theme.primary,
                    color: theme.primary
                  }}
                  title="Private repository"
                >
                  <Github className="w-3 h-3 mr-1" />
                  Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}