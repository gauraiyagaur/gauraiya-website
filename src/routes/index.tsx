import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '~/components/Hero'
import { KpiStrip } from '~/components/KpiStrip'
import { LearningJourney } from '~/components/LearningJourney'
import { ProjectsSection } from '~/components/ProjectsSection'
import { SkillsDirectory } from '~/components/SkillsDirectory'
import { CurrentProjects } from '~/components/CurrentProjects'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <Hero />
      <KpiStrip />
      <LearningJourney />
      <ProjectsSection />
      <SkillsDirectory />
      <CurrentProjects />
    </>
  )
}
