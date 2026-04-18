'use client'

import { useEffect, useState } from 'react'
import PackCard from '@/components/features/PackCard'
import { PACKS } from '@/lib/constants'
import { loadProgress } from '@/lib/utils'

export default function HomePage() {
  const [progressMap, setProgressMap] = useState<Record<string, number>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const map: Record<string, number> = {}
    PACKS.forEach((pack) => {
      const completed = loadProgress(pack.slug)
      map[pack.slug] = completed.length
    })
    setProgressMap(map)
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              backgroundColor: 'var(--accent-subtle, rgba(44,95,138,0.08))',
              color: 'var(--accent)',
              border: '1px solid rgba(44,95,138,0.15)',
            }}
          >
            <span>🛠️</span>
            <span>Guide interactif · Progression sauvegardée</span>
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ color: 'var(--fg)' }}
          >
            Créez des sites vitrines{' '}
            <span style={{ color: 'var(--accent)' }}>artisans</span>
            <br />
            pas à pas
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
            style={{ color: 'var(--fg-muted)' }}
          >
            Choisissez un pack et suivez le guide étape par étape.
            Chaque étape contient les commandes, le code complet et le résultat attendu.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm" style={{ color: 'var(--fg-muted)' }}>
            {[
              { value: '3', label: 'packs disponibles' },
              { value: '24', label: 'étapes guidées' },
              { value: '100%', label: 'code copiable' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className="font-bold text-lg" style={{ color: 'var(--accent)' }}>
                  {stat.value}
                </span>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pack cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PACKS.map((pack) => (
            <PackCard
              key={pack.slug}
              pack={pack}
              completedSteps={mounted ? (progressMap[pack.slug] ?? 0) : 0}
            />
          ))}
        </div>

        {/* How it works */}
        <div
          className="rounded-2xl p-8 md:p-12"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
          }}
        >
          <h2
            className="text-2xl font-bold text-center mb-10"
            style={{ color: 'var(--fg)' }}
          >
            Comment ça fonctionne ?
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', icon: '📦', title: 'Choisissez un pack', desc: 'Starter, Artisan ou Business selon le budget du client.' },
              { step: '02', icon: '👣', title: 'Suivez les étapes', desc: 'Instructions détaillées avec le code complet à copier.' },
              { step: '03', icon: '✅', title: 'Cochez au fur et à mesure', desc: 'La progression est sauvegardée automatiquement.' },
              { step: '04', icon: '🚀', title: 'Livrez le site', desc: 'Validez la checklist finale avant de livrer au client.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 text-2xl"
                  style={{ backgroundColor: 'var(--bg)' }}
                >
                  {item.icon}
                </div>
                <div
                  className="text-xs font-bold mb-1 uppercase tracking-widest"
                  style={{ color: 'var(--accent)' }}
                >
                  Étape {item.step}
                </div>
                <div className="font-semibold mb-2" style={{ color: 'var(--fg)' }}>
                  {item.title}
                </div>
                <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
