# Module — lib/promptBuilder.ts

Génère le prompt texte structuré à envoyer à Claude Code pour produire un site artisanal complet.

---

## Fonction

### `buildPrompt(projet: ProjetState): string`

Prend un `ProjetState` (depuis `lib/storage.ts`) et retourne une chaîne multi-lignes formatée en Markdown.

---

## Structure du prompt généré

```
Génère un site vitrine complet pour un artisan avec les spécifications suivantes :

## ENTREPRISE
- Nom : [nom]
- Métier : [metier]
- Ville : [ville]
- Téléphone : [telephone]
- Email : [email]

## PACK CHOISI
- Type : [nom pack] ([prix]€)
- Pages : [pages]

## OPTIONS SÉLECTIONNÉES
- [nom option] ([prix]€)
- ...
(ou "(Aucune)" si vide)

## TOTAL ESTIMÉ
[prix pack + somme options]€

## DESIGN
- Couleur principale : [hex]
- Police : [police]
- Style : [style]

## CONTRAINTES TECHNIQUES
- Next.js 15 App Router, TypeScript, Tailwind CSS
- Déploiement sur Vercel
- Responsive (mobile-first)
- Inclure toutes les pages et fonctionnalités correspondant au pack et aux options
- Code prêt à être copié et déployé immédiatement

Génère TOUS les fichiers du projet en un seul prompt.
```

---

## Valeurs manquantes

Si un champ est vide dans `ProjetState`, le prompt insère un placeholder:
- Champs obligatoires → `[À remplir]`
- Champs optionnels → `[Optionnel]`

```ts
projet.entreprise.nom || '[À remplir]'
projet.entreprise.telephone || '[Optionnel]'
```

---

## Calcul du total

```ts
const totalPrix = projet.pack.prix + projet.options.reduce((sum, o) => sum + o.prix, 0)
```

---

## Étendre le prompt

Pour ajouter une nouvelle section (ex: SEO, multilangue), modifier `buildPrompt` dans `lib/promptBuilder.ts`:

```ts
return `...
## NOUVELLE SECTION
- Clé : ${projet.nouvelleSection.valeur}
...`
```

Et ajouter le champ correspondant dans `ProjetState` (lib/storage.ts).

---

## Dépendances

- `ProjetState` → `lib/storage.ts`

Aucune dépendance externe. Fonction pure (pas de side-effects).
