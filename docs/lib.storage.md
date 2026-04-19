# Module — lib/storage.ts

Gestion du localStorage pour le **générateur de projet** (`/generateur`).
Distinct de `lib/utils.ts` qui gère la persistance des **tutoriels**.

---

## Type principal

```ts
export interface ProjetState {
  entreprise: {
    nom:       string
    metier:    string
    ville:     string
    telephone: string
    email:     string
  }
  pack: {
    id:    string   // 'starter' | 'artisan' | 'business'
    nom:   string
    prix:  number
    pages: string
  }
  options: Array<{
    id:   string
    nom:  string
    prix: number
  }>
  design: {
    couleur: string   // hex color, ex: '#5a7c5a'
    police:  string   // 'Inter' | 'Roboto' | 'System'
    style:   string   // 'Moderne' | 'Classique' | 'Créatif'
  }
}
```

---

## Fonctions

### `chargerProjet(): ProjetState`

Lit `localStorage['projet_courant']` et retourne le projet parsé.
Si absent ou malformé → retourne `defaultProjet()`.
SSR-safe : retourne `defaultProjet()` si `window === undefined`.

### `sauvegarderProjet(projet: Partial<ProjetState>): void`

Merge le projet courant avec les nouvelles valeurs et écrit dans localStorage.
SSR-safe.

```ts
// Mise à jour partielle
sauvegarderProjet({ entreprise: { nom: 'Dupont' } })
// ↑ Merge, ne supprime pas les autres champs
```

### `reinitialiserProjet(): void`

Supprime `localStorage['projet_courant']`. SSR-safe.

---

## Valeurs par défaut (`defaultProjet`)

```ts
{
  entreprise: { nom: '', metier: '', ville: '', telephone: '', email: '' },
  pack:       { id: 'starter', nom: 'Pack Starter', prix: 790, pages: '1-2 pages' },
  options:    [],
  design:     { couleur: '#5a7c5a', police: 'Inter', style: 'Moderne' },
}
```

---

## Clé localStorage

```
projet_courant
```

---

## Flux dans le générateur

```
useEffect (mount)
  └─ chargerProjet() → setProjet(saved)

useEffect [projet]
  └─ sauvegarderProjet(projet)    ← auto-save à chaque changement
  └─ buildPrompt(projet)          ← régénère le prompt
```

---

## Distinction avec lib/utils.ts

| | `lib/storage.ts` | `lib/utils.ts` |
|---|---|---|
| Usage | Générateur `/generateur` | Tutoriels `/tutoriels/*` |
| Clé LS | `projet_courant` | `artisan_guide_[type]_[slug]` |
| Données | `ProjetState` (formulaire) | `number[]` (IDs étapes/checklist) |
