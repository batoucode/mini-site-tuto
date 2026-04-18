'use client'

import { useState, useEffect } from 'react'
import { loadChecklist, saveChecklist } from '@/lib/utils'
import Link from 'next/link'

interface ChecklistProps {
  packSlug: string
  packName: string
  items: string[]
}

export default function Checklist({ packSlug, packName, items }: ChecklistProps) {
  const [checked, setChecked] = useState<number[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setChecked(loadChecklist(packSlug))
  }, [packSlug])

  const toggleItem = (index: number) => {
    const newChecked = checked.includes(index)
      ? checked.filter((i) => i !== index)
      : [...checked, index]
    setChecked(newChecked)
    saveChecklist(packSlug, newChecked)
  }

  const allDone = checked.length === items.length
  const percentage = Math.round((checked.length / items.length) * 100)

  if (!mounted) return null

  return (
    <div
      className="rounded-xl p-6"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold" style={{ color: 'var(--fg)' }}>
            🏁 Checklist de validation
          </h3>
          <p className="text-sm mt-1" style={{ color: 'var(--fg-muted)' }}>
            {packName} — Vérifiez chaque point avant la livraison
          </p>
        </div>
        <div
          className="text-2xl font-bold"
          style={{ color: allDone ? 'var(--success)' : 'var(--accent)' }}
        >
          {percentage}%
        </div>
      </div>

      {/* Progress */}
      <div
        className="h-2 rounded-full overflow-hidden mb-6"
        style={{ backgroundColor: 'var(--border)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: allDone ? 'var(--success)' : 'var(--accent)',
          }}
        />
      </div>

      {/* Items */}
      <div className="space-y-3">
        {items.map((item, index) => {
          const isDone = checked.includes(index)
          return (
            <label
              key={index}
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:opacity-90"
              style={{
                backgroundColor: isDone
                  ? 'rgba(22, 163, 74, 0.06)'
                  : 'var(--bg)',
                border: `1px solid ${isDone ? 'rgba(22, 163, 74, 0.3)' : 'var(--border)'}`,
              }}
            >
              {/* Custom checkbox */}
              <div
                className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  backgroundColor: isDone ? 'var(--success)' : 'transparent',
                  border: `2px solid ${isDone ? 'var(--success)' : 'var(--border)'}`,
                }}
              >
                {isDone && (
                  <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                  >
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                checked={isDone}
                onChange={() => toggleItem(index)}
                className="sr-only"
              />
              <span
                className="text-sm"
                style={{
                  color: isDone ? 'var(--fg-muted)' : 'var(--fg)',
                  textDecoration: isDone ? 'line-through' : 'none',
                }}
              >
                {item}
              </span>
            </label>
          )
        })}
      </div>

      {/* Success state */}
      {allDone && (
        <div
          className="mt-6 p-5 rounded-xl text-center"
          style={{
            backgroundColor: 'rgba(22, 163, 74, 0.08)',
            border: '1px solid rgba(22, 163, 74, 0.3)',
          }}
        >
          <div className="text-3xl mb-2">🎉</div>
          <div className="font-bold text-lg mb-1" style={{ color: 'var(--success)' }}>
            Site prêt à livrer !
          </div>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
            Tous les points ont été validés. Le site est prêt à être livré au client.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-5 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--success)' }}
          >
            Retour à l'accueil →
          </Link>
        </div>
      )}
    </div>
  )
}
