'use client'

import { useState, useEffect } from 'react'
import { sauvegarderProjet, chargerProjet, ProjetState } from '@/lib/storage'
import { buildPrompt } from '@/lib/promptBuilder'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const PACKS = [
  { id: 'starter', nom: 'Pack Starter', prix: 790, pages: '1-2 pages (accueil + contact)' },
  { id: 'artisan', nom: 'Pack Artisan', prix: 1390, pages: '3-5 pages (accueil, prestations, réalisations, contact, à propos)' },
  { id: 'business', nom: 'Pack Business', prix: 2190, pages: 'jusqu\'à 10 pages + blog' },
]

const OPTIONS_LIST = [
  { id: 'contact', nom: 'Formulaire de contact avancé', prix: 190 },
  { id: 'google-map', nom: 'Carte Google intégrée', prix: 90 },
  { id: 'gallery', nom: 'Galerie photo professionnelle', prix: 140 },
  { id: 'about', nom: 'Section "À propos" détaillée', prix: 160 },
  { id: 'blog', nom: 'Blog / Actualités', prix: 390 },
  { id: 'seo-local', nom: 'SEO Local Avancé', prix: 390 },
  { id: 'google-business', nom: 'Google Business Profile', prix: 290 },
  { id: 'maintenance', nom: 'Maintenance Sérénité 1 an', prix: 290 },
]

const STYLES = ['Moderne', 'Classique', 'Créatif']
const POLICES = ['Inter', 'Roboto', 'System']

