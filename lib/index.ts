export interface PortfolioProfile {
    id: string
    id_profile: string
    full_name: string
    email: string
    location: string
    title: string
    description: string
    phone: string | null
    website: string | null
    linkedin_url: string | null
    github_url: string | null
    avatar_url: string | null
    created_at: string
    updated_at: string
}

export interface PortfolioWorkExperience {
    id: string
    profile_id: string
    company_name: string
    position: string
    employment_type: string
    start_date: string
    end_date: string | null
    is_current: boolean
    location: string
    description: string | null
    created_at: string
}

export interface PortfolioEducation {
    id: string
    profile_id: string
    institution_name: string
    degree: string
    field_of_study: string
    start_year: number
    end_year: number | null
    is_current: boolean
    created_at: string
}

export interface PortfolioSkill {
    id: string
    profile_id: string
    skill_name: string
    category: 'Frontend' | 'Backend' | 'Database' | 'Mobile' | 'Other'
    proficiency_level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
    years_of_experience: number | null
    created_at: string
}

export interface PortfolioLanguage {
    id: string
    profile_id: string
    language_name: string
    proficiency_level: 'Native' | 'Fluent' | 'Intermediate' | 'Beginner'
    created_at: string
}

export interface PortfolioProject {
    id: string
    profile_id: string
    project_name: string
    project_type: 'Web' | 'Mobile' | 'Desktop' | 'Other'
    description: string | null
    technologies: string[]
    project_url: string | null
    github_url: string | null
    image_url: string | null
    start_date: string
    end_date: string | null
    is_ongoing: boolean
    client_name: string | null
    role: string
    featured: boolean
    created_at: string
    updated_at: string
}

export interface PortfolioCertification {
    id: string
    profile_id: string
    certification_name: string
    issuing_organization: string
    issue_date: string
    expiry_date: string | null
    credential_id: string | null
    credential_url: string | null
    created_at: string
}