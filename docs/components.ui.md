# Module — components/ui/

Primitives réutilisables. Pas de logique métier. Utilisables dans toutes les pages et features.

---

## Button.tsx

Bouton générique. Server/Client compatible (pas de hooks).

**Props:**
```tsx
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'   // défaut: 'primary'
}
```

**Variants:**
| Variant | Style |
|---|---|
| `primary` | Fond vert sauge `#5a7c5a`, texte blanc, ombre douce |
| `outline` | Fond transparent, bordure `#f0e5d8`, texte `#2c2c2c` |

**Usage:**
```tsx
import Button from '@/components/ui/Button'

<Button variant="primary" onClick={handleClick}>
  Démarrer un projet
</Button>

<Button variant="outline" className="text-lg px-8 py-4">
  Voir les tarifs →
</Button>
```

**Note:** Les classes Tailwind `bg-primary`, `hover:bg-primaryHover` référencent les variables CSS définies dans `globals.css`. Si tu changes `--primary`, le bouton suit automatiquement.

---

## Card.tsx

Wrapper de carte. Server/Client compatible.

**Props:**
```tsx
interface CardProps {
  children: ReactNode
  className?: string
}
```

**Style fixe:**
- Fond blanc `#ffffff`
- Bordure `#f0e5d8` (1px)
- Border-radius `20px`
- Ombre soft → hover ombre plus marquée

**Usage:**
```tsx
import Card from '@/components/ui/Card'

<Card>
  <h2>Titre</h2>
  <p>Contenu</p>
</Card>

<Card className="text-center p-8">
  Contenu centré avec padding extra
</Card>
```

---

## CodeBlock.tsx

`'use client'` — Bloc de code avec header macOS et bouton copier.

**Props:**
```tsx
interface CodeBlockProps {
  code: string
  language?: string   // défaut: 'bash'
  filename?: string   // si renseigné, remplace le label language
}
```

**Fonctionnalités:**
- Header avec 3 dots rouges/jaunes/verts (style macOS)
- Affiche `filename` ou `language` en label
- Bouton "Copier" → feedback "✓ Copié !" pendant 2s
- Fallback `execCommand` pour navigateurs anciens

**Usage:**
```tsx
import CodeBlock from '@/components/ui/CodeBlock'

<CodeBlock language="bash" code="npm install && npm run dev" />

<CodeBlock
  filename="app/page.tsx"
  language="tsx"
  code={`export default function Page() { return <div>Hello</div> }`}
/>
```

**Dépendance:** `copyToClipboard()` de `lib/utils.ts`

---

## ProgressBar.tsx

Barre de progression avec accessibilité ARIA. Server/Client compatible.

**Props:**
```tsx
interface ProgressBarProps {
  completed: number
  total: number
  showLabel?: boolean   // défaut: true
}
```

**Comportement:**
- Calcule `percentage = Math.round((completed / total) * 100)`
- Label: `"X/Y étapes (Z%)"`
- Couleur: `var(--accent)` → vert `var(--success)` à 100%
- Animation CSS `transition-all duration-500`

**Accessibilité:** `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label`

**Usage:**
```tsx
import ProgressBar from '@/components/ui/ProgressBar'

<ProgressBar completed={3} total={8} />
<ProgressBar completed={8} total={8} showLabel={false} />
```

---

## ThemeToggle.tsx (ui/)

`'use client'` — Interrupteur dark/light sous forme de pill coulissant. **Utilisé dans le Footer.**

À ne pas confondre avec `components/layout/ThemeToggle.tsx` (overlay fixe).

**Rendu:** Pill `w-12 h-6` avec cercle coulissant animé `left: 3px ↔ 28px`.

**Icône:** 🌙 en mode dark, ☀️ en mode light (sur le cercle).

**Dépendance:** `useTheme()` de `components/layout/ThemeProvider`
