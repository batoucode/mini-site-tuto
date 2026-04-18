import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PACKS } from '@/lib/constants'
import StepWizard from '@/components/features/StepWizard'
import PriceCalculator from '@/components/features/PriceCalculator'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return PACKS.map((pack) => ({ slug: pack.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const pack = PACKS.find((p) => p.slug === slug)
  if (!pack) return {}
  return {
    title: `${pack.name} — ${formatPrice(pack.price)} · Guide Artisan Pro`,
    description: pack.description,
  }
}

export default async function PackPage({ params }: Props) {
  const { slug } = await params
  const pack = PACKS.find((p) => p.slug === slug)
  if (!pack) notFound()

  return (
    <div className="min-h-screen pt-20 pb-16">

      {/* Pack header banner */}
      <div
        className="px-4 py-8 mb-8"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm mb-4" style={{ color: 'var(--fg-muted)' }}>
            <Link href="/" className="hover:opacity-70 transition-opacity">
              Accueil
            </Link>
            <span className="mx-2">›</span>
            <span style={{ color: 'var(--fg)' }}>{pack.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div
                className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide"
                style={{ backgroundColor: pack.color + '18', color: pack.color }}
              >
                {pack.name}
              </div>
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: 'var(--fg)' }}
              >
                {pack.description}
              </h1>
              <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--fg-muted)' }}>
                <span>
                  💰 <strong style={{ color: pack.color }}>{formatPrice(pack.price)}</strong>
                </span>
                <span>⏱ {pack.duration}</span>
                <span>📋 {pack.steps.length} étapes</span>
              </div>
            </div>

            {/* Features chips */}
            <div className="flex flex-wrap gap-2 max-w-md">
              {pack.features.slice(0, 4).map((f) => (
                <span
                  key={f}
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: 'var(--bg)',
                    color: 'var(--fg-muted)',
                    border: '1px solid var(--border)',
                  }}
                >
                  ✓ {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main layout: wizard + sidebar */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">

          {/* Left: Step Wizard */}
          <div>
            <StepWizard pack={pack} />
          </div>

          {/* Right: Price Calculator (sticky) */}
          <aside className="hidden lg:block">
            <PriceCalculator pack={pack} />
          </aside>
        </div>

        {/* Mobile price calculator (below wizard) */}
        <div className="lg:hidden mt-8">
          <PriceCalculator pack={pack} />
        </div>
      </div>
    </div>
  )
}
