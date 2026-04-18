// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * Génère une clé localStorage unique par pack et type
 */
export function getStorageKey(packSlug: string, type: 'progress' | 'checklist' | 'options'): string {
  return `artisan_guide_${type}_${packSlug}`
}

/**
 * Charge la progression depuis localStorage
 */
export function loadProgress(packSlug: string): number[] {
  if (typeof window === 'undefined') return []
  try {
    const key = getStorageKey(packSlug, 'progress')
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * Sauvegarde la progression dans localStorage
 */
export function saveProgress(packSlug: string, completedSteps: number[]): void {
  if (typeof window === 'undefined') return
  try {
    const key = getStorageKey(packSlug, 'progress')
    localStorage.setItem(key, JSON.stringify(completedSteps))
  } catch {
    console.warn('Impossible de sauvegarder la progression')
  }
}

/**
 * Charge les options sélectionnées depuis localStorage
 */
export function loadSelectedOptions(packSlug: string): string[] {
  if (typeof window === 'undefined') return []
  try {
    const key = getStorageKey(packSlug, 'options')
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * Sauvegarde les options sélectionnées dans localStorage
 */
export function saveSelectedOptions(packSlug: string, optionIds: string[]): void {
  if (typeof window === 'undefined') return
  try {
    const key = getStorageKey(packSlug, 'options')
    localStorage.setItem(key, JSON.stringify(optionIds))
  } catch {
    console.warn('Impossible de sauvegarder les options')
  }
}

/**
 * Charge la checklist depuis localStorage
 */
export function loadChecklist(packSlug: string): number[] {
  if (typeof window === 'undefined') return []
  try {
    const key = getStorageKey(packSlug, 'checklist')
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * Sauvegarde la checklist dans localStorage
 */
export function saveChecklist(packSlug: string, checkedItems: number[]): void {
  if (typeof window === 'undefined') return
  try {
    const key = getStorageKey(packSlug, 'checklist')
    localStorage.setItem(key, JSON.stringify(checkedItems))
  } catch {
    console.warn('Impossible de sauvegarder la checklist')
  }
}

/**
 * Réinitialise toute la progression d'un pack
 */
export function resetProgress(packSlug: string): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(getStorageKey(packSlug, 'progress'))
    localStorage.removeItem(getStorageKey(packSlug, 'checklist'))
    localStorage.removeItem(getStorageKey(packSlug, 'options'))
  } catch {
    console.warn('Impossible de réinitialiser la progression')
  }
}

/**
 * Copie un texte dans le presse-papier
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback pour les navigateurs plus anciens
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      const success = document.execCommand('copy')
      document.body.removeChild(textarea)
      return success
    }
  } catch {
    return false
  }
}

/**
 * Formatte un prix en euros
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price)
}

/**
 * Calcule le pourcentage de progression
 */
export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}
