'use client'

import { PortfolioProject } from '@/types'
import { PortfolioEducation } from '@/types'
import { useTheme } from './ThemeProvider'
import { ExternalLink, Github, Calendar, Code, Star, Users } from 'lucide-react'
import { format } from 'date-fns'
import { useState } from 'react'

interface ProjectsSectionProps {
  projects: PortfolioProject[]
  educations: PortfolioEducation[]
}
export default function ProjectsSection({ projects, educations }: ProjectsSectionProps) {
  const theme = useTheme()
  const [activeFilter, setActiveFilter] = useState<string>('all')
  
  const projectTypes = ['all', 'Web', 'Mobile', 'Desktop', 'Other']
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.project_type === activeFilter)

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold">All Projects</h3>
          <span className="text-wood-text-light">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {projectTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
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

        <div className="grid grid-cols-1 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} theme={theme} />
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
      </div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2" style={{ color: theme.primary }}>
          Educations
        </h2>
      </div>
      {educations.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center mb-6">
            {/* <Star className="w-6 h-6 mr-2" style={{ color: theme.accent }} /> */}
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
// function FeaturedProjectCard({ project, theme }: { project: PortfolioProject; theme: any }) {
//   return (
//     <div className="card-wood group hover:shadow-wood-lg transition-all duration-300">
//       {/* Project Image */}
//       <div className="relative h-48 mb-4 rounded-wood overflow-hidden">
//         {project.image_url ? (
//           <img
//             src={project.image_url}
//             alt={project.project_name}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//           />
//         ) : (
//           <div 
//             className="w-full h-full flex items-center justify-center"
//             style={{ backgroundColor: `${theme.primary}15` }}
//           >
//             <Code className="w-12 h-12" style={{ color: theme.primary, opacity: 0.5 }} />
//           </div>
//         )}
        
//         {/* Featured badge */}
//         <div className="absolute top-3 right-3">
//           <div className="flex items-center px-3 py-1 rounded-full bg-amber-500 text-white text-sm">
//             <Star className="w-3 h-3 mr-1 fill-current" />
//             Featured
//           </div>
//         </div>
        
//         {/* Type badge */}
//         <div className="absolute top-3 left-3">
//           <span className="px-3 py-1 rounded-full bg-white/90 text-wood-text text-sm font-medium backdrop-blur-sm">
//             {project.project_type}
//           </span>
//         </div>
//       </div>

//       {/* Project Info */}
//       <div>
//         <h4 className="text-xl font-bold mb-2 group-hover:text-wood-primary transition-colors">
//           {project.project_name}
//         </h4>
        
//         <p className="text-wood-text-light mb-4 line-clamp-2">
//           {project.description || 'No description available'}
//         </p>

//         {/* Technologies */}
//         <div className="flex flex-wrap gap-2 mb-4">
//           {project.technologies.slice(0, 3).map((tech) => (
//             <span 
//               key={tech}
//               className="px-2 py-1 rounded text-xs font-medium"
//               style={{
//                 backgroundColor: `${theme.primary}15`,
//                 color: theme.primary
//               }}
//             >
//               {tech}
//             </span>
//           ))}
//           {project.technologies.length > 3 && (
//             <span className="px-2 py-1 rounded text-xs text-wood-text-light">
//               +{project.technologies.length - 3} more
//             </span>
//           )}
//         </div>

//         {/* Project Meta */}
//         <div className="flex items-center justify-between text-sm text-wood-text-light">
//           <div className="flex items-center">
//             <Calendar className="w-4 h-4 mr-1" />
//             {format(new Date(project.start_date), 'MMM yyyy')}
//             {project.end_date && ` - ${format(new Date(project.end_date), 'MMM yyyy')}`}
//           </div>
          
//           {project.client_name && (
//             <div className="flex items-center">
//               <Users className="w-4 h-4 mr-1" />
//               {project.client_name}
//             </div>
//           )}
//         </div>

//         {/* Actions */}
//         <div className="flex items-center gap-3 mt-4 pt-4 border-t border-wood-border/30">
//           {project.project_url && (
//             <a
//               href={project.project_url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center text-sm font-medium hover:text-wood-primary transition-colors"
//             >
//               <ExternalLink className="w-4 h-4 mr-1" />
//               Live Demo
//             </a>
//           )}
          
//           {project.github_url && (
//             <a
//               href={project.github_url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center text-sm font-medium hover:text-wood-primary transition-colors ml-auto"
//             >
//               <Github className="w-4 h-4 mr-1" />
//               Code
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
function EducationCard({
  education,
  theme,
}: {
  education: PortfolioEducation
  theme: any
}) {
  return (
    <div className="relative bg-white/70 backdrop-blur rounded-wood px-8 py-6 w-full md:w-1/2 shadow-sm flex flex-col min-h-55">
      
      {/* Header (fixed spacing) */}
      <div className="mb-4 min-h-14">
        <h4 className="text-xl font-semibold leading-snug">
          {education.institution_name}
        </h4>
      </div>

      {/* Degree */}
      <p className="text-sm font-medium text-wood-text mb-1">
        {education.degree}
      </p>

      {/* Field */}
      <p className="text-sm text-wood-text-light">
        {education.field_of_study}
      </p>

      {/* Footer – ALWAYS bottom */}
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



function ProjectCard({ project, theme }: { project: PortfolioProject; theme: any }) {
  return (
    <div className="card-wood hover:shadow-wood-lg transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Project Image */}
        <div className="md:w-1/3">
          <div className="relative h-48 md:h-full rounded-wood overflow-hidden">
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
              <h4 className="text-xl font-bold mb-1">{project.project_name}</h4>
              <div className="flex items-center gap-3 text-sm text-wood-text-light">
                <span className="badge-wood">{project.project_type}</span>
                <span className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {format(new Date(project.start_date), 'MMM yyyy')}
                </span>
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

            <div className="flex items-center gap-3">
              {project.project_url && (
                <a
                  href={project.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wood-outline text-sm py-1 px-3 flex items-center"
                  style={{
                    borderColor: theme.accent,
                    color: theme.accent
                  }}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View
                </a>
              )}
              
              {project.github_url && (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}