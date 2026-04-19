# Module — components/features/

Composants métier. Contiennent la logique fonctionnelle de la plateforme.

---

## PackCard.tsx

Carte d'aperçu d'un pack. **Server Component** (pas de `'use client'`).

**Props:**
```tsx
interface PackCardProps {
  pack: Pack                // type depuis lib/constants.ts
  completedSteps?: number  // si > 0, affiche une ProgressBar
  totalSteps?: number
}
```

**Rendu:**
- Badge coloré avec le slug du pack
- Nom + Prix (formaté avec `formatPrice()`)
- Durée estimée
- Description
- Liste des 4 premières features (`pack.features.slice(0, 4)`)
- `ProgressBar` si `completedSteps > 0`
- Lien CTA → `/tutoriels/[slug]` ("Commencer" ou "Continuer")

**Note:** Le composant reçoit `completedSteps` depuis le parent qui charge localStorage (car PackCard est Server Component, il ne peut pas accéder au browser directement).

---

## StepWizard.tsx

`'use client'` — Guide interactif principal. Le composant le plus complexe du projet.

**Props:**
```tsx
interface StepWizardProps {
  pack: Pack   // type depuis lib/constants.ts
}
```

**État interne:**
```tsx
const [currentStep, setCurrentStep] = useState(0)
const [completedSteps, setCompletedSteps] = useState<number[]>([])
const [checkedItems, setCheckedItems] = useState<number[]>([])
```

**Persistence:** Toute la progression est sauvegardée via `lib/utils.ts`:
- `loadProgress(pack.slug)` au montage
- `saveProgress(pack.slug, completedSteps)` à chaque changement

**Fonctionnalités:**
- Navigation dots en haut (cliquables)
- Carte d'étape animée avec:
  - Objectif de l'étape
  - Liste d'actions ordonnée
  - Commandes terminal via `<CodeBlock language="bash">`
  - Snippets de code via `<CodeBlock filename="...">`
  - Résultat attendu
  - Structure de dossier (si présente)
  - Aide contextuelle `<details>` repliable
- Checkbox "J'ai terminé cette étape" — débloque le bouton Suivant
- Boutons Précédent / Suivant
- Quand toutes les étapes sont faites → affiche `<Checklist>`
- Bouton "Réinitialiser la progression"

---

## PriceCalculator.tsx

`'use client'` — Calculateur de prix sticky dans la sidebar.

**Props:**
```tsx
interface PriceCalculatorProps {
  pack: Pack   // type depuis lib/constants.ts
}
```

**Fonctionnalités:**
- Prix de base du pack (non modifiable)
- 8 options checkables avec prix unitaires
- Total dynamique recalculé à chaque coche
- Persistence via `loadSelectedOptions` / `saveSelectedOptions` (lib/utils.ts)
- Bouton "Demander ce devis" (actuellement `alert()` — à brancher sur un formulaire)

**Usage dans la page tutoriels:**
```tsx
// sticky sur desktop, visible sous StepWizard sur mobile
<div className="lg:sticky lg:top-24">
  <PriceCalculator pack={pack} />
</div>
```

---

## Checklist.tsx

`'use client'` — Checklist de validation finale, affichée après completion de toutes les étapes.

**Props:**
```tsx
interface ChecklistProps {
  pack: Pack           // pour accéder à pack.checklistItems
  packSlug: string     // pour localStorage
}
```

**Fonctionnalités:**
- Liste de validation (`pack.checklistItems`)
- Chaque item cochable individuellement
- Progress counter + ProgressBar
- À 100% : carte succès "Site prêt à livrer!" + lien retour Accueil
- Persistence via `loadChecklist` / `saveChecklist` (lib/utils.ts)
