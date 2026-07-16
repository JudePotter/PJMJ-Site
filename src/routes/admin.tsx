import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import type { Project } from '#/data/projects'

const getProjects = createServerFn({ method: 'GET' }).handler(async () => {
  const { readFile } = await import('node:fs/promises')
  const { fileURLToPath } = await import('node:url')
  const path = await import('node:path')
  const dataPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../data/projects.json',
  )
  const raw = await readFile(dataPath, 'utf-8')
  return JSON.parse(raw) as Project[]
})

const saveProjects = createServerFn({ method: 'POST' })
  .validator((data: Project[]) => data)
  .handler(async ({ data }) => {
    const { writeFile } = await import('node:fs/promises')
    const { fileURLToPath } = await import('node:url')
    const path = await import('node:path')
    const dataPath = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      '../data/projects.json',
    )
    const renumbered = data.map((project, i) => ({
      ...project,
      number: String(i + 1).padStart(2, '0'),
    }))
    await writeFile(dataPath, JSON.stringify(renumbered, null, 2) + '\n', 'utf-8')
    return renumbered
  })

export const Route = createFileRoute('/admin')({
  loader: async () => getProjects(),
  component: AdminPage,
})

const blankProject: Project = {
  slug: '',
  number: '',
  title: '',
  client: '',
  role: '',
  category: '',
  context: '',
  mandate: '',
  result: '',
  href: '',
  linkLabel: 'Visit site',
  status: 'In progress',
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function AdminPage() {
  const initial = Route.useLoaderData()
  const [projects, setProjects] = useState<Project[]>(initial)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  function updateField<K extends keyof Project>(index: number, field: K, value: Project[K]) {
    setProjects((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    )
  }

  function addProject() {
    setProjects((prev) => [...prev, { ...blankProject }])
  }

  function removeProject(index: number) {
    setProjects((prev) => prev.filter((_, i) => i !== index))
  }

  function moveProject(index: number, direction: -1 | 1) {
    setProjects((prev) => {
      const next = [...prev]
      const target = index + direction
      if (target < 0 || target >= next.length) return prev
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  async function handleSave() {
    setStatus('saving')
    try {
      const withSlugs = projects.map((p) => ({
        ...p,
        slug: p.slug || slugify(p.title),
      }))
      const saved = await saveProjects({ data: withSlugs })
      setProjects(saved)
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="mx-auto max-w-[1000px] px-6 py-16 md:px-12">
      <div className="mb-10 flex items-center justify-between border-b border-rule pb-6">
        <div>
          <p className="eyebrow mb-2">Local CMS</p>
          <h1 className="display text-3xl md:text-4xl">Recent work</h1>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={status === 'saving'}
          className="rounded-full bg-racing px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === 'saving' ? 'Saving…' : status === 'saved' ? 'Saved ✓' : 'Save to disk'}
        </button>
      </div>

      {status === 'error' ? (
        <p className="mb-8 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-800">
          Save failed. Check the terminal for the error and try again.
        </p>
      ) : null}

      <div className="space-y-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="rounded-2xl border border-rule bg-paper p-6 shadow-sm md:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="display text-2xl text-racing">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => moveProject(index, -1)}
                  disabled={index === 0}
                  className="eyebrow rounded border border-rule px-3 py-1 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveProject(index, 1)}
                  disabled={index === projects.length - 1}
                  className="eyebrow rounded border border-rule px-3 py-1 disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="eyebrow rounded border border-rule px-3 py-1 text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Title">
                <input
                  className="input"
                  value={project.title}
                  onChange={(e) => updateField(index, 'title', e.target.value)}
                />
              </Field>
              <Field label="Client">
                <input
                  className="input"
                  value={project.client}
                  onChange={(e) => updateField(index, 'client', e.target.value)}
                />
              </Field>
              <Field label="Role">
                <input
                  className="input"
                  value={project.role}
                  onChange={(e) => updateField(index, 'role', e.target.value)}
                />
              </Field>
              <Field label="Category">
                <input
                  className="input"
                  value={project.category}
                  onChange={(e) => updateField(index, 'category', e.target.value)}
                />
              </Field>
              <Field label="Live URL (blank = hides button)">
                <input
                  className="input"
                  value={project.href ?? ''}
                  onChange={(e) => updateField(index, 'href', e.target.value)}
                  placeholder="https://…"
                />
              </Field>
              <Field label="Status">
                <select
                  className="input"
                  value={project.status ?? 'In progress'}
                  onChange={(e) =>
                    updateField(index, 'status', e.target.value as Project['status'])
                  }
                >
                  <option value="Live">Live</option>
                  <option value="In progress">In progress</option>
                </select>
              </Field>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4">
              <Field label="Context">
                <textarea
                  className="input min-h-24"
                  value={project.context}
                  onChange={(e) => updateField(index, 'context', e.target.value)}
                />
              </Field>
              <Field label="Mandate">
                <textarea
                  className="input min-h-24"
                  value={project.mandate}
                  onChange={(e) => updateField(index, 'mandate', e.target.value)}
                />
              </Field>
              <Field label="Result">
                <textarea
                  className="input min-h-24"
                  value={project.result}
                  onChange={(e) => updateField(index, 'result', e.target.value)}
                />
              </Field>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addProject}
        className="eyebrow mt-8 w-full rounded-2xl border border-dashed border-rule py-6 text-center transition-colors hover:border-racing hover:text-racing"
      >
        + Add project
      </button>

      <style>{`
        .input {
          width: 100%;
          border: 1px solid var(--rule);
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          background: var(--paper);
          color: var(--ink);
        }
        .input:focus {
          outline: 2px solid var(--racing);
          outline-offset: 1px;
        }
      `}</style>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow mb-1.5 block">{label}</span>
      {children}
    </label>
  )
}
