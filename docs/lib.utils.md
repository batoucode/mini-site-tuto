# Module — lib/utils.ts

Fonctions utilitaires générales. Couvrent la persistance des **tutoriels**, le presse-papier et le formatage.

---

## LocalStorage — Tutoriels

Toutes les clés suivent le schéma : `artisan_guide_[type]_[slug]`

### `getStorageKey(packSlug, type): string`

```ts
getStorageKey('starter', 'progress')
// → 'artisan_guide_progress_starter'
```

Types disponibles : `'progress'` | `'checklist'` | `'options'`

---

### `loadProgress(packSlug): number[]`

Retourne la liste des IDs d'étapes terminées pour un pack.
Retourne `[]` si absent, invalide ou SSR.

### `saveProgress(packSlug, completedSteps: number[]): void`

Persiste la liste des étapes terminées.

---

### `loadSelectedOptions(packSlug): string[]`

Retourne les IDs d'options cochées dans le `PriceCalculator`.

### `saveSelectedOptions(packSlug, optionIds: string[]): void`

Persiste les options sélectionnées.

---

### `loadChecklist(packSlug): number[]`

Retourne les indices des items cochés dans la `Checklist` finale.

### `saveChecklist(packSlug, checkedItems: number[]): void`

Persiste les items de checklist cochés.

---

### `resetProgress(packSlug): void`

Supprime les 3 clés d'un pack d'un coup (progress + checklist + options).

```ts
resetProgress('starter')
// supprime: artisan_guide_progress_starter
//           artisan_guide_checklist_starter
//           artisan_guide_options_starter
```

---

## Presse-papier

### `copyToClipboard(text: string): Promise<boolean>`

```ts
const ok = await copyToClipboard('npm install')
// true  → copie réussie
// false → échec (permissions, contexte non-sécurisé)
```

**Stratégie:**
1. `navigator.clipboard.writeText()` si contexte sécurisé (HTTPS / localhost)
2. Fallback `document.execCommand('copy')` pour navigateurs anciens

Utilisé par `CodeBlock.tsx` et `app/generateur/page.tsx`.

---

## Formatage

### `formatPrice(price: number): string`

```ts
formatPrice(1390)  // → "1 390 €"
formatPrice(790)   // → "790 €"
```

Format : `fr-FR`, devise EUR, 0 décimales.

### `calculateProgress(completed: number, total: number): number`

```ts
calculateProgress(3, 8)   // → 38
calculateProgress(8, 8)   // → 100
calculateProgress(0, 0)   // → 0  (évite division par zéro)
```

Retourne un entier 0–100.

---

## SSR Safety

Toutes les fonctions localStorage vérifient `typeof window === 'undefined'` avant d'accéder au navigateur. Elles sont donc utilisables dans des Server Components sans erreur.
