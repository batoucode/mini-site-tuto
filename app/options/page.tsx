import type { Metadata } from 'next'
import { OPTIONS, PACKS } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Options disponibles — Guide Artisan Pro',
  description: 'Toutes les options disponibles pour enrichir les packs Starter, Artisan et Business.',
}

export default function OptionsPage() {
  const totalOptions = OPTIONS.reduce((sum, opt) => sum + opt.price, 0)

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: 'var(--fg)' }}
          >
            Options disponibles
          </h1>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: 'var(--fg-muted)' }}
          >
            Ces options s'ajoutent à n'importe quel pack. Elles sont disponibles
            dans le calculateur de prix sur chaque page pack.
          </p>
        </div>

        {/* Options grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {OPTIONS.map((option) => (
            <div
              key={option.id}
              className="flex items-start gap-4 p-5 rounded-xl transition-all hover:shadow-card"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--accent-subtle, rgba(44,95,138,0.08))' }}
              >
                <span style={{ color: 'var(--accent)' }}>+</span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold" style={{ color: 'var(--fg)' }}>
                    {option.label}
                  </h3>
                  <span
                    className="text-sm font-bold flex-shrink-0 px-2 py-0.5 rounded-lg"
                    style={{
                      color: 'var(--accent)',
                      backgroundColor: 'var(--accent-subtle, rgba(44,95,138,0.08))',
                    }}
                  >
                    +{formatPrice(option.price)}
                  </span>
                </div>
                <p className="text-sm mt-1" style={{ color: 'var(--fg-muted)' }}>
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div
          className="p-6 rounded-xl mb-12 text-center"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
          }}
        >
          <p className="text-sm mb-1" style={{ color: 'var(--fg-muted)' }}>
            Valeur totale de toutes les options
          </p>
          <p
            className="text-3xl font-bold mb-3"
            style={{ color: 'var(--accent)' }}
          >
            {formatPrice(totalOptions)}
          </p>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
            Le calculateur de prix sur chaque page pack vous permet de sélectionner
            les options souhaitées et d'obtenir un total en temps réel.
          </p>
        </div>

        {/* CTA: go to packs */}
        <div className="grid md:grid-cols-3 gap-4">
          {PACKS.map((pack) => (
            <Link
              key={pack.slug}
              href={`/pack/${pack.slug}`}
              className="block p-5 rounded-xl transition-all hover:shadow-card-hover hover:scale-105 text-center"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: `2px solid ${pack.color}28`,
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <div
                className="text-sm font-bold uppercase tracking-wide mb-1"
                style={{ color: pack.color }}
              >
                {pack.name}
              </div>
              <div
                className="text-2xl font-bold mb-2"
                style={{ color: 'var(--fg)' }}
              >
                {formatPrice(pack.price)}
              </div>
              <div
                className="text-xs"
                style={{ color: pack.color }}
              >
                Voir le calculateur →
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
