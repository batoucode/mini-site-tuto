# Module — lib/theme.ts

Design tokens centralisés. Source de vérité pour les décisions visuelles de la plateforme.

---

## Contenu

```ts
export const theme = {
  colors: {
    primary:     '#5a7c5a',   // vert sauge — couleur principale
    primaryHover:'#4a6b4a',   // vert sauge plus sombre (hover)
    background:  '#fef9f0',   // blanc cassé chaleureux
    surface:     '#ffffff',   // blanc pur (cards, inputs)
    text:        '#2c2c2c',   // texte principal
    textLight:   '#6b6b6b',   // texte secondaire / muted
    border:      '#f0e5d8',   // bordures subtiles
    success:     '#22c55e',   // vert succès
    warning:     '#f59e0b',   // orange avertissement
    error:       '#ef4444',   // rouge erreur
  },
  fonts: {
    heading: "'Playfair Display', serif",   // titres H1–H3
    body:    "'Inter', sans-serif",          // corps de texte
  },
  borderRadius: {
    card:   '20px',     // cards
    button: '9999px',   // boutons pill
    input:  '12px',     // champs formulaire
  },
  shadows: {
    soft:  '0 4px 12px rgba(0,0,0,0.05)',   // repos
    hover: '0 8px 24px rgba(0,0,0,0.1)',    // survol
  },
}
```

---

## Usage

### Référencer dans un composant React

```tsx
import { theme } from '@/lib/theme'

<h1 style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary }}>
  Titre
</h1>

<div style={{ boxShadow: theme.shadows.soft, borderRadius: theme.borderRadius.card }}>
  Carte
</div>
```

### Référencer dans Tailwind (indirect)

Les tokens ne sont pas injectés dans Tailwind directement. Pour les couleurs dynamiques, utiliser les **CSS custom properties** définies dans `globals.css`:

```css
/* globals.css */
:root {
  --primary:    #5a7c5a;
  --background: #fef9f0;
  /* ... */
}
```

Ces variables sont utilisables en Tailwind via `bg-[var(--primary)]` ou en style inline `var(--primary)`.

---

## Modifier la couleur principale

```ts
// lib/theme.ts
primary: '#7084FF',   // exemple: bleu BATOUCODE
```

Et synchroniser dans `globals.css`:
```css
:root { --primary: #7084FF; }
[data-theme="dark"] { --primary: #9aafff; }
```

---

## Relation avec le design DESCODES

`lib/theme.ts` est la palette de la **plateforme Atelier Numérique** (vert sauge).

La palette DESCODES (navy + cyan + orange) est documentée et visible à `/charte-de-couleurs`. Ces deux palettes coexistent et servent des usages différents.
