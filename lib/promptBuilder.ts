import { ProjetState } from './storage'

export function buildPrompt(projet: ProjetState): string {
  const optionsText = projet.options.length
    ? projet.options.map(opt => `- ${opt.nom} (${opt.prix}€)`).join('\n')
    : '(Aucune)'

  const totalPrix = projet.pack.prix + projet.options.reduce((sum, o) => sum + o.prix, 0)

  return `Génère un site vitrine complet pour un artisan avec les spécifications suivantes :

## ENTREPRISE
- Nom : ${projet.entreprise.nom || '[À remplir]'}
- Métier : ${projet.entreprise.metier || '[À remplir]'}
- Ville : ${projet.entreprise.ville || '[À remplir]'}
- Téléphone : ${projet.entreprise.telephone || '[Optionnel]'}
- Email : ${projet.entreprise.email || '[Optionnel]'}

## PACK CHOISI
- Type : ${projet.pack.nom} (${projet.pack.prix}€)
- Pages : ${projet.pack.pages}

## OPTIONS SÉLECTIONNÉES
${optionsText}

## TOTAL ESTIMÉ
${totalPrix}€

## DESIGN
- Couleur principale : ${projet.design.couleur}
- Police : ${projet.design.police}
- Style : ${projet.design.style}

## CONTRAINTES TECHNIQUES
- Next.js 15 App Router, TypeScript, Tailwind CSS
- Déploiement sur Vercel
- Responsive (mobile-first)
- Inclure toutes les pages et fonctionnalités correspondant au pack et aux options sélectionnées
- Code prêt à être copié et déployé immédiatement

Génère TOUS les fichiers du projet en un seul prompt.`
}
