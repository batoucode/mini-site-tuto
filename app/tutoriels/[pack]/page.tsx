import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PACKS } from '@/lib/constants'
import StepWizard from '@/components/features/StepWizard'
import PriceCalculator from '@/components/features/PriceCalculator'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

interface Props {
  params: Promise<{ pack: string }>
}

export async function generateStaticParams() {
  return PACKS.map((p) => ({ pack: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pack } = await params
  const packData = PACKS.find((p) => p.slug === pack)
  if (!packData) return {}
  return {
    title: `${packData.name} — ${formatPrice(packData.price)} · Guide Artisan Pro`,
    description: packData.description,
  }
}

export default async function TutorielPage({ params }: Props) {
  const { pack } = await params
  const packData = PACKS.find((p) => p.slug === pack)
  if (!packData) notFound()

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--fg-muted)' }}>
          <Link href="/" style={{ color: 'var(--accent)' }}>
            Accueil
          </Link>
          <span>/</span>
          <span>{packData.name}</span>
        </div>

        {/* Pack header */}
        <div className="mb-12">
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{ backgroundColor: `${packData.color}22`, color: packData.color }}
          >
            {packData.slug.toUpperCase()}
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--fg)' }}
          >
            {packData.name}
          </h1>
          <p className="text-lg" style={{ color: 'var(--fg-muted)' }}>
            {packData.description}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-6 text-sm">
            <div>
              <div className="font-bold text-lg" style={{ color: 'var(--accent)' }}>
                {formatPrice(packData.price)}
              </div>
              <div style={{ color: 'var(--fg-muted)' }}>Tarif HT</div>
            </div>
            <div>
              <div className="font-bold text-lg" style={{ color: 'var(--accent)' }}>
                {packData.duration}
              </div>
              <div style={{ color: 'var(--fg-muted)' }}>Durée estimée</div>
            </div>
            <div>
              <div className="font-bold text-lg" style={{ color: 'var(--accent)' }}>
                {packData.steps.length}
              </div>
              <div style={{ color: 'var(--fg-muted)' }}>Étapes</div>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mt-6">
            {packData.features.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1 rounded-full text-sm"
                style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)' }}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <StepWizard pack={packData} />
          </div>
          <div>
            <PriceCalculator pack={packData} />
          </div>
        </div>

        {/* Mobile: price calculator below */}
        <div className="lg:hidden mt-12">
          <PriceCalculator pack={packData} />
        </div>
      </div>
    </div>
  )
}
