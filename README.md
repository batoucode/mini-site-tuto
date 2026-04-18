# Guide Artisan Pro — Mini-site tutoriel interactif

Guide pas-à-pas pour créer des sites vitrines pour artisans.
Progression sauvegardée dans localStorage, code copiable, dark/light mode.

## Stack technique

- **Next.js 15** (App Router)
- **TypeScript** strict
- **Tailwind CSS** avec dark mode `class`
- **Zod** pour la validation
- Aucune base de données (localStorage uniquement)

## Démarrage rapide

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Structure

```
mini-site-tuto/
├── app/
│   ├── layout.tsx           ← Layout racine + ThemeProvider
│   ├── page.tsx             ← Homepage avec les 3 packs
│   ├── not-found.tsx        ← Page 404
│   ├── pack/[slug]/
│   │   └── page.tsx         ← Page de chaque pack (Starter/Artisan/Business)
│   └── options/
│       └── page.tsx         ← Page toutes les options
├── components/
│   ├── ui/
│   │   ├── ThemeToggle.tsx  ← Interrupteur dark/light
│   │   ├── ProgressBar.tsx  ← Barre de progression
│   │   └── CodeBlock.tsx    ← Bloc de code + bouton copier
│   ├── features/
│   │   ├── PackCard.tsx     ← Carte pack sur l'accueil
│   │   ├── StepWizard.tsx   ← Guide pas-à-pas principal
│   │   ├── PriceCalculator.tsx ← Calculateur de prix sticky
│   │   └── Checklist.tsx    ← Checklist de validation finale
│   └── layout/
│       ├── ThemeProvider.tsx ← Contexte dark/light mode
│       ├── Navbar.tsx       ← Navigation sticky responsive
│       └── Footer.tsx       ← Pied de page + ThemeToggle
├── lib/
│   ├── constants.ts         ← Tous les packs, étapes, options
│   └── utils.ts             ← localStorage, clipboard, formatPrice
└── public/
```

## Fonctionnalités

- ✅ **3 packs** : Starter (790€), Artisan (1390€), Business (2190€)
- ✅ **8 étapes** par pack avec objectif, actions, commandes, code et résultat
- ✅ **Navigation** : prev/next, points de navigation cliquables
- ✅ **Blocage** : impossible de passer à l'étape suivante sans cocher
- ✅ **Progression** : sauvegardée dans localStorage, reprise possible
- ✅ **Code copiable** : bouton "Copier" avec feedback visuel
- ✅ **Aide contextuelle** : section dépliable `<details>` par étape
- ✅ **Dark/Light mode** : interrupteur dans le footer, sauvegardé
- ✅ **Calculateur de prix** : sidebar sticky avec 8 options
- ✅ **Checklist finale** : validation avant livraison
- ✅ **Responsive** : mobile, tablette, desktop

## Personnalisation

### Modifier le contenu des packs
Édite `lib/constants.ts` — les tableaux `STARTER_STEPS`, `ARTISAN_STEPS`, `BUSINESS_STEPS`.

### Modifier les options
Édite le tableau `OPTIONS` dans `lib/constants.ts`.

### Modifier les couleurs
Édite les variables CSS dans `app/globals.css`.

## Déploiement

```bash
# Build de production
npm run build

# Déploiement Vercel (après git push)
git add . && git commit -m "feat: guide artisan pro" && git push
```

---

**Usage interne** — Progression sauvegardée uniquement en local (localStorage).
