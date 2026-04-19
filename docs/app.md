# Module — app/

Routes Next.js 15 App Router. Toutes les pages sont statiquement générées sauf `/generateur` (client-side).

---

## layout.tsx

Layout racine. Enveloppe toutes les pages.

**Responsabilités:**
- Charge les polices Google Fonts (Playfair Display + Inter)
- Injecte `ThemeProvider` (contexte dark/light)
- Monte `ThemeToggle` fixe en overlay top-right
- Structure `Navbar → <main> → Footer`

**Metadata par défaut:**
```
title: "Guide Artisan Pro — Créez des sites vitrines professionnels"
```

**Modifier le layout:**
```tsx
// app/layout.tsx
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import ThemeToggle from '@/components/layout/ThemeToggle'
```

---

## globals.css

Styles globaux. **C'est ici que résident les CSS custom properties** (pas dans Tailwind).

**Variables définies:**
```css
:root {
  --background: #fef9f0;   /* fond page */
  --foreground: #2c2c2c;   /* texte principal */
  --primary:    #5a7c5a;   /* couleur d'accent */
  --surface:    #ffffff;   /* fond cards */
  --border:     #f0e5d8;   /* bordures */
}

[data-theme="dark"] {
  --background: #1a1a1a;
  --primary:    #7a9c7a;
  /* ... */
}
```

**Classes utilitaires définies:**
- `.container-custom` → `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`
- `.card` → card avec bordure, ombre, hover transition

**Fond:** Couleur plate `var(--background)`. Pas de grille (celle-ci est dans `/charte-de-couleurs`).

---

## page.tsx (Accueil `/`)

Page statique. Server Component (pas de `'use client'`).

**Contenu:**
1. Hero — Titre H1 Playfair Display + 2 boutons CTA
2. 3 cartes explicatives (étapes 1→2→3)
3. Section stats (3 packs / 8 options / 100% prêt)

**Imports:**
```tsx
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
```

**CTAs:**
- `➕ Créer un nouveau projet` → `/generateur`
- `📖 Consulter les tutoriels` → `/tutoriels/starter`

---

## generateur/page.tsx (`/generateur`)

Client Component (`'use client'`). Page principale du générateur.

**Flux:**
```
mount → chargerProjet() → setProjet()
         ↓
useEffect [projet] → sauvegarderProjet() + buildPrompt()
         ↓
render → formulaire + récap + textarea prompt
```

**Sections du formulaire:**
| Section | Champs |
|---|---|
| Entreprise | nom, métier, ville, téléphone, email |
| Pack | radio: Starter / Artisan / Business |
| Options | checkboxes × 8 |
| Design | color picker + select police + radio style |

**Sidebar:**
- Récapitulatif en temps réel
- Textarea `readOnly` avec le prompt généré
- Bouton "Copier le prompt" avec feedback "✅ Copié !"

**Données des packs et options:** définies localement dans la page (pas depuis `lib/constants.ts` — doublon voulu pour isolation du générateur).

**LocalStorage:** via `lib/storage.ts`, clé `projet_courant`.

---

## tutoriels/[pack]/page.tsx (`/tutoriels/starter|artisan|business`)

Server Component avec `generateStaticParams`. Génère 3 pages statiques.

**Params:** `{ pack: string }` (ex: `"starter"`)

**Rendu:**
```
Breadcrumb
Pack header (badge + titre + stats + features)
  ┌─ StepWizard (lg:col-span-2)
  └─ PriceCalculator (sticky sidebar, hidden mobile)
PriceCalculator (affiché sur mobile uniquement)
```

**Données:** depuis `lib/constants.ts` → `PACKS.find(p => p.slug === pack)`

---

## options/page.tsx (`/options`)

Server Component. Liste des 8 options disponibles avec prix.

**Données:** `OPTIONS` depuis `lib/constants.ts`

---

## charte-de-couleurs/page.tsx (`/charte-de-couleurs`)

Server Component. Design system DESCODES implémenté depuis le handoff HTML.

**Sections:**
1. Couleurs d'accent (Cyan, Orange, Ambre, Émeraude, Bleu électrique)
2. Fonds Dark Mode
3. Fonds Light Mode
4. Textes
5. Typographie (Syne, Ubuntu, DM Sans, JetBrains Mono)
6. Boutons & UI
7. Grille & Effets

**Polices chargées:** Syne, DM Sans, JetBrains Mono, Ubuntu (via `@import` CSS inline).

---

## not-found.tsx

Page 404. Lien retour vers `/`.
