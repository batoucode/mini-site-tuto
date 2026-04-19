export interface ProjetState {
  entreprise: {
    nom: string
    metier: string
    ville: string
    telephone: string
    email: string
  }
  pack: {
    id: string
    nom: string
    prix: number
    pages: string
  }
  options: Array<{ id: string; nom: string; prix: number }>
  design: {
    couleur: string
    police: string
    style: string
  }
}

const STORAGE_KEY = 'projet_courant'

export function sauvegarderProjet(projet: Partial<ProjetState>) {
  const existing = chargerProjet()
  const nouveau = { ...existing, ...projet }
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nouveau))
  }
}

export function chargerProjet(): ProjetState {
  if (typeof window === 'undefined') {
    return defaultProjet()
  }
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) {
    return defaultProjet()
  }
  try {
    return JSON.parse(data)
  } catch {
    return defaultProjet()
  }
}

export function reinitialiserProjet() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY)
  }
}

function defaultProjet(): ProjetState {
  return {
    entreprise: { nom: '', metier: '', ville: '', telephone: '', email: '' },
    pack: { id: 'starter', nom: 'Pack Starter', prix: 790, pages: '1-2 pages' },
    options: [],
    design: { couleur: '#5a7c5a', police: 'Inter', style: 'Moderne' },
  }
}
