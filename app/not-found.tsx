import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-center">
      <div>
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
          Page introuvable
        </h1>
        <p className="mb-8" style={{ color: 'var(--fg-muted)' }}>
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl text-white font-medium transition-all hover:opacity-90"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
