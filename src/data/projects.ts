import projectsJson from './projects.json'

export type Project = {
  slug: string
  number: string
  title: string
  client: string
  role: string
  category: string
  context: string
  mandate: string
  result: string
  href?: string
  linkLabel?: string
  status?: 'Live' | 'In progress'
}

export const projects: Project[] = projectsJson as Project[]
