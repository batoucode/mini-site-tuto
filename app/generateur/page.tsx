'use client'

import { useState, useEffect } from 'react'
import { sauvegarderProjet, chargerProjet, ProjetState } from '@/lib/storage'
import { buildPrompt } from '@/lib/promptBuilder'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const PACKS = [
  { id: 'starter',  nom: 'Pack Starter',  prix: 790,  pages: '1-2 pages (accueil + contact)' },
  { id: 'artisan',  nom: 'Pack Artisan',  prix: 1390, pages: '3-5 pages (accueil, prestations, réalisations, contact, à propos)' },
  { id: 'business', nom: 'Pack Business', prix: 2190, pages: "jusqu'à 10 pages + blog" },
]

const OPTIONS_LIST = [
  { id: 'contact',          nom: 'Formulaire de contact avancé',   prix: 190 },
  { id: 'google-map',       nom: 'Carte Google intégrée',           prix: 90  },
  { id: 'gallery',          nom: 'Galerie photo professionnelle',    prix: 140 },
  { id: 'about',            nom: 'Section "À propos" détaillée',    prix: 160 },
  { id: 'blog',             nom: 'Blog / Actualités',               prix: 390 },
  { id: 'seo-local',        nom: 'SEO Local Avancé',                prix: 390 },
  { id: 'google-business',  nom: 'Google Business Profile',         prix: 290 },
  { id: 'maintenance',      nom: 'Maintenance Sérénité 1 an',       prix: 290 },
]