export default function GenerateurPage() {
  const [projet, setProjet] = useState<ProjetState | null>(null)
  const [prompt, setPrompt] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const saved = chargerProjet()
    setProjet(saved)
  }, [])

  useEffect(() => {
    if (projet) {
      sauvegarderProjet(projet)
      const newPrompt = buildPrompt(projet)
      setPrompt(newPrompt)
    }
  }, [projet])

  const updateEntreprise = (field: keyof ProjetState['entreprise'], value: string) => {
    if (!projet) return
    setProjet({ ...projet, entreprise: { ...projet.entreprise, [field]: value } })
  }

  const updatePack = (packId: string) => {
    if (!projet) return
    const pack = PACKS.find(p => p.id === packId)
    if (pack) {
      setProjet({ ...projet, pack: { id: pack.id, nom: pack.nom, prix: pack.prix, pages: pack.pages } })
    }
  }

  const toggleOption = (optionId: string) => {
    if (!projet) return
    const option = OPTIONS_LIST.find(o => o.id === optionId)
    if (!option) return

    const exists = projet.options.some(o => o.id === optionId)
    if (exists) {
      setProjet({ ...projet, options: projet.options.filter(o => o.id !== optionId) })
    } else {
      setProjet({ ...projet, options: [...projet.options, { id: option.id, nom: option.nom, prix: option.prix }] })
    }
  }

  const updateDesign = (field: keyof ProjetState['design'], value: string) => {
    if (!projet) return
    setProjet({ ...projet, design: { ...projet.design, [field]: value } })
  }

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!projet) return <div className="container-custom py-12">Chargement...</div>

  const totalPrix = projet.pack.prix + projet.options.reduce((sum, o) => sum + o.prix, 0)

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
        Créer un nouveau projet
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Remplissez ce formulaire, puis copiez le prompt généré dans Claude Code pour obtenir votre site clé en main.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulaire - 2 colonnes sur desktop */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section Entreprise */}
          <Card>
            <h2 className="text-2xl font-semibold mb-6">🏢 Identité de l'entreprise</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom de l'entreprise *</label>
                <input
                  type="text"
                  value={projet.entreprise.nom}
                  onChange={(e) => updateEntreprise('nom', e.target.value)}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#5a7c5a] focus:border-transparent"
                  placeholder="Menuiserie Dupont"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Métier / activité *</label>
                <input
                  type="text"
                  value={projet.entreprise.metier}
                  onChange={(e) => updateEntreprise('metier', e.target.value)}
                  className="w-full p-3 border rounded-xl"
                  placeholder="Menuisier ébéniste"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ville principale *</label>
                <input
                  type="text"
                  value={projet.entreprise.ville}
                  onChange={(e) => updateEntreprise('ville', e.target.value)}
                  className="w-full p-3 border rounded-xl"
                  placeholder="Lyon"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Téléphone</label>
                <input
                  type="tel"
                  value={projet.entreprise.telephone}
                  onChange={(e) => updateEntreprise('telephone', e.target.value)}
                  className="w-full p-3 border rounded-xl"
                  placeholder="06 12 34 56 78"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={projet.entreprise.email}
                  onChange={(e) => updateEntreprise('email', e.target.value)}
                  className="w-full p-3 border rounded-xl"
                  placeholder="contact@menuiserie-dupont.fr"
                />
              </div>
            </div>
          </Card>

          {/* Section Pack */}
          <Card>
            <h2 className="text-2xl font-semibold mb-6">📦 Choisissez votre pack</h2>
            <div className="space-y-3">
              {PACKS.map((pack) => (
                <label key={pack.id} className="flex items-start gap-4 p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="pack"
                    checked={projet.pack.id === pack.id}
                    onChange={() => updatePack(pack.id)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-semibold">{pack.nom} – {pack.prix}€</div>
                    <div className="text-sm text-gray-500">{pack.pages}</div>
                  </div>
                </label>
              ))}
            </div>
          </Card>

          {/* Section Options */}
          <Card>
            <h2 className="text-2xl font-semibold mb-6">⚙️ Options complémentaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {OPTIONS_LIST.map((opt) => (
                <label key={opt.id} className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={projet.options.some(o => o.id === opt.id)}
                    onChange={() => toggleOption(opt.id)}
                    className="w-5 h-5"
                  />
                  <span>{opt.nom} <span className="text-sm text-gray-500">(+{opt.prix}€)</span></span>
                </label>
              ))}
            </div>
          </Card>

          {/* Section Design */}
          <Card>
            <h2 className="text-2xl font-semibold mb-6">🎨 Design & préférences</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Couleur principale</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    value={projet.design.couleur}
                    onChange={(e) => updateDesign('couleur', e.target.value)}
                    className="w-20 h-10 border rounded"
                  />
                  <span className="text-sm">{projet.design.couleur}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Police</label>
                <select
                  value={projet.design.police}
                  onChange={(e) => updateDesign('police', e.target.value)}
                  className="w-full p-2 border rounded-xl"
                >
                  {POLICES.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Style</label>
                <div className="flex gap-4">
                  {STYLES.map(s => (
                    <button
                      key={s}
                      onClick={() => updateDesign('style', s)}
                      className={`px-4 py-2 rounded-full transition ${
                        projet.design.style === s ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                      style={projet.design.style === s ? { backgroundColor: '#5a7c5a' } : {}}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar - Récapitulatif et prompt */}
        <div className="space-y-8">
          <Card>
            <h2 className="text-xl font-semibold mb-4">📋 Récapitulatif</h2>
            <div className="text-sm space-y-3">
              <div>
                <strong>Entreprise:</strong> {projet.entreprise.nom || 'À remplir'}
              </div>
              <div>
                <strong>Métier:</strong> {projet.entreprise.metier || '—'}
              </div>
              <div>
                <strong>Ville:</strong> {projet.entreprise.ville || '—'}
              </div>
              <div>
                <strong>Pack:</strong> {projet.pack.nom} ({projet.pack.prix}€)
              </div>
              <div>
                <strong>Options:</strong> {projet.options.length ? projet.options.map(o => o.nom).join(', ') : 'Aucune'}
              </div>
              <div className="pt-3 border-t border-gray-200">
                <strong>Total estimé:</strong> <span className="text-lg text-primary">{totalPrix}€</span>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">🤖 Prompt pour Claude Code</h2>
            <textarea
              readOnly
              value={prompt}
              className="w-full h-64 p-3 border rounded-xl font-mono text-sm bg-gray-50 resize-none"
            />
            <Button
              variant="primary"
              onClick={copyPrompt}
              className="w-full mt-4"
            >
              {copied ? '✅ Copié !' : '📋 Copier le prompt'}
            </Button>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Collez ce prompt dans Claude Code pour générer votre site.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
