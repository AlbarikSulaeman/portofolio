import { PortfolioAPI } from '@/lib/api'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import Footer from './components/Footer'

export default async function Home() {
  const { data: portfolio } = await PortfolioAPI.getPortfolioByIdProfile()
  
  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Portfolio tidak ditemukan</h1>
          <p>Silakan periksa konfigurasi environment variables.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar profile={portfolio.profile} />
      <main className="container mx-auto px-4 py-8">
        <Hero profile={portfolio.profile} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2">
            <ProjectsSection 
              projects={portfolio.projects} 
              educations={portfolio.educations}
            />
          </div>
          <div>
            <SkillsSection skills={portfolio.skills} />
          </div>
        </div>
      </main>
      <Footer profile={portfolio.profile} />
    </div>
  )
}