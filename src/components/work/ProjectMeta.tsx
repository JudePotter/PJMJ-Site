import type { Project } from '@/content/projects'

/** Pill tags: Design, Development, Copy, SEO and so on. */
export function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-ink px-2.5 py-[0.28rem] text-[0.78rem] leading-none"
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}

/** A quiet link out to the live site, only when there is one. */
export function VisitLink({ project }: { project: Project }) {
  if (!project.liveUrl) return null
  return (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="t-label mt-2.5 -mb-1.5 inline-block py-1.5 text-ink underline decoration-line underline-offset-4 transition-colors duration-300 hover:decoration-ink"
    >
      Visit site ↗
    </a>
  )
}
