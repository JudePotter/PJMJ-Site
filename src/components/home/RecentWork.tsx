import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { KineticWord } from '#/components/motion/KineticWord'
import { ScrollReveal } from '#/components/motion/ScrollReveal'
import { projects } from '#/data/projects'

export function RecentWork() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
      <div className="mb-16 flex items-end justify-between border-b border-rule pb-6">
        <h2 className="display text-4xl md:text-6xl">
          <KineticWord text="Recent work." />
        </h2>
        <p className="eyebrow hidden md:block">Selected projects</p>
      </div>

      <div className="border-t border-rule">
        {projects.map((project) => (
          <ProjectRow key={project.slug}>
            <ProjectRowContent project={project} />
          </ProjectRow>
        ))}
      </div>
    </section>
  )
}

function ProjectRow({ children }: { children: ReactNode }) {
  return <div className="group relative border-b border-rule">{children}</div>
}

function ProjectRowContent({ project }: { project: (typeof projects)[number] }) {
  const inner = (
    <>
      <div className="absolute inset-0 z-0 origin-top scale-y-0 bg-racing transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-y-100" />

      <span
        aria-hidden
        className="display pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-[16rem] leading-none text-paper opacity-0 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:opacity-10 md:text-[22rem]"
      >
        {project.number}
      </span>

      <div className="relative z-10 flex flex-col items-start gap-4 px-6 py-10 transition-colors duration-500 group-hover:text-paper md:flex-row md:items-center md:justify-between md:px-4 md:py-14">
        <span className="display w-20 text-3xl text-racing transition-colors duration-500 group-hover:text-gold md:text-5xl">
          {project.number}
        </span>

        <div className="flex-1 md:px-8">
          <h3 className="display text-2xl md:text-4xl">{project.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground transition-colors duration-500 group-hover:text-paper/70">
            {project.client} · {project.role}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="eyebrow text-right transition-colors duration-500 group-hover:text-paper/70">
            {project.category}
          </span>
          {project.href ? (
            <span className="flex items-center gap-1 text-xs font-medium tracking-wide text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {project.linkLabel ?? 'Visit site'}
              <ArrowUpRight size={14} className="text-gold" />
            </span>
          ) : (
            <ArrowUpRight
              size={20}
              className="-translate-x-2 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            />
          )}
        </div>
      </div>
    </>
  )

  return (
    <>
      {project.href ? (
        <a href={project.href} target="_blank" rel="noreferrer" className="relative block">
          {inner}
        </a>
      ) : (
        <div className="relative">{inner}</div>
      )}

      {project.body ? (
        <div className="relative z-10 max-w-3xl px-6 pb-14 md:px-4">
          {project.body.map((paragraph, i) => (
            <ScrollReveal
              key={i}
              className="font-display mb-4 leading-relaxed font-light last:mb-0"
            >
              {paragraph}
            </ScrollReveal>
          ))}
        </div>
      ) : null}
    </>
  )
}
