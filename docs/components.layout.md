# Module — components/layout/

Composants structurels partagés par toutes les pages. Montés dans `app/layout.tsx`.

---

## Navbar.tsx

`'use client'` — Navigation principale sticky avec menu mobile.

**Pas de props.**

**État interne:**
```tsx
const [scrolled, setScrolled]     = useState(false)   // true si scrollY > 20px
const [mobileOpen, setMobileOpen] = useState(false)   // menu hamburger
```

**Liens:**
```ts
[
  { href: '/',          label: 'Accueil'           },
  { href: '/generateur',label: '➕ Créer un projet' },
  { href: '/tutoriels/starter', label: '📖 Tutoriels' },
  { href: '/options',   label: 'Options'            },
]
```

**Comportement au scroll:**
- `scrollY > 20` → fond blanc semi-transparent + bordure + ombre
- `scrollY ≤ 20` → fond transparent

**Logo:** `🪚 Atelier Numérique` — Playfair Display, accent vert `#5a7c5a`

**Lien actif:** détecté via `usePathname()` — couleur `#5a7c5a` + fond `rgba(90,124,90,0.08)`

**Mobile:** Menu hamburger animé (3 barres → ✕). Se ferme au clic sur un lien.

**Ajouter un lien:**
```ts
// Modifier le tableau navLinks en haut de Navbar.tsx
const navLinks = [
  ...
  { href: '/nouvelle-page', label: 'Nouvelle page' },
]
```

---

## Footer.tsx

Server Component. Pied de page avec branding, liens et ThemeToggle.

**Structure:**
```
[AP · Guide Artisan Pro]   [Starter | Artisan | Business | Options]   [Thème 🌙/☀️]
─────────────────────────────────────────────────────────────────────────────────────
            Guide interne · Freelance Artisan Pro · Progression sauvegardée localement
```

**Note:** Les liens du Footer pointent encore sur `/pack/*` — à synchroniser avec Navbar si la structure évolue.

**Imports:**
```tsx
import ThemeToggle from '@/components/ui/ThemeToggle'  // interrupteur sliding
```

---

## ThemeProvider.tsx

`'use client'` — Contexte React qui expose `{ theme, toggleTheme }` à tous les descendants.

**Exports:**
```ts
export function ThemeProvider({ children })   // wrapper
export function useTheme()                    // hook de consommation
```

**Comportement:**
1. Au montage → lit `localStorage.getItem('batou-theme')` ou détecte la préférence système
2. Applique `document.documentElement.setAttribute('data-theme', 'dark'|'light')`
3. Anti-flash SSR : retourne `<>{children}</>` avant montage (pas de contexte avant hydratation)

**LocalStorage key:** `batou-theme`

**Consommer le thème:**
```tsx
import { useTheme } from '@/components/layout/ThemeProvider'

function MyComponent() {
  const { theme, toggleTheme } = useTheme()
  return <button onClick={toggleTheme}>{theme}</button>
}
```

---

## ThemeToggle.tsx (layout/)

`'use client'` — Bouton pill fixe en **overlay top-right** (z-index 9999).

À ne pas confondre avec `components/ui/ThemeToggle.tsx` (interrupteur dans le Footer).

**Pas de props.** Consomme `useTheme()`.

**Style:** Bouton arrondi semi-transparent vert, backdrop-blur, icônes ☀/🌙 avec opacité variable selon le thème actif.

**Position:** `position: fixed; top: 20px; right: 24px` — définie dans `globals.css` via `.theme-toggle`.

**Monté dans:** `app/layout.tsx` (présent sur toutes les pages).
