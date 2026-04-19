# Atelier Numérique — Plateforme de génération de sites artisanaux

Outil interne pour générer des sites vitrines professionnels pour artisans via Claude Code.
Le générateur produit un prompt structuré que l'IA transforme en site complet prêt à déployer.

**Production** → https://mini-site-tuto.vercel.app

---

## Stack

| Technologie | Usage |
|---|---|
| Next.js 15 App Router | Framework frontend |
| TypeScript strict | Typage statique |
| Tailwind CSS | Styles utilitaires |
| localStorage | Persistance (aucune BDD) |
| Vercel | Déploiement continu |

## Démarrage

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Build de production
```

## Routes

| Route | Description |
|---|---|
| `/` | Accueil — 2 CTAs + explications |
| `/generateur` | Formulaire → prompt Claude Code |
| `/tutoriels/[pack]` | Guide pas-à-pas (starter / artisan / business) |
| `/options` | Catalogue des 8 options disponibles |
| `/charte-de-couleurs` | Design system DESCODES |

## Structure

```
mini-site-tuto/
├── app/
│   ├── layout.tsx                  ← Layout racine + ThemeProvider + ThemeToggle
│   ├── globals.css                 ← Variables CSS, fond, polices (Playfair + Inter)
│   ├── page.tsx                    ← Accueil (hero + 3 étapes + stats)
│   ├── generateur/page.tsx         ← Formulaire de génération de prompt
│   ├── tutoriels/[pack]/page.tsx   ← Guide interactif StepWizard par pack
│   ├── options/page.tsx            ← Liste des options disponibles
│   ├── charte-de-couleurs/page.tsx ← Design system DESCODES
│   └── not-found.tsx               ← Page 404
├── components/
│   ├── ui/                         ← Primitives réutilisables
│   │   ├── Button.tsx              ← Bouton (variant: primary | outline)
│   │   ├── Card.tsx                ← Carte (wrapper avec ombre et bordure)
│   │   ├── CodeBlock.tsx           ← Bloc de code + copie presse-papier
│   │   ├── ProgressBar.tsx         ← Barre de progression ARIA
│   │   └── ThemeToggle.tsx         ← Interrupteur dark/light (footer)
│   ├── features/                   ← Composants métier
│   │   ├── PackCard.tsx            ← Carte pack sur l'accueil
│   │   ├── StepWizard.tsx          ← Guide pas-à-pas interactif principal
│   │   ├── PriceCalculator.tsx     ← Calculateur de prix sticky (sidebar)
│   │   └── Checklist.tsx           ← Checklist de validation finale
│   └── layout/
│       ├── Navbar.tsx              ← Navigation sticky responsive
│       ├── Footer.tsx              ← Pied de page
│       ├── ThemeProvider.tsx       ← Contexte React dark/light
│       └── ThemeToggle.tsx         ← Bouton pill fixe (overlay)
├── lib/
│   ├── constants.ts                ← Données: PACKS, OPTIONS, STEPS (~3000 lignes)
│   ├── theme.ts                    ← Design tokens: couleurs, polices, ombres
│   ├── storage.ts                  ← localStorage projet courant (générateur)
│   ├── promptBuilder.ts            ← Construction du prompt Claude Code
│   └── utils.ts                    ← localStorage tutoriels, clipboard, formatPrice
└── docs/                           ← Documentation technique des modules
```

## Workflow utilisateur

```
/generateur
  → Formulaire (entreprise + pack + options + design)
  → Prompt auto-généré en temps réel
  → Copie dans Claude Code
  → Site artisanal généré et déployé sur Vercel
```

## Design

Palette vert sauge & blanc cassé. Voir `lib/theme.ts` pour les tokens.
Design system DESCODES disponible à `/charte-de-couleurs`.

Pour personnaliser:

```ts
// lib/theme.ts
colors.primary = '#5a7c5a'   // couleur principale
colors.background = '#fef9f0' // fond page
```

## Documentation modules

Voir [`docs/`](./docs/README.md) pour la documentation détaillée de chaque module.

## Déploiement

```bash
# Le token GitHub est dans /home/batou/.token
TOKEN=$(grep "GITHUB_TOKEN:" /home/batou/.token | awk '{print $2}')
git remote set-url origin "https://$TOKEN@github.com/batoucode/mini-site-tuto.git"
git push origin main
git remote set-url origin "https://github.com/batoucode/mini-site-tuto.git"

# Vercel (auto-détecte Next.js)
vercel deploy --prod
```

---

Usage interne BATOUCODE. Aucune base de données. Tout est en localStorage.
