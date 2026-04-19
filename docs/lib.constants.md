# Module — lib/constants.ts

Source de vérité pour toutes les données de contenu. ~3000 lignes.
**Ne pas modifier sans comprendre l'impact sur les tutoriels.**

---

## Types exportés

```ts
interface CodeSnippet {
  filename: string
  language: string
  code: string
}

interface Step {
  id: number
  title: string
  objective: string
  actions: string[]
  commands?: string[]
  codeSnippets?: CodeSnippet[]
  expectedResult: string
  folderStructure?: string
  helpContent?: string
}

interface Pack {
  slug: string
  name: string
  price: number
  duration: string
  description: string
  color: string         // couleur hex du badge
  features: string[]
  steps: Step[]
  checklistItems: string[]
}

interface Option {
  id: string
  label: string
  price: number
  description: string
}
```

---

## Données exportées

### `PACKS: Pack[]`

| slug | name | price | color | steps |
|---|---|---|---|---|
| `starter` | Pack Starter | 790€ | `#16a34a` (vert) | `STARTER_STEPS` |
| `artisan` | Pack Artisan | 1390€ | `#2c5f8a` (bleu) | `ARTISAN_STEPS` |
| `business` | Pack Business | 2190€ | `#7c3aed` (violet) | `BUSINESS_STEPS` |

### `OPTIONS: Option[]`

| id | label | price |
|---|---|---|
| `contact-form` | Formulaire de contact | 190€ |
| `google-maps` | Carte Google intégrée | 90€ |
| `gallery` | Galerie photos professionnelle | 140€ |
| `about` | Section "À propos" détaillée | 160€ |
| `blog` | Blog / Actualités complet | 390€ |
| `seo-local` | SEO Local Avancé | 390€ |
| `google-business` | Google Business Profile | 290€ |
| `maintenance` | Maintenance Sérénité (1 an) | 290€ |

---

## Modifier le contenu d'une étape

```ts
// lib/constants.ts — chercher STARTER_STEPS, ARTISAN_STEPS, ou BUSINESS_STEPS

const STARTER_STEPS: Step[] = [
  {
    id: 1,
    title: "Titre de l'étape",
    objective: "Ce que l'utilisateur va accomplir",
    actions: [
      "Première action à faire",
      "Deuxième action",
    ],
    commands: ["npm install", "npm run dev"],
    codeSnippets: [
      { filename: "app/page.tsx", language: "tsx", code: `...` }
    ],
    expectedResult: "Ce que l'utilisateur doit voir",
    folderStructure: "...",   // optionnel
    helpContent: "...",       // HTML optionnel, affiché dans <details>
  },
]
```

---

## Ajouter une option

```ts
export const OPTIONS: Option[] = [
  ...OPTIONS_EXISTANTES,
  {
    id: 'mon-option',
    label: 'Ma nouvelle option',
    price: 200,
    description: 'Description courte affichée dans la liste',
  },
]
```

Aussi ajouter l'option dans `app/generateur/page.tsx` → `OPTIONS_LIST` (les deux listes sont actuellement indépendantes).

---

## Ajouter un pack

1. Créer un tableau `MON_PACK_STEPS: Step[]`
2. Ajouter l'entrée dans le tableau `PACKS`
3. Créer le fichier `app/tutoriels/mon-pack/page.tsx` (ou utiliser le slug dynamique `[pack]`)
4. Ajouter le lien dans `components/layout/Navbar.tsx`