const STYLES  = ['Moderne', 'Classique', 'Créatif']
const POLICES = ['Inter', 'Roboto', 'System']

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  background: 'var(--bg-elevated)',
  color: 'var(--text-primary)',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.9rem',
}

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
      setPrompt(buildPrompt(projet))
    }
  }, [projet])

  const updateEntreprise = (field: keyof ProjetState['entreprise'], value: string) => {
    if (!projet) return
    setProjet({ ...projet, entreprise: { ...projet.entreprise, [field]: value } })
  }

  const updatePack = (packId: string) => {
    if (!projet) return
    const pack = PACKS.find(p => p.id === packId)
    if (pack) setProjet({ ...projet, pack: { id: pack.id, nom: pack.nom, prix: pack.prix, pages: pack.pages } })
  }

  const toggleOption = (optionId: string) => {
    if (!projet) return
    const option = OPTIONS_LIST.find(o => o.id === optionId)
    if (!option) return
    const exists = projet.options.some(o => o.id === optionId)
    setProjet({
      ...projet,
      options: exists
        ? projet.options.filter(o => o.id !== optionId)
        : [...projet.options, { id: option.id, nom: option.nom, prix: option.prix }],
    })
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

  if (!projet) {
    return (
      <div className="container-custom py-12" style={{ color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>
        // Chargement...
      </div>
    )
  }

  const totalPrix = projet.pack.prix + projet.options.reduce((sum, o) => sum + o.prix, 0)

  return (
    <div className="container-custom py-12">
      <p
        className="text-sm text-center mb-3"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: 'rgba(0,242,255,0.7)', letterSpacing: '0.1em' }}
      >
        // nouveau-projet
      </p>
      <h1
        className="text-4xl md:text-5xl font-bold text-center mb-4"
        style={{ fontFamily: "'Ubuntu', sans-serif", fontWeight: 800, color: 'var(--text-primary)' }}
      >
        Créer un nouveau projet
      </h1>
      <p className="text-center mb-12 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
        Remplissez ce formulaire, puis copiez le prompt généré dans Claude Code pour obtenir votre site clé en main.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulaire */}
        <div className="lg:col-span-2 space-y-8">

          {/* Entreprise */}
          <Card>
            <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
              Identité de l&apos;entreprise
            </h2>
            <div className="space-y-4">
              {[
                { field: 'nom'       as const, label: 'Nom de l\'entreprise *', placeholder: 'Menuiserie Dupont',       type: 'text'  },
                { field: 'metier'    as const, label: 'Métier / activité *',    placeholder: 'Menuisier ébéniste',      type: 'text'  },
                { field: 'ville'     as const, label: 'Ville principale *',     placeholder: 'Lyon',                   type: 'text'  },
                { field: 'telephone' as const, label: 'Téléphone',              placeholder: '06 12 34 56 78',         type: 'tel'   },
                { field: 'email'     as const, label: 'Email',                  placeholder: 'contact@exemple.fr',     type: 'email' },
              ].map(({ field, label, placeholder, type }) => (
                <div key={field}>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    value={projet.entreprise[field]}
                    onChange={(e) => updateEntreprise(field, e.target.value)}
                    placeholder={placeholder}
                    style={inputStyle}
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Pack */}
          <Card>
            <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
              Choisissez votre pack
            </h2>
            <div className="space-y-3">
              {PACKS.map((pack) => (
                <label
                  key={pack.id}
                  className="flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all"
                  style={{
                    border: projet.pack.id === pack.id ? '1px solid rgba(0,242,255,0.4)' : '1px solid var(--border)',
                    backgroundColor: projet.pack.id === pack.id ? 'rgba(0,242,255,0.06)' : 'var(--bg-elevated)',
                  }}
                >
                  <input
                    type="radio"
                    name="pack"
                    checked={projet.pack.id === pack.id}
                    onChange={() => updatePack(pack.id)}
                    className="mt-1"
                    style={{ accentColor: '#00F2FF' }}
                  />
                  <div>
                    <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {pack.nom} – {pack.prix}€
                    </div>
                    <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{pack.pages}</div>
                  </div>
                </label>
              ))}
            </div>
          </Card>

          {/* Options */}
          <Card>
            <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
              Options complémentaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {OPTIONS_LIST.map((opt) => {
                const checked = projet.options.some(o => o.id === opt.id)
                return (
                  <label
                    key={opt.id}
                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                    style={{
                      border: checked ? '1px solid rgba(249,115,22,0.4)' : '1px solid var(--border)',
                      backgroundColor: checked ? 'rgba(249,115,22,0.08)' : 'var(--bg-elevated)',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleOption(opt.id)}
                      className="w-4 h-4"
                      style={{ accentColor: '#F97316' }}
                    />
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.88rem' }}>
                      {opt.nom}{' '}
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>(+{opt.prix}€)</span>
                    </span>
                  </label>
                )
              })}
            </div>
          </Card>

          {/* Design */}
          <Card>
            <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
              Design & préférences
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Couleur principale
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    value={projet.design.couleur}
                    onChange={(e) => updateDesign('couleur', e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer"
                    style={{ border: '1px solid var(--border)', background: 'transparent' }}
                  />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {projet.design.couleur}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Police
                </label>
                <select
                  value={projet.design.police}
                  onChange={(e) => updateDesign('police', e.target.value)}
                  style={{ ...inputStyle }}
                >
                  {POLICES.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Style
                </label>
                <div className="flex gap-3 flex-wrap">
                  {STYLES.map(s => (
                    <button
                      key={s}
                      onClick={() => updateDesign('style', s)}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '6px',
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        background: projet.design.style === s ? '#F97316' : 'var(--bg-elevated)',
                        color: projet.design.style === s ? '#000' : 'var(--text-secondary)',
                        border: projet.design.style === s ? 'none' : '1px solid var(--border)',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <Card>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: "'Ubuntu', sans-serif" }}
            >
              Récapitulatif
            </h2>
            <div className="text-sm space-y-3" style={{ color: 'var(--text-secondary)' }}>
              <div><strong style={{ color: 'var(--text-primary)' }}>Entreprise:</strong> {projet.entreprise.nom || 'À remplir'}</div>
              <div><strong style={{ color: 'var(--text-primary)' }}>Métier:</strong> {projet.entreprise.metier || '—'}</div>
              <div><strong style={{ color: 'var(--text-primary)' }}>Ville:</strong> {projet.entreprise.ville || '—'}</div>
              <div><strong style={{ color: 'var(--text-primary)' }}>Pack:</strong> {projet.pack.nom} ({projet.pack.prix}€)</div>
              <div><strong style={{ color: 'var(--text-primary)' }}>Options:</strong> {projet.options.length ? projet.options.map(o => o.nom).join(', ') : 'Aucune'}</div>
              <div
                className="pt-3"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <strong style={{ color: 'var(--text-primary)' }}>Total estimé:</strong>{' '}
                <span style={{ fontSize: '1.1rem', color: '#F97316', fontWeight: 700 }}>{totalPrix}€</span>
              </div>
            </div>
          </Card>

          <Card>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: "'Ubuntu', sans-serif" }}
            >
              Prompt pour Claude Code
            </h2>
            <textarea
              readOnly
              value={prompt}
              className="w-full h-64 p-3 rounded-xl resize-none"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.78rem',
                background: 'var(--bg)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
                lineHeight: 1.6,
              }}
            />
            <Button
              variant="primary"
              onClick={copyPrompt}
              style={{ width: '100%', marginTop: '12px' }}
            >
              {copied ? '✓ Copié !' : 'Copier le prompt'}
            </Button>
            <p
              className="text-xs text-center mt-3"
              style={{ color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}
            >
              // Collez ce prompt dans Claude Code
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
