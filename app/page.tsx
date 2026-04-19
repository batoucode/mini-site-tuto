import Link from 'next/link'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function HomePage() {
  return (
    <div className="container-custom py-16 md:py-24">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <p
          className="text-sm mb-4"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: 'rgba(0,242,255,0.7)', letterSpacing: '0.1em' }}
        >
          // Générateur de sites artisans
        </p>
        <h1
          className="text-5xl md:text-6xl font-bold mb-6"
          style={{ fontFamily: "'Ubuntu', sans-serif", fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}
        >
          Créez votre site{' '}
          <span style={{ color: '#00F2FF' }}>en quelques minutes</span>
        </h1>
        <p className="text-xl mb-10" style={{ color: 'var(--text-secondary)' }}>
          Générez un site professionnel prêt à déployer, sans code, grâce à l&apos;IA.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/generateur">
            <Button variant="primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
              Créer un nouveau projet →
            </Button>
          </Link>
          <Link href="/tutoriels/starter">
            <Button variant="outline" style={{ fontSize: '1rem', padding: '14px 32px' }}>
              Consulter les tutoriels
            </Button>
          </Link>
        </div>
      </div>

      {/* 3-Step Explainer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { num: '01', title: 'Remplissez le formulaire', desc: 'Informations, pack, options, design' },
          { num: '02', title: 'Copiez le prompt', desc: 'Généré automatiquement pour Claude Code' },
          { num: '03', title: 'Collez & déployez', desc: 'Claude Code génère le site complet' },
        ].map(({ num, title, desc }) => (
          <Card key={num} className="text-center">
            <div
              className="text-sm mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: '#00F2FF', opacity: 0.7 }}
            >
              // {num}
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Ubuntu', sans-serif" }}>
              {title}
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{desc}</p>
          </Card>
        ))}
      </div>

      {/* Stats */}
      <div
        className="rounded-xl py-12 px-8"
        style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { val: '3', label: 'Packs disponibles' },
            { val: '8', label: 'Options complémentaires' },
            { val: '100%', label: 'Prêt à déployer' },
          ].map(({ val, label }) => (
            <div key={label}>
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: '#00F2FF', fontFamily: "'Ubuntu', sans-serif" }}
              >
                {val}
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
