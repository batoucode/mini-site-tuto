import Link from 'next/link'
import type { Pack } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'

interface PackCardProps {
  pack: Pack
  completedSteps?: number
}

export default function PackCard({ pack, completedSteps = 0 }: PackCardProps) {
  const progressPct =
    pack.steps.length > 0
      ? Math.round((completedSteps / pack.steps.length) * 100)
      : 0

  return (
    <div
      className="flex flex-col p-6 rounded-xl transition-all duration-300 hover:shadow-card-hover group"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div
            className="inline-block text-xs font-bold px-2 py-1 rounded-full mb-2 uppercase tracking-wide"
            style={{ backgroundColor: pack.color + '18', color: pack.color }}
          >
            {pack.name}
          </div>
          <div
            className="text-3xl font-bold"
            style={{ color: pack.color }}
          >
            {formatPrice(pack.price)}
          </div>
          <div className="text-sm mt-1" style={{ color: 'var(--fg-muted)' }}>
            ⏱ {pack.duration}
          </div>
        </div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
          style={{ backgroundColor: pack.color }}
        >
          {pack.steps.length}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm mb-6 flex-1" style={{ color: 'var(--fg-muted)' }}>
        {pack.description}
      </p>

      {/* Features */}
      <ul className="space-y-2 mb-6">
        {pack.features.slice(0, 4).map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <span style={{ color: pack.color }} className="mt-0.5 flex-shrink-0">
              ✓
            </span>
            <span style={{ color: 'var(--fg)' }}>{feature}</span>
          </li>
        ))}
        {pack.features.length > 4 && (
          <li className="text-sm" style={{ color: 'var(--fg-muted)' }}>
            + {pack.features.length - 4} autres fonctionnalités...
          </li>
        )}
      </ul>

      {/* Progress (if started) */}
      {completedSteps > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1" style={{ color: 'var(--fg-muted)' }}>
            <span>Progression</span>
            <span style={{ color: pack.color }}>{completedSteps}/{pack.steps.length} étapes</span>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: 'var(--border)' }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progressPct}%`, backgroundColor: pack.color }}
            />
          </div>
        </div>
      )}

      {/* CTA */}
      <Link
        href={`/pack/${pack.slug}`}
        className="block text-center py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-105 active:scale-95"
        style={{ backgroundColor: pack.color }}
      >
        {completedSteps > 0 ? 'Continuer le guide →' : 'Commencer le guide →'}
      </Link>
    </div>
  )
}
