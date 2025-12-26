import { supabase } from './supabase'

export class PortfolioAPI {
    static async getPortfolioByIdProfile(idProfile?: string) {
        try {
            const portfolioId = idProfile || process.env.NEXT_PUBLIC_PORTFOLIO_ID
            if (!portfolioId) {
                throw new Error('Portfolio ID not found in environment variables')
            }
            const { data: profile, error: profileError } = await supabase
                .from('portfolio_profiles')
                .select('*')
                .eq('id_profile', portfolioId)
                .eq('is_active', true)
                .limit(1)
                .single()

            if (profileError) throw profileError
            const [workExp, education, skills, languages, projects, certifications] = await Promise.all([
                supabase
                .from('portfolio_work_experiences')
                .select('*')
                .eq('profile_id', profile.id)
                .order('start_date', { ascending: false }),
                
                supabase
                .from('portfolio_educations')
                .select('*')
                .eq('profile_id', profile.id)
                .order('start_year', { ascending: false }),
                
                supabase
                .from('portfolio_skills')
                .select('*')
                .eq('profile_id', profile.id)
                .order('category', { ascending: true }),
                
                supabase
                .from('portfolio_languages')
                .select('*')
                .eq('profile_id', profile.id),
                
                supabase
                .from('portfolio_projects')
                .select('*')
                .eq('profile_id', profile.id)
                .order('start_date', { ascending: false }),
                
                supabase
                .from('portfolio_certifications')
                .select('*')
                .eq('profile_id', profile.id)
                .order('issue_date', { ascending: false })
            ])

            return {
                data: {
                    profile,
                    workExperiences: workExp.data || [],
                    educations: education.data || [],
                    skills: skills.data || [],
                    languages: languages.data || [],
                    projects: projects.data || [],
                    certifications: certifications.data || []
                },
                error: null
            }
        } catch (error) {
            console.error('Error fetching portfolio:', error)
            return { data: null, error }
        }
    }
    static async getSkillsByCategory(idProfile?: string) {
        try {
            const portfolioId = idProfile || process.env.NEXT_PUBLIC_PORTFOLIO_ID
            if (!portfolioId) throw new Error('Portfolio ID not found')
                const { data: profile } = await supabase
                    .from('portfolio_profiles')
                    .select('id')
                    .eq('id_profile', portfolioId)
                    .single()
            if (!profile) throw new Error('Profile not found')
                const { data, error } = await supabase
                    .from('portfolio_skills')
                    .select('*')
                    .eq('profile_id', profile.id)

            if (error) throw error
                const grouped = (data || []).reduce((acc, skill) => {
                    const category = skill.category || 'Other'
                    if (!acc[category]) acc[category] = []
                    acc[category].push(skill)
                    return acc
                }, {} as Record<string, any[]>)
            return { data: grouped, error: null }
        } catch (error) {
            console.error('Error fetching skills:', error)
            return { data: null, error }
        }
    }

    static async getFeaturedProjects(idProfile?: string) {
        try {
            const portfolioId = idProfile || process.env.NEXT_PUBLIC_PORTFOLIO_ID
            if (!portfolioId) throw new Error('Portfolio ID not found')
                const { data: profile } = await supabase
                    .from('portfolio_profiles')
                    .select('id')
                    .eq('id_profile', portfolioId)
                    .single()
            if (!profile) throw new Error('Profile not found')
                const { data, error } = await supabase
                    .from('portfolio_projects')
                    .select('*')
                    .eq('profile_id', profile.id)
                    .eq('featured', true)
                    .order('start_date', { ascending: false })
            if (error) throw error
                return { data, error: null }
        } catch (error) {
            console.error('Error fetching featured projects:', error)
            return { data: null, error }
        }
    }
}