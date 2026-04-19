import Link from 'next/link'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function HomePage() {
  return (
    <div className="container-custom py-16 md:py-24">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Créez votre site artisanal{' '}
          <span style={{ color: '#5a7c5a' }}>en quelques minutes</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Générez un site professionnel prêt à déployer, sans code, grâce à l'IA.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/generateur">
            <Button variant="primary" className="text-lg px-8 py-4 min-w-fit">
              ➕ Créer un nouveau projet
            </Button>
          </Link>
          <Link href="/tutoriels/starter">
            <Button variant="outline" className="text-lg px-8 py-4 min-w-fit">
              📖 Consulter les tutoriels
            </Button>
          </Link>
        </div>
      </div>

      {/* 3-Step Explainer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <Card className="text-center">
          <div className="text-5xl mb-4">1️⃣</div>
          <h3 className="text-xl font-semibold mb-2">Remplissez le formulaire</h3>
          <p className="text-gray-500">Informations, pack, options, design</p>
        </Card>
        <Card className="text-center">
          <div className="text-5xl mb-4">2️⃣</div>
          <h3 className="text-xl font-semibold mb-2">Copiez le prompt</h3>
          <p className="text-gray-500">Généré automatiquement pour Claude Code</p>
        </Card>
        <Card className="text-center">
          <div className="text-5xl mb-4">3️⃣</div>
          <h3 className="text-xl font-semibold mb-2">Collez & déployez</h3>
          <p className="text-gray-500">Claude Code génère le site complet</p>
        </Card>
      </div>

      {/* Stats */}
      <div className="text-center bg-gray-50 rounded-[20px] py-12 px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">3</div>
            <p className="text-gray-600">Packs disponibles</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">8</div>
            <p className="text-gray-600">Options complémentaires</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <p className="text-gray-600">Prêt à déployer</p>
          </div>
        </div>
      </div>
    </div>
  )
}
