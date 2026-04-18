// ============================================================
// TYPES
// ============================================================

export interface CodeSnippet {
  filename: string
  language: string
  code: string
}

export interface Step {
  id: number
  title: string
  objective: string
  actions: string[]
  commands?: string[]
  codeSnippets?: CodeSnippet[]
  expectedResult: string
  folderStructure?: string
  helpContent?: string
}

export interface Pack {
  slug: string
  name: string
  price: number
  duration: string
  description: string
  color: string
  features: string[]
  steps: Step[]
  checklistItems: string[]
}

export interface Option {
  id: string
  label: string
  price: number
  description: string
}

// ============================================================
// OPTIONS (pour le calculateur de prix)
// ============================================================

export const OPTIONS: Option[] = [
  {
    id: 'contact-form',
    label: 'Formulaire de contact',
    price: 190,
    description: 'Formulaire avec validation Zod + envoi email',
  },
  {
    id: 'google-maps',
    label: 'Carte Google intégrée',
    price: 90,
    description: 'Iframe Google Maps avec adresse de l\'atelier',
  },
  {
    id: 'gallery',
    label: 'Galerie photos professionnelle',
    price: 140,
    description: 'Galerie responsive avec lightbox et zoom',
  },
  {
    id: 'about',
    label: 'Section "À propos" détaillée',
    price: 160,
    description: 'Page avec photo, histoire, valeurs et équipe',
  },
  {
    id: 'blog',
    label: 'Blog / Actualités complet',
    price: 390,
    description: 'Système de blog avec MDX et articles dynamiques',
  },
  {
    id: 'seo-local',
    label: 'SEO Local Avancé',
    price: 390,
    description: 'Schema.org LocalBusiness, optimisation géolocalisée',
  },
  {
    id: 'google-business',
    label: 'Google Business Profile',
    price: 290,
    description: 'Création et optimisation de la fiche Google',
  },
  {
    id: 'maintenance',
    label: 'Maintenance Sérénité (1 an)',
    price: 290,
    description: 'Mises à jour, sauvegardes, surveillance',
  },
]

// ============================================================
// PACK STARTER
// ============================================================

const STARTER_STEPS: Step[] = [
  {
    id: 1,
    title: 'Initialisation du projet',
    objective: 'Créer un nouveau projet Next.js 15 avec TypeScript, Tailwind CSS et l\'App Router.',
    actions: [
      'Ouvre ton terminal dans le dossier où tu veux créer le projet.',
      'Lance la commande d\'initialisation ci-dessous.',
      'Réponds aux questions de l\'assistant : TypeScript → Yes, ESLint → Yes, Tailwind → Yes, src/ → No, App Router → Yes, import alias → No.',
      'Une fois le projet créé, navigue dans le dossier et ouvre-le dans VSCode.',
    ],
    commands: [
      'npx create-next-app@latest mon-site-artisan --typescript --tailwind --app --eslint',
      'cd mon-site-artisan',
      'code .',
    ],
    expectedResult:
      'Un dossier "mon-site-artisan" est créé avec tous les fichiers Next.js. La commande "npm run dev" démarre sans erreur sur http://localhost:3000.',
    folderStructure: `mon-site-artisan/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── .eslintrc.json
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json`,
    helpContent: `<h4>Problèmes fréquents</h4>
<ul>
  <li><strong>node n'est pas reconnu</strong> : installe Node.js LTS depuis <a href="https://nodejs.org" target="_blank">nodejs.org</a></li>
  <li><strong>npx échoue</strong> : mets à jour npm avec <code>npm install -g npm@latest</code></li>
  <li><strong>Port 3000 occupé</strong> : Next.js utilisera automatiquement le port 3001</li>
</ul>
<h4>Liens utiles</h4>
<ul>
  <li><a href="https://nextjs.org/docs" target="_blank">Documentation Next.js 15</a></li>
  <li><a href="https://tailwindcss.com/docs" target="_blank">Documentation Tailwind CSS</a></li>
</ul>`,
  },
  {
    id: 2,
    title: 'Structure des dossiers',
    objective: 'Organiser l\'architecture du projet pour accueillir tous les composants et pages.',
    actions: [
      'Dans le dossier "app/", crée la structure de route pour le site.',
      'Crée les dossiers "components/" avec les sous-dossiers ui/, features/ et layout/.',
      'Crée le dossier "lib/" pour les utilitaires et constantes.',
      'Supprime le contenu par défaut de app/page.tsx (on le remplacera à l\'étape suivante).',
    ],
    commands: [
      'mkdir -p app/\\(site\\)',
      'mkdir -p components/{ui,features,layout}',
      'mkdir -p lib',
      'mkdir -p public/images',
    ],
    expectedResult:
      'L\'arborescence du projet est propre et organisée. Tous les dossiers sont créés et prêts à accueillir le code.',
    folderStructure: `mon-site-artisan/
├── app/
│   ├── (site)/           ← groupe de routes (pas dans l'URL)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/               ← Button, Card, etc.
│   ├── features/         ← Hero, Services, etc.
│   └── layout/           ← Navbar, Footer
├── lib/
│   ├── constants.ts
│   └── utils.ts
└── public/
    └── images/`,
    helpContent: `<h4>Pourquoi un groupe de routes (site) ?</h4>
<p>Les parenthèses dans <code>(site)</code> créent un groupe de routes en Next.js. Le dossier n'apparaît pas dans l'URL. Cela permet d'avoir un layout spécifique pour le site principal sans impacter l'URL.</p>
<h4>Liens utiles</h4>
<ul>
  <li><a href="https://nextjs.org/docs/app/building-your-application/routing/route-groups" target="_blank">Route Groups — Next.js docs</a></li>
</ul>`,
  },
  {
    id: 3,
    title: 'Configuration globale',
    objective: 'Configurer Tailwind CSS, les variables CSS, les polices et le thème visuel.',
    actions: [
      'Configure tailwind.config.ts avec les couleurs et ombres personnalisées.',
      'Mets à jour app/globals.css avec les variables CSS pour le dark/light mode.',
      'Configure le layout principal (app/layout.tsx) avec les métadonnées et les polices.',
      'Vérifie que le mode sombre fonctionne en ajoutant la classe "dark" au HTML.',
    ],
    codeSnippets: [
      {
        filename: 'tailwind.config.ts',
        language: 'typescript',
        code: `import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#2c5f8a',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0,0,0,0.04)',
        card: '0 4px 16px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
export default config`,
      },
      {
        filename: 'app/globals.css',
        language: 'css',
        code: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #fafafa;
  --bg-card: #ffffff;
  --fg: #111111;
  --fg-muted: #666666;
  --border: #e5e5e5;
  --accent: #2c5f8a;
}

.dark {
  --bg: #0a0a0a;
  --bg-card: #1a1a1a;
  --fg: #f5f5f5;
  --fg-muted: #999999;
  --border: #2a2a2a;
  --accent: #4a90c4;
}

body {
  background-color: var(--bg);
  color: var(--fg);
  transition: background-color 0.3s ease, color 0.3s ease;
}`,
      },
      {
        filename: 'app/layout.tsx',
        language: 'typescript',
        code: `import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Artisan Pro — Votre spécialiste',
  description: 'Description de votre activité artisanale.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}`,
      },
    ],
    expectedResult:
      'Le site s\'affiche avec le bon fond (#fafafa), les variables CSS sont actives, et les polices système sont appliquées.',
    folderStructure: `app/
├── globals.css      ← Variables CSS dark/light
├── layout.tsx       ← Layout racine + métadonnées
└── page.tsx`,
    helpContent: `<h4>Pourquoi des variables CSS et pas les classes Tailwind ?</h4>
<p>Les variables CSS permettent de changer le thème en ajoutant une seule classe (<code>dark</code>) sur le HTML. Tailwind dark mode fonctionne de la même façon mais les variables CSS sont plus flexibles pour des cas complexes.</p>`,
  },
  {
    id: 4,
    title: 'Page d\'accueil',
    objective: 'Créer une hero section attractive avec un titre fort et des CTAs, plus une présentation des services.',
    actions: [
      'Crée le composant Hero.tsx dans components/features/.',
      'Crée le composant ServicesPreview.tsx pour afficher 3 services.',
      'Mets à jour app/page.tsx pour assembler les deux composants.',
      'Adapte le contenu (textes, services) à ton client artisan.',
    ],
    codeSnippets: [
      {
        filename: 'components/features/Hero.tsx',
        language: 'typescript',
        code: `export default function Hero() {
  return (
    <section
      className="py-20 md:py-32 px-4"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <span
          className="inline-block text-sm font-medium px-3 py-1 rounded-full mb-6"
          style={{
            backgroundColor: 'var(--accent-subtle, #eef4fa)',
            color: 'var(--accent)',
          }}
        >
          Artisan depuis 1995 · Région Parisienne
        </span>

        <h1
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
          style={{ color: 'var(--fg)' }}
        >
          Expert en{' '}
          <span style={{ color: 'var(--accent)' }}>menuiserie</span>{' '}
          sur mesure
        </h1>

        <p
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          style={{ color: 'var(--fg-muted)' }}
        >
          Fabrication et pose de meubles, parquets et agencements
          intérieurs. Chaque pièce est unique et réalisée avec soin
          dans notre atelier.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="px-8 py-3 rounded-xl font-medium text-white transition-all hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Demander un devis gratuit
          </a>
          <a
            href="#realisations"
            className="px-8 py-3 rounded-xl font-medium transition-all hover:opacity-80"
            style={{
              backgroundColor: 'var(--bg-card)',
              color: 'var(--fg)',
              border: '1px solid var(--border)',
            }}
          >
            Voir mes réalisations
          </a>
        </div>
      </div>
    </section>
  )
}`,
      },
      {
        filename: 'components/features/ServicesPreview.tsx',
        language: 'typescript',
        code: `const services = [
  {
    icon: '🪵',
    title: 'Meubles sur mesure',
    description:
      'Conception et fabrication de meubles uniques adaptés à votre espace et vos besoins.',
  },
  {
    icon: '🏠',
    title: 'Pose de parquet',
    description:
      'Installation de parquets massifs, contrecollés et stratifiés avec finition parfaite.',
  },
  {
    icon: '🔨',
    title: 'Rénovation',
    description:
      'Rénovation complète de vos menuiseries intérieures pour redonner vie à votre intérieur.',
  },
]

export default function ServicesPreview() {
  return (
    <section id="services" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-3xl font-bold text-center mb-12"
          style={{ color: 'var(--fg)' }}
        >
          Mes prestations
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-6 rounded-xl transition-all hover:shadow-card-hover"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ color: 'var(--fg)' }}
              >
                {service.title}
              </h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}`,
      },
      {
        filename: 'app/page.tsx',
        language: 'typescript',
        code: `import Hero from '@/components/features/Hero'
import ServicesPreview from '@/components/features/ServicesPreview'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
    </>
  )
}`,
      },
    ],
    expectedResult:
      'La page d\'accueil affiche une hero section avec titre, sous-titre et deux boutons CTA, suivie de 3 cartes de services.',
    folderStructure: `components/features/
├── Hero.tsx           ← Section héros
└── ServicesPreview.tsx ← 3 cartes services

app/
└── page.tsx           ← Assemble les composants`,
    helpContent: `<h4>Adapter le contenu</h4>
<p>Remplace le texte du composant <code>Hero.tsx</code> par l'activité de ton client. Change les services dans le tableau <code>services</code> de <code>ServicesPreview.tsx</code>.</p>
<h4>Ajouter des images</h4>
<p>Utilise le composant <code>next/image</code> pour optimiser les images. Place-les dans <code>/public/images/</code>.</p>`,
  },
  {
    id: 5,
    title: 'Formulaire de contact',
    objective: 'Créer un formulaire de contact avec validation Zod côté serveur et feedback utilisateur.',
    actions: [
      'Installe les dépendances nécessaires : zod et react-hook-form.',
      'Crée le schéma de validation Zod dans lib/schemas.ts.',
      'Crée la Server Action dans app/actions/contact.ts.',
      'Crée le composant ContactForm.tsx côté client.',
      'Intègre le formulaire dans une page de contact.',
    ],
    commands: [
      'npm install zod react-hook-form @hookform/resolvers',
    ],
    codeSnippets: [
      {
        filename: 'lib/schemas.ts',
        language: 'typescript',
        code: `import { z } from 'zod'

export const ContactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z
    .string()
    .regex(/^[0-9+\\s-]{10,}$/, 'Numéro de téléphone invalide')
    .optional()
    .or(z.literal('')),
  subject: z.string().min(5, 'Le sujet doit contenir au moins 5 caractères'),
  message: z.string().min(20, 'Le message doit contenir au moins 20 caractères'),
})

export type ContactFormData = z.infer<typeof ContactSchema>`,
      },
      {
        filename: 'app/actions/contact.ts',
        language: 'typescript',
        code: `'use server'

import { ContactSchema } from '@/lib/schemas'

export type ContactActionState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function submitContact(
  prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const rawData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    subject: formData.get('subject') as string,
    message: formData.get('message') as string,
  }

  const result = ContactSchema.safeParse(rawData)

  if (!result.success) {
    return {
      success: false,
      message: 'Veuillez corriger les erreurs dans le formulaire.',
      errors: result.error.flatten().fieldErrors,
    }
  }

  // TODO: Envoyer l'email avec Resend ou Nodemailer
  // Pour l'instant, on simule un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.log('Nouveau contact:', result.data)

  return {
    success: true,
    message: 'Votre message a été envoyé avec succès ! Nous vous recontacterons dans les 24h.',
  }
}`,
      },
      {
        filename: 'components/features/ContactForm.tsx',
        language: 'typescript',
        code: `'use client'

import { useActionState, useEffect, useRef } from 'react'
import { submitContact, type ContactActionState } from '@/app/actions/contact'

const initialState: ContactActionState = {
  success: false,
  message: '',
}

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state.success])

  const inputClass = \`
    w-full px-4 py-3 rounded-xl border transition-all
    focus:outline-none focus:ring-2
  \`

  const inputStyle = {
    backgroundColor: 'var(--bg)',
    borderColor: 'var(--border)',
    color: 'var(--fg)',
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-1"
            style={{ color: 'var(--fg-muted)' }}
          >
            Nom complet *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className={inputClass}
            style={inputStyle}
            placeholder="Jean Dupont"
          />
          {state.errors?.name && (
            <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1"
            style={{ color: 'var(--fg-muted)' }}
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={inputClass}
            style={inputStyle}
            placeholder="jean@exemple.fr"
          />
          {state.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium mb-1"
          style={{ color: 'var(--fg-muted)' }}
        >
          Téléphone (optionnel)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className={inputClass}
          style={inputStyle}
          placeholder="06 12 34 56 78"
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium mb-1"
          style={{ color: 'var(--fg-muted)' }}
        >
          Sujet *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className={inputClass}
          style={inputStyle}
          placeholder="Demande de devis meuble sur mesure"
        />
        {state.errors?.subject && (
          <p className="text-red-500 text-sm mt-1">{state.errors.subject[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-1"
          style={{ color: 'var(--fg-muted)' }}
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClass}
          style={inputStyle}
          placeholder="Décrivez votre projet..."
        />
        {state.errors?.message && (
          <p className="text-red-500 text-sm mt-1">{state.errors.message[0]}</p>
        )}
      </div>

      {state.message && (
        <div
          className="p-4 rounded-xl text-sm font-medium"
          style={{
            backgroundColor: state.success
              ? 'rgba(22, 163, 74, 0.1)'
              : 'rgba(239, 68, 68, 0.1)',
            color: state.success ? 'var(--success)' : '#ef4444',
            border: \`1px solid \${state.success ? 'rgba(22, 163, 74, 0.3)' : 'rgba(239, 68, 68, 0.3)'}\`,
          }}
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 px-6 rounded-xl font-medium text-white transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        {isPending ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>
    </form>
  )
}`,
      },
    ],
    expectedResult:
      'Un formulaire s\'affiche avec validation en temps réel. Les erreurs apparaissent sous les champs. Un message de succès s\'affiche après l\'envoi.',
    folderStructure: `app/
└── actions/
    └── contact.ts     ← Server Action

components/features/
└── ContactForm.tsx    ← Formulaire client

lib/
└── schemas.ts         ← Schémas Zod`,
    helpContent: `<h4>Ajouter l'envoi d'email avec Resend</h4>
<pre><code>npm install resend</code></pre>
<p>Puis dans <code>app/actions/contact.ts</code>, remplace le commentaire TODO par :</p>
<pre><code>import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)
await resend.emails.send({
  from: 'contact@tonsite.fr',
  to: 'toi@gmail.com',
  subject: result.data.subject,
  html: \`&lt;p&gt;De : \${result.data.name}&lt;/p&gt;\`,
})</code></pre>
<h4>Liens utiles</h4>
<ul>
  <li><a href="https://resend.com/docs" target="_blank">Documentation Resend</a></li>
  <li><a href="https://zod.dev" target="_blank">Documentation Zod</a></li>
</ul>`,
  },
  {
    id: 6,
    title: 'SEO de base',
    objective: 'Configurer les balises meta, le sitemap et robots.txt pour optimiser le référencement.',
    actions: [
      'Mets à jour les métadonnées dans app/layout.tsx avec les vraies informations.',
      'Crée app/sitemap.ts pour générer automatiquement le sitemap XML.',
      'Crée app/robots.ts pour les directives robots.',
      'Ajoute les balises Open Graph pour le partage sur réseaux sociaux.',
    ],
    codeSnippets: [
      {
        filename: 'app/layout.tsx (partie metadata)',
        language: 'typescript',
        code: `import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.votre-artisan.fr'),
  title: {
    default: 'Jean Martin Menuiserie — Menuisier sur mesure à Paris',
    template: '%s | Jean Martin Menuiserie',
  },
  description:
    'Menuisier artisan à Paris depuis 1995. Fabrication de meubles sur mesure, pose de parquet, agencement intérieur. Devis gratuit.',
  keywords: [
    'menuisier paris',
    'meuble sur mesure',
    'parquet',
    'agencement intérieur',
    'artisan menuisier',
  ],
  authors: [{ name: 'Jean Martin' }],
  creator: 'Jean Martin',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.votre-artisan.fr',
    siteName: 'Jean Martin Menuiserie',
    title: 'Jean Martin Menuiserie — Menuisier sur mesure à Paris',
    description: 'Menuisier artisan à Paris depuis 1995.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jean Martin Menuiserie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jean Martin Menuiserie',
    description: 'Menuisier artisan à Paris depuis 1995.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}`,
      },
      {
        filename: 'app/sitemap.ts',
        language: 'typescript',
        code: `import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.votre-artisan.fr'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: \`\${baseUrl}/contact\`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: \`\${baseUrl}/prestations\`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]
}`,
      },
      {
        filename: 'app/robots.ts',
        language: 'typescript',
        code: `import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://www.votre-artisan.fr/sitemap.xml',
  }
}`,
      },
    ],
    expectedResult:
      'Visite https://localhost:3000/sitemap.xml → le sitemap XML s\'affiche. Visite /robots.txt → les directives robots s\'affichent. Les balises meta sont visibles dans le HTML source.',
    folderStructure: `app/
├── sitemap.ts    ← /sitemap.xml auto-généré
├── robots.ts     ← /robots.txt auto-généré
└── layout.tsx    ← Métadonnées complètes`,
    helpContent: `<h4>Vérifier le SEO</h4>
<ul>
  <li>Utilise <a href="https://web.dev/measure/" target="_blank">web.dev/measure</a> pour mesurer les Core Web Vitals</li>
  <li>Teste les balises Open Graph avec <a href="https://developers.facebook.com/tools/debug/" target="_blank">Facebook Debugger</a></li>
  <li>Valide le sitemap avec <a href="https://www.xml-sitemaps.com/validate-xml-sitemap.html" target="_blank">XML Sitemap Validator</a></li>
</ul>`,
  },
  {
    id: 7,
    title: 'Déploiement sur Vercel',
    objective: 'Mettre le site en ligne gratuitement sur Vercel en moins de 10 minutes.',
    actions: [
      'Initialise Git dans ton projet et fais un premier commit.',
      'Crée un dépôt sur GitHub et pousse le code.',
      'Crée un compte gratuit sur Vercel.com.',
      'Importe le dépôt GitHub dans Vercel.',
      'Configure les variables d\'environnement si nécessaire.',
      'Lance le déploiement et attends l\'URL.',
    ],
    commands: [
      'git init',
      'git add .',
      'git commit -m "feat: initial commit — site artisan"',
      'git remote add origin https://github.com/TON_USERNAME/mon-site-artisan.git',
      'git push -u origin main',
    ],
    expectedResult:
      'Le site est accessible sur une URL de type https://mon-site-artisan-xyz.vercel.app. Chaque nouveau commit sur main déclenche un déploiement automatique.',
    folderStructure: `Dépôt GitHub:
mon-site-artisan/
├── .gitignore      ← Node_modules, .env exclus
└── ... (tous tes fichiers)

Vercel Project:
├── Production: main branch
├── Previews: autres branches
└── Env Variables: RESEND_API_KEY, etc.`,
    helpContent: `<h4>Variables d'environnement sur Vercel</h4>
<p>Dans Vercel → Settings → Environment Variables, ajoute :</p>
<ul>
  <li><code>RESEND_API_KEY</code> → ta clé API Resend</li>
  <li><code>NEXT_PUBLIC_SITE_URL</code> → https://www.votre-artisan.fr</li>
</ul>
<h4>Éviter de committer des secrets</h4>
<p>Crée un fichier <code>.env.local</code> pour tes clés locales. Il est dans <code>.gitignore</code> par défaut.</p>
<h4>Liens utiles</h4>
<ul>
  <li><a href="https://vercel.com/docs" target="_blank">Documentation Vercel</a></li>
  <li><a href="https://vercel.com/new" target="_blank">Créer un projet Vercel</a></li>
</ul>`,
  },
  {
    id: 8,
    title: 'Domaine personnalisé et validation finale',
    objective: 'Connecter un nom de domaine professionnel et valider que tout fonctionne correctement.',
    actions: [
      'Achète un nom de domaine chez OVH, Gandi ou Infomaniak.',
      'Dans Vercel → ton projet → Settings → Domains, clique "Add".',
      'Saisis le nom de domaine (ex: jean-martin-menuiserie.fr).',
      'Copie les enregistrements DNS fournis par Vercel.',
      'Colle-les dans le panneau DNS de ton registrar.',
      'Attends la propagation DNS (5-30 minutes) et vérifie le cadenas HTTPS.',
    ],
    expectedResult:
      'Le site est accessible sur https://jean-martin-menuiserie.fr avec un certificat SSL valide (cadenas vert). Les redirections www → non-www fonctionnent.',
    folderStructure: `Configuration DNS (exemple OVH):
┌─────────────────────────────────────────────┐
│ Type  │ Sous-domaine │ Cible                │
├─────────────────────────────────────────────┤
│ A     │ @            │ 76.76.21.21          │
│ CNAME │ www          │ cname.vercel-dns.com │
└─────────────────────────────────────────────┘`,
    helpContent: `<h4>Problèmes de propagation DNS</h4>
<p>La propagation peut prendre jusqu'à 48h dans certains cas. Vérifie avec <a href="https://dnschecker.org" target="_blank">dnschecker.org</a>.</p>
<h4>Vérifier que tout fonctionne</h4>
<ul>
  <li>✅ https:// fonctionne (pas d'erreur SSL)</li>
  <li>✅ www.domaine.fr redirige vers domaine.fr</li>
  <li>✅ Le formulaire de contact envoie les emails</li>
  <li>✅ Les images se chargent rapidement</li>
  <li>✅ Le site est responsive sur mobile</li>
</ul>`,
  },
]

// ============================================================
// PACK ARTISAN
// ============================================================

const ARTISAN_STEPS: Step[] = [
  {
    id: 1,
    title: 'Initialisation et architecture',
    objective: 'Créer un projet Next.js avec une structure multi-pages complète pour un site artisan professionnel.',
    actions: [
      'Lance create-next-app avec les mêmes options que le pack Starter.',
      'Crée une structure de pages plus complète avec des routes pour chaque section.',
      'Configure le groupe de routes (site) pour centraliser le layout.',
    ],
    commands: [
      'npx create-next-app@latest mon-site-artisan --typescript --tailwind --app --eslint',
      'cd mon-site-artisan',
      'mkdir -p app/\\(site\\)/{prestations,realisations,a-propos,contact}',
      'mkdir -p components/{ui,features,layout}',
      'mkdir -p lib public/images',
    ],
    expectedResult:
      'Projet créé avec une structure pour 5 pages : accueil, prestations, réalisations, à-propos et contact.',
    folderStructure: `mon-site-artisan/
├── app/
│   ├── (site)/
│   │   ├── layout.tsx         ← Layout avec Navbar/Footer
│   │   ├── page.tsx           ← Accueil
│   │   ├── prestations/
│   │   │   └── page.tsx
│   │   ├── realisations/
│   │   │   └── page.tsx
│   │   ├── a-propos/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
├── components/
│   ├── ui/
│   ├── features/
│   └── layout/
└── lib/`,
    helpContent: `<h4>Pourquoi un layout dans (site) ?</h4>
<p>En créant un <code>layout.tsx</code> dans le groupe <code>(site)</code>, la Navbar et le Footer s'appliquent à toutes les pages du site sans être dans le layout racine. Parfait si tu veux ajouter une section admin plus tard.</p>`,
  },
  {
    id: 2,
    title: 'Layout et navigation avancée',
    objective: 'Créer une navbar professionnelle avec menu de navigation et sous-menus pour les prestations.',
    actions: [
      'Crée le composant Navbar.tsx avec les liens vers toutes les pages.',
      'Ajoute un menu déroulant pour les sous-catégories de prestations.',
      'Crée le layout du groupe (site) qui inclut Navbar et Footer.',
      'Rends la navbar sticky avec un fond semi-transparent.',
    ],
    codeSnippets: [
      {
        filename: 'components/layout/Navbar.tsx',
        language: 'typescript',
        code: `'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Accueil' },
  {
    label: 'Prestations',
    href: '/prestations',
    children: [
      { href: '/prestations#meubles', label: 'Meubles sur mesure' },
      { href: '/prestations#parquet', label: 'Pose de parquet' },
      { href: '/prestations#renovation', label: 'Rénovation' },
    ],
  },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${
        scrolled ? 'py-3 shadow-card' : 'py-5'
      }\`}
      style={{
        backgroundColor: scrolled
          ? 'rgba(var(--bg-rgb, 250,250,250), 0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl" style={{ color: 'var(--fg)' }}>
          🔨 Jean Martin
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(link.label)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <button
                  className={\`px-4 py-2 rounded-lg text-sm font-medium transition-all \${
                    pathname.startsWith(link.href || '')
                      ? 'text-accent'
                      : ''
                  }\`}
                  style={{
                    color: pathname.startsWith(link.href || '')
                      ? 'var(--accent)'
                      : 'var(--fg)',
                  }}
                >
                  {link.label} ▾
                </button>
                {dropdownOpen === link.label && (
                  <div
                    className="absolute top-full left-0 mt-1 w-56 rounded-xl shadow-card py-2"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm transition-all hover:opacity-70"
                        style={{ color: 'var(--fg)' }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-70"
                style={{
                  color: pathname === link.href ? 'var(--accent)' : 'var(--fg)',
                  fontWeight: pathname === link.href ? '600' : '500',
                }}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href="/contact"
            className="ml-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Devis gratuit
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: 'var(--fg)' }}
          aria-label="Menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 pb-4 pt-2"
          style={{
            backgroundColor: 'var(--bg)',
            borderTop: '1px solid var(--border)',
          }}
        >
          {navLinks.map((link) => (
            <div key={link.label}>
              <Link
                href={link.href || '#'}
                className="block py-3 text-sm font-medium"
                style={{ color: 'var(--fg)' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="pl-4">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-2 text-sm"
                      style={{ color: 'var(--fg-muted)' }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  )
}`,
      },
    ],
    expectedResult:
      'Une navbar sticky apparaît en haut de page. Le fond devient opaque au scroll. Un menu déroulant s\'affiche au survol de "Prestations". Le menu hamburger fonctionne sur mobile.',
    folderStructure: `components/layout/
├── Navbar.tsx     ← Navigation principale
└── Footer.tsx     ← Pied de page

app/(site)/
└── layout.tsx     ← Layout avec Navbar + Footer`,
    helpContent: `<h4>Personnaliser le logo</h4>
<p>Remplace "🔨 Jean Martin" par un vrai logo avec <code>next/image</code> :</p>
<pre><code>import Image from 'next/image'
&lt;Image src="/logo.png" alt="Logo" width={120} height={40} /&gt;</code></pre>`,
  },
  {
    id: 3,
    title: 'Galerie photo interactive',
    objective: 'Créer une galerie de photos responsive avec lightbox pour afficher les réalisations.',
    actions: [
      'Crée le composant Gallery.tsx dans components/features/.',
      'Implémente un système de lightbox sans dépendance externe.',
      'Ajoute la navigation clavier (Escape pour fermer, flèches pour naviguer).',
      'Optimise les images avec next/image.',
    ],
    codeSnippets: [
      {
        filename: 'components/features/Gallery.tsx',
        language: 'typescript',
        code: `'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface GalleryImage {
  src: string
  alt: string
  width: number
  height: number
  category?: string
}

interface GalleryProps {
  images: GalleryImage[]
  categories?: string[]
}

export default function Gallery({ images, categories = [] }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('Tout')

  const filteredImages =
    activeCategory === 'Tout'
      ? images
      : images.filter((img) => img.category === activeCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const goToNext = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % filteredImages.length)
  }, [lightboxIndex, filteredImages.length])

  const goToPrev = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex(
      (lightboxIndex - 1 + filteredImages.length) % filteredImages.length
    )
  }, [lightboxIndex, filteredImages.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'ArrowLeft') goToPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, goToNext, goToPrev])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxIndex])

  const allCategories = ['Tout', ...categories]

  return (
    <>
      {/* Category filters */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                backgroundColor:
                  activeCategory === cat
                    ? 'var(--accent)'
                    : 'var(--bg-card)',
                color: activeCategory === cat ? 'white' : 'var(--fg)',
                border:
                  activeCategory === cat
                    ? 'none'
                    : '1px solid var(--border)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredImages.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="group relative overflow-hidden rounded-xl aspect-square cursor-zoom-in"
            style={{ boxShadow: 'var(--shadow-soft)' }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                🔍
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.92)' }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:opacity-70 transition-opacity z-10"
            onClick={closeLightbox}
            aria-label="Fermer"
          >
            ✕
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 text-white text-sm opacity-70">
            {lightboxIndex + 1} / {filteredImages.length}
          </div>

          {/* Prev button */}
          <button
            className="absolute left-4 text-white text-4xl hover:opacity-70 transition-opacity z-10 p-2"
            onClick={(e) => {
              e.stopPropagation()
              goToPrev()
            }}
            aria-label="Image précédente"
          >
            ‹
          </button>

          {/* Image */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Next button */}
          <button
            className="absolute right-4 text-white text-4xl hover:opacity-70 transition-opacity z-10 p-2"
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            aria-label="Image suivante"
          >
            ›
          </button>

          {/* Caption */}
          {filteredImages[lightboxIndex].alt && (
            <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm opacity-80">
              {filteredImages[lightboxIndex].alt}
            </div>
          )}
        </div>
      )}
    </>
  )
}`,
      },
    ],
    expectedResult:
      'La galerie affiche les photos en grille. Au clic, la lightbox s\'ouvre avec l\'image agrandie. Les flèches clavier et les boutons permettent de naviguer. Échap ferme la lightbox.',
    folderStructure: `components/features/
└── Gallery.tsx     ← Galerie + lightbox intégrée

public/images/
├── realisation-1.jpg
├── realisation-2.jpg
└── ...`,
    helpContent: `<h4>Ajouter des vraies images</h4>
<p>Place les images dans <code>/public/images/</code> et mets à jour le tableau dans la page Réalisations.</p>
<p>Pour les images externes (Cloudinary, etc.), ajoute le domaine dans <code>next.config.mjs</code> :</p>
<pre><code>images: {
  remotePatterns: [
    { hostname: 'res.cloudinary.com' }
  ]
}</code></pre>
<h4>Optimiser les images</h4>
<p>Utilise le format WebP pour des images 30-50% plus légères :</p>
<pre><code>cwebp -q 80 image.jpg -o image.webp</code></pre>`,
  },
  {
    id: 4,
    title: 'Page "Réalisations"',
    objective: 'Créer la page Réalisations avec la galerie photo et des informations sur chaque projet.',
    actions: [
      'Définit les données des réalisations dans lib/constants.ts.',
      'Intègre le composant Gallery.tsx dans la page.',
      'Ajoute un en-tête avec titre et description.',
      'Ajoute des filtres par catégorie.',
    ],
    codeSnippets: [
      {
        filename: 'app/(site)/realisations/page.tsx',
        language: 'typescript',
        code: `import type { Metadata } from 'next'
import Gallery from '@/components/features/Gallery'

export const metadata: Metadata = {
  title: 'Réalisations',
  description:
    'Découvrez mes réalisations en menuiserie sur mesure : meubles, parquets, agencements. Devis gratuit.',
}

const realisations = [
  {
    src: '/images/realisation-1.jpg',
    alt: 'Bibliothèque sur mesure en chêne massif',
    width: 800,
    height: 600,
    category: 'Meubles',
  },
  {
    src: '/images/realisation-2.jpg',
    alt: 'Parquet point de Hongrie en noyer',
    width: 800,
    height: 600,
    category: 'Parquet',
  },
  {
    src: '/images/realisation-3.jpg',
    alt: 'Cuisine équipée sur mesure',
    width: 800,
    height: 600,
    category: 'Cuisine',
  },
  {
    src: '/images/realisation-4.jpg',
    alt: 'Placard dressing en bouleau',
    width: 800,
    height: 600,
    category: 'Meubles',
  },
  {
    src: '/images/realisation-5.jpg',
    alt: 'Escalier en bois flotté',
    width: 800,
    height: 600,
    category: 'Escalier',
  },
  {
    src: '/images/realisation-6.jpg',
    alt: 'Parquet massif en chêne blanchi',
    width: 800,
    height: 600,
    category: 'Parquet',
  },
]

const categories = ['Meubles', 'Parquet', 'Cuisine', 'Escalier']

export default function RealisationsPage() {
  return (
    <div className="pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--fg)' }}
          >
            Mes réalisations
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--fg-muted)' }}
          >
            Chaque pièce est unique et réalisée avec soin dans mon atelier.
            Parcourez mes dernières créations pour trouver l'inspiration pour
            votre projet.
          </p>
        </div>

        {/* Gallery */}
        <Gallery images={realisations} categories={categories} />
      </div>
    </div>
  )
}`,
      },
    ],
    expectedResult:
      'La page /realisations affiche la galerie avec les filtres par catégorie. Les photos s\'ouvrent en lightbox au clic.',
    folderStructure: `app/(site)/realisations/
└── page.tsx     ← Page réalisations + gallery`,
    helpContent: `<h4>Utiliser Unsplash pour les images de test</h4>
<p>Pour tester sans vraies photos client, utilise des URLs Unsplash :</p>
<pre><code>src: 'https://images.unsplash.com/photo-[ID]?w=800&q=80'</code></pre>
<p>Ajoute le domaine dans <code>next.config.mjs</code> :</p>
<pre><code>images: {
  remotePatterns: [{ hostname: 'images.unsplash.com' }]
}</code></pre>`,
  },
  {
    id: 5,
    title: 'Intégration Google Maps',
    objective: 'Afficher la localisation de l\'atelier sur une carte Google Maps interactive.',
    actions: [
      'Crée le composant GoogleMap.tsx avec un iframe embed.',
      'Génère l\'URL d\'intégration depuis Google Maps.',
      'Intègre la carte dans la page contact.',
      'Ajoute les informations de contact (adresse, horaires, téléphone).',
    ],
    codeSnippets: [
      {
        filename: 'components/features/GoogleMap.tsx',
        language: 'typescript',
        code: `interface GoogleMapProps {
  address: string
  embedUrl: string
  zoom?: number
}

export default function GoogleMap({ address, embedUrl }: GoogleMapProps) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: '1px solid var(--border)' }}
    >
      <iframe
        src={embedUrl}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={\`Localisation de l'atelier — \${address}\`}
      />
    </div>
  )
}

// Composant d'informations de contact
export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h3
          className="font-semibold text-lg mb-3"
          style={{ color: 'var(--fg)' }}
        >
          📍 Adresse de l'atelier
        </h3>
        <p style={{ color: 'var(--fg-muted)' }}>
          12 rue des Artisans
          <br />
          75011 Paris
        </p>
      </div>

      <div>
        <h3
          className="font-semibold text-lg mb-3"
          style={{ color: 'var(--fg)' }}
        >
          📞 Téléphone
        </h3>
        <a
          href="tel:+33612345678"
          className="hover:opacity-70 transition-opacity"
          style={{ color: 'var(--accent)' }}
        >
          06 12 34 56 78
        </a>
      </div>

      <div>
        <h3
          className="font-semibold text-lg mb-3"
          style={{ color: 'var(--fg)' }}
        >
          🕐 Horaires
        </h3>
        <ul style={{ color: 'var(--fg-muted)' }} className="space-y-1">
          <li className="flex justify-between">
            <span>Lundi – Vendredi</span>
            <span>8h00 – 18h00</span>
          </li>
          <li className="flex justify-between">
            <span>Samedi</span>
            <span>9h00 – 13h00</span>
          </li>
          <li className="flex justify-between">
            <span>Dimanche</span>
            <span className="text-red-400">Fermé</span>
          </li>
        </ul>
      </div>
    </div>
  )
}`,
      },
    ],
    expectedResult:
      'La carte Google Maps s\'affiche sur la page contact. L\'adresse, les horaires et le téléphone sont clairement présentés.',
    folderStructure: `components/features/
└── GoogleMap.tsx    ← Carte + infos contact

app/(site)/contact/
└── page.tsx         ← Page contact complète`,
    helpContent: `<h4>Générer l'URL d'intégration Google Maps</h4>
<ol>
  <li>Va sur <a href="https://maps.google.com" target="_blank">maps.google.com</a></li>
  <li>Cherche l'adresse de l'atelier</li>
  <li>Clique sur "Partager" → "Intégrer une carte"</li>
  <li>Copie l'URL dans l'attribut <code>src</code> de l'iframe</li>
</ol>
<p><strong>Important</strong> : L'iframe Google Maps fonctionne sans clé API. Si tu veux une carte plus interactive (markers personnalisés, etc.), tu auras besoin de Google Maps API.</p>`,
  },
  {
    id: 6,
    title: 'Page "Prestations" détaillée',
    objective: 'Créer une page de présentation des services avec descriptions, tarifs indicatifs et CTA.',
    actions: [
      'Crée un tableau de données pour les prestations dans lib/constants.ts.',
      'Crée des cartes pour chaque prestation avec description et tarifs.',
      'Ajoute une section FAQ pour les questions fréquentes.',
      'Intègre un CTA vers le formulaire de contact.',
    ],
    codeSnippets: [
      {
        filename: 'app/(site)/prestations/page.tsx',
        language: 'typescript',
        code: `import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Prestations',
  description:
    'Découvrez toutes mes prestations de menuiserie : meubles sur mesure, pose de parquet, agencement. Devis gratuit.',
}

const prestations = [
  {
    id: 'meubles',
    icon: '🪵',
    title: 'Meubles sur mesure',
    description:
      'Conception et fabrication de meubles uniques selon vos envies et contraintes d'espace. De la bibliothèque au dressing, chaque pièce est créée pour durer.',
    details: [
      'Bibliothèques et étagères',
      'Dressings et armoires',
      'Meubles TV sur mesure',
      'Tables et chaises',
      'Meubles de cuisine',
    ],
    price: 'À partir de 800€',
    delay: '4-8 semaines',
  },
  {
    id: 'parquet',
    icon: '🏠',
    title: 'Pose de parquet',
    description:
      'Installation de tous types de parquets avec finition parfaite. Massif, contrecollé ou stratifié, je m'adapte à votre budget et votre style.',
    details: [
      'Parquet massif (chêne, noyer, hêtre)',
      'Parquet contrecollé',
      'Stratifié haute résistance',
      'Point de Hongrie, chevrons',
      'Vitrification et huilage',
    ],
    price: 'À partir de 45€/m²',
    delay: '2-5 jours',
  },
  {
    id: 'renovation',
    icon: '🔨',
    title: 'Rénovation intérieure',
    description:
      'Rénovation complète de vos menuiseries : portes, fenêtres, escaliers. Je redonne vie à votre intérieur avec des matériaux de qualité.',
    details: [
      'Portes intérieures sur mesure',
      'Escaliers bois',
      'Moulures et habillages',
      'Parcloses et baguettes',
      'Aménagement de combles',
    ],
    price: 'Sur devis',
    delay: 'Variable selon projet',
  },
]

const faqs = [
  {
    q: 'Combien coûte un meuble sur mesure ?',
    a: 'Le prix dépend des matériaux, des dimensions et de la complexité. Comptez entre 800€ et 5000€ pour un meuble de salon. Un devis détaillé est toujours gratuit.',
  },
  {
    q: 'Quels sont les délais de fabrication ?',
    a: 'En général 4 à 8 semaines selon la complexité et mon planning. Je vous tiendrai informé à chaque étape de la fabrication.',
  },
  {
    q: 'Intervenez-vous en dehors de Paris ?',
    a: 'J'interviens dans toute l'Île-de-France pour la pose. La fabrication se fait dans mon atelier à Paris 11e.',
  },
]

export default function PrestationsPage() {
  return (
    <div className="pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--fg)' }}
          >
            Mes prestations
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--fg-muted)' }}
          >
            Artisan menuisier avec 30 ans d'expérience, je réalise tous vos
            projets bois avec passion et précision.
          </p>
        </div>

        {/* Prestations */}
        <div className="space-y-8 mb-20">
          {prestations.map((p) => (
            <div
              key={p.id}
              id={p.id}
              className="p-8 rounded-xl"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{p.icon}</span>
                    <h2
                      className="text-2xl font-bold"
                      style={{ color: 'var(--fg)' }}
                    >
                      {p.title}
                    </h2>
                  </div>
                  <p className="mb-6" style={{ color: 'var(--fg-muted)' }}>
                    {p.description}
                  </p>
                  <ul className="space-y-2">
                    {p.details.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm">
                        <span style={{ color: 'var(--accent)' }}>✓</span>
                        <span style={{ color: 'var(--fg)' }}>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:w-56 flex flex-col gap-4">
                  <div
                    className="p-4 rounded-xl text-center"
                    style={{
                      backgroundColor: 'var(--accent-subtle, #eef4fa)',
                    }}
                  >
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: 'var(--accent)' }}
                    >
                      {p.price}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                      ⏱ {p.delay}
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="block text-center py-3 rounded-xl text-white font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    Demander un devis
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2
            className="text-3xl font-bold text-center mb-8"
            style={{ color: 'var(--fg)' }}
          >
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
              >
                <summary className="font-semibold cursor-pointer" style={{ color: 'var(--fg)' }}>
                  {faq.q}
                </summary>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}`,
      },
    ],
    expectedResult:
      'La page /prestations affiche 3 cartes de prestations avec descriptions, détails et tarifs. Une FAQ déployable est disponible en bas de page.',
    folderStructure: `app/(site)/prestations/
└── page.tsx     ← Page prestations complète`,
    helpContent: `<h4>Ajouter une prestation</h4>
<p>Il suffit d'ajouter un objet dans le tableau <code>prestations</code> avec les mêmes propriétés : icon, title, description, details, price, delay.</p>`,
  },
  {
    id: 7,
    title: 'SEO local',
    objective: 'Optimiser le site pour les recherches géolocalisées avec Schema.org et les balises locales.',
    actions: [
      'Ajoute les métadonnées géographiques dans le layout.',
      'Crée un composant Schema.org LocalBusiness en JSON-LD.',
      'Optimise les titres de pages avec la ville.',
      'Ajoute les coordonnées GPS et l\'adresse structurée.',
    ],
    codeSnippets: [
      {
        filename: 'components/features/LocalBusinessSchema.tsx',
        language: 'typescript',
        code: `interface LocalBusinessSchemaProps {
  name: string
  description: string
  telephone: string
  email: string
  addressStreet: string
  addressCity: string
  addressPostal: string
  latitude: number
  longitude: number
  openingHours: string[]
  priceRange?: string
  url: string
}

export default function LocalBusinessSchema({
  name,
  description,
  telephone,
  email,
  addressStreet,
  addressCity,
  addressPostal,
  latitude,
  longitude,
  openingHours,
  priceRange = '€€',
  url,
}: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    description,
    url,
    telephone,
    email,
    priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: addressStreet,
      addressLocality: addressCity,
      postalCode: addressPostal,
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude,
      longitude,
    },
    openingHoursSpecification: openingHours,
    sameAs: [
      'https://www.facebook.com/votre-page',
      'https://www.instagram.com/votre-compte',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}`,
      },
    ],
    expectedResult:
      'Les rich snippets Schema.org sont actifs. Vérifie avec le Google Rich Results Test. Les pages apparaissent avec les informations de contact dans les résultats de recherche locale.',
    folderStructure: `components/features/
└── LocalBusinessSchema.tsx    ← JSON-LD Schema.org

app/(site)/layout.tsx          ← Schema intégré ici`,
    helpContent: `<h4>Tester le Schema.org</h4>
<ul>
  <li>Utilise le <a href="https://search.google.com/test/rich-results" target="_blank">Google Rich Results Test</a></li>
  <li>Ou le <a href="https://validator.schema.org/" target="_blank">Schema.org Validator</a></li>
</ul>
<h4>Optimiser les titres pour le SEO local</h4>
<p>Inclure la ville dans tous les titres : "Menuisier à Paris 11 — Jean Martin"</p>`,
  },
  {
    id: 8,
    title: 'Performance et déploiement',
    objective: 'Optimiser les images, le chargement et déployer le site sur Vercel avec un score Lighthouse > 90.',
    actions: [
      'Configure next/image pour toutes les images.',
      'Ajoute la configuration d\'optimisation dans next.config.mjs.',
      'Exécute un audit Lighthouse en local.',
      'Déploie sur Vercel et configure le domaine.',
    ],
    commands: [
      'npm run build',
      'npm run start',
      '# Ouvre Chrome → DevTools → Lighthouse → Generate report',
    ],
    codeSnippets: [
      {
        filename: 'next.config.mjs',
        language: 'javascript',
        code: `/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimisation des images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 jours
  },

  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },

  // Compression
  compress: true,

  // Strict mode React
  reactStrictMode: true,
}

export default nextConfig`,
      },
    ],
    expectedResult:
      'npm run build complète sans erreur. Le rapport Lighthouse affiche Performance > 90, Accessibility > 95, Best Practices > 90, SEO > 95.',
    folderStructure: `Configuration:
├── next.config.mjs    ← Optimisations images + headers
└── .env.local         ← Variables d'environnement locales

Déploiement Vercel:
├── vercel.json        ← (optionnel) Config Vercel
└── .vercelignore      ← (optionnel) Fichiers à ignorer`,
    helpContent: `<h4>Améliorer le score Lighthouse</h4>
<ul>
  <li><strong>Performance</strong> : Utiliser <code>next/image</code> avec <code>priority</code> sur les images above-the-fold</li>
  <li><strong>Accessibility</strong> : Ajouter des <code>alt</code> sur toutes les images, des labels sur les inputs</li>
  <li><strong>SEO</strong> : Métadonnées complètes sur chaque page</li>
  <li><strong>Best Practices</strong> : HTTPS, pas de console.log en prod</li>
</ul>`,
  },
]

// ============================================================
// PACK BUSINESS
// ============================================================

const BUSINESS_STEPS: Step[] = [
  {
    id: 1,
    title: 'Architecture complète',
    objective: 'Créer une structure évolutive pour un site avec 10+ pages, un blog et des fonctionnalités avancées.',
    actions: [
      'Crée le projet Next.js avec toutes les dépendances nécessaires.',
      'Mets en place la structure complète avec blog et pages multiples.',
      'Configure les dossiers pour les articles MDX.',
      'Initialise le système de types TypeScript global.',
    ],
    commands: [
      'npx create-next-app@latest mon-site-artisan --typescript --tailwind --app --eslint',
      'cd mon-site-artisan',
      'npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter reading-time remark-gfm rehype-highlight',
      'mkdir -p app/\\(site\\)/{prestations,realisations,a-propos,contact,temoignages,faq}',
      'mkdir -p app/blog/\\[slug\\]',
      'mkdir -p posts',
      'mkdir -p components/{ui,features,layout,blog}',
      'mkdir -p lib public/images',
    ],
    expectedResult:
      'Projet créé avec toutes les dépendances. Structure pour 10+ pages et blog MDX prête.',
    folderStructure: `mon-site-artisan/
├── app/
│   ├── (site)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── prestations/page.tsx
│   │   ├── realisations/page.tsx
│   │   ├── a-propos/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── temoignages/page.tsx
│   │   └── faq/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── globals.css
│   └── layout.tsx
├── posts/              ← Articles MDX
│   ├── comment-choisir-son-parquet.mdx
│   └── renovation-cuisine-paris.mdx
├── components/
│   ├── ui/
│   ├── features/
│   ├── layout/
│   └── blog/           ← Composants spécifiques au blog
└── lib/`,
    helpContent: `<h4>Pourquoi MDX ?</h4>
<p>MDX (Markdown + JSX) permet d'écrire des articles de blog avec du Markdown enrichi de composants React. C'est parfait pour un blog artisan avec des galeries photo intégrées dans les articles.</p>`,
  },
  {
    id: 2,
    title: 'Blog avec MDX',
    objective: 'Mettre en place un système de blog dynamique avec des articles en format MDX.',
    actions: [
      'Configure next.config.mjs pour supporter les fichiers MDX.',
      'Crée les utilitaires de lecture des articles dans lib/blog.ts.',
      'Crée la page liste des articles.',
      'Crée 2-3 articles d\'exemple au format MDX.',
    ],
    codeSnippets: [
      {
        filename: 'next.config.mjs',
        language: 'javascript',
        code: `import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default withMDX(nextConfig)`,
      },
      {
        filename: 'lib/blog.ts',
        language: 'typescript',
        code: `import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const POSTS_DIRECTORY = path.join(process.cwd(), 'posts')

export interface PostFrontmatter {
  title: string
  description: string
  date: string
  image?: string
  tags?: string[]
  author?: string
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
  readingTime: string
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return []
  }

  const fileNames = fs.readdirSync(POSTS_DIRECTORY)
  const posts = fileNames
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\\.mdx?$/, '')
      const filePath = path.join(POSTS_DIRECTORY, fileName)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      const stats = readingTime(content)

      return {
        slug,
        frontmatter: data as PostFrontmatter,
        content,
        readingTime: stats.text,
      }
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )

  return posts
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIRECTORY, \`\${slug}.mdx\`)
  if (!fs.existsSync(filePath)) return null

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const stats = readingTime(content)

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
    readingTime: stats.text,
  }
}`,
      },
      {
        filename: 'posts/comment-choisir-son-parquet.mdx',
        language: 'markdown',
        code: `---
title: "Comment choisir son parquet : guide complet 2024"
description: "Massif, contrecollé ou stratifié ? Découvrez les différences et nos conseils pour choisir le parquet idéal selon votre budget et vos besoins."
date: "2024-01-15"
image: "/images/blog/parquet-guide.jpg"
tags: ["parquet", "conseils", "rénovation"]
author: "Jean Martin"
---

# Comment choisir son parquet : guide complet

Le choix d'un parquet est une décision importante qui durera des décennies.
Voici tout ce que vous devez savoir pour faire le bon choix.

## Les 3 types de parquet

### 1. Parquet massif

Le parquet massif est fait d'une seule pièce de bois. C'est la solution
la plus noble mais aussi la plus exigeante.

**Avantages :**
- Peut être rénové plusieurs fois
- Dure 50+ ans avec un bon entretien
- Authentique et chaleureux

**Inconvénients :**
- Sensible à l'humidité
- Prix élevé (50-150€/m²)

### 2. Parquet contrecollé

Une couche de bois noble sur un support technique. Le meilleur compromis.

**Prix :** 30-80€/m²

### 3. Stratifié

Impression de bois sur un support HDF. Solution économique.

**Prix :** 10-30€/m²

## Notre recommandation

Pour la plupart des projets, nous recommandons le parquet contrecollé en
chêne. Excellent rapport qualité/prix et compatible avec le plancher chauffant.

**Vous avez un projet ?** [Contactez-nous](/contact) pour un devis gratuit.`,
      },
    ],
    expectedResult:
      'Les articles MDX sont lus depuis le dossier /posts. La page /blog liste les articles avec titre, date et temps de lecture.',
    folderStructure: `posts/
├── comment-choisir-son-parquet.mdx
├── renovation-cuisine-paris.mdx
└── seo-artisan.mdx

lib/
└── blog.ts       ← Lecture des fichiers MDX`,
    helpContent: `<h4>Formats des frontmatter</h4>
<p>Le frontmatter (entre les <code>---</code>) accepte ces champs :</p>
<ul>
  <li><code>title</code> (requis) : Titre de l'article</li>
  <li><code>description</code> (requis) : Meta description</li>
  <li><code>date</code> (requis) : Format YYYY-MM-DD</li>
  <li><code>image</code> : URL image de couverture</li>
  <li><code>tags</code> : Tableau de tags</li>
</ul>`,
  },
  {
    id: 3,
    title: 'Page d\'article dynamique',
    objective: 'Créer le template d\'article de blog avec rendu MDX et toutes les métadonnées SEO.',
    actions: [
      'Crée app/blog/[slug]/page.tsx pour les pages d\'articles.',
      'Génère les métadonnées dynamiquement depuis le frontmatter.',
      'Rends le contenu MDX avec les styles appropriés.',
      'Ajoute les articles suggérés en bas de page.',
    ],
    codeSnippets: [
      {
        filename: 'app/blog/[slug]/page.tsx',
        language: 'typescript',
        code: `import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

// Génère les routes statiques au build
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

// Métadonnées dynamiques
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: post.frontmatter.image ? [post.frontmatter.image] : [],
      type: 'article',
      publishedTime: post.frontmatter.date,
      authors: post.frontmatter.author ? [post.frontmatter.author] : [],
    },
  }
}

// Styles pour le contenu MDX
const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-3xl font-bold mt-8 mb-4"
      style={{ color: 'var(--fg)' }}
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl font-bold mt-8 mb-3"
      style={{ color: 'var(--fg)' }}
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xl font-semibold mt-6 mb-2"
      style={{ color: 'var(--fg)' }}
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="mb-4 leading-relaxed"
      style={{ color: 'var(--fg-muted)' }}
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 pl-6 space-y-2 list-disc" style={{ color: 'var(--fg-muted)' }} {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong style={{ color: 'var(--fg)', fontWeight: 600 }} {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="underline hover:opacity-70 transition-opacity"
      style={{ color: 'var(--accent)' }}
      {...props}
    />
  ),
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const formattedDate = new Date(post.frontmatter.date).toLocaleDateString(
    'fr-FR',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  return (
    <div className="pt-28 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm" style={{ color: 'var(--fg-muted)' }}>
          <Link href="/" className="hover:opacity-70">Accueil</Link>
          {' › '}
          <Link href="/blog" className="hover:opacity-70">Blog</Link>
          {' › '}
          <span style={{ color: 'var(--fg)' }}>{post.frontmatter.title}</span>
        </nav>

        {/* Article header */}
        <header className="mb-12">
          {post.frontmatter.tags && (
            <div className="flex gap-2 mb-4">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: 'var(--accent-subtle, #eef4fa)',
                    color: 'var(--accent)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: 'var(--fg)' }}
          >
            {post.frontmatter.title}
          </h1>

          <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--fg-muted)' }}>
            {post.frontmatter.author && <span>Par {post.frontmatter.author}</span>}
            <span>•</span>
            <time>{formattedDate}</time>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        {/* MDX Content */}
        <article>
          <MDXRemote source={post.content} components={mdxComponents} />
        </article>

        {/* CTA */}
        <div
          className="mt-16 p-8 rounded-xl text-center"
          style={{
            backgroundColor: 'var(--accent-subtle, #eef4fa)',
            border: '1px solid var(--border)',
          }}
        >
          <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--fg)' }}>
            Un projet en tête ?
          </h3>
          <p className="mb-4" style={{ color: 'var(--fg-muted)' }}>
            Contactez-moi pour discuter de votre projet et obtenir un devis gratuit.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Demander un devis
          </Link>
        </div>
      </div>
    </div>
  )
}`,
      },
    ],
    expectedResult:
      'Les URLs /blog/comment-choisir-son-parquet fonctionnent. L\'article s\'affiche avec mise en forme. Les métadonnées SEO sont générées dynamiquement.',
    folderStructure: `app/blog/
├── page.tsx          ← Liste des articles
└── [slug]/
    └── page.tsx      ← Article individuel`,
    helpContent: `<h4>next-mdx-remote vs @next/mdx</h4>
<p><code>next-mdx-remote</code> est nécessaire pour lire des fichiers MDX depuis un dossier externe (comme /posts) avec le App Router. C'est différent de <code>@next/mdx</code> qui ne gère que les fichiers dans /app.</p>
<h4>Liens utiles</h4>
<ul>
  <li><a href="https://github.com/hashicorp/next-mdx-remote" target="_blank">next-mdx-remote</a></li>
  <li><a href="https://mdxjs.com" target="_blank">MDX documentation</a></li>
</ul>`,
  },
  {
    id: 4,
    title: 'SEO renforcé',
    objective: 'Générer un sitemap dynamique incluant toutes les pages et articles, avec des balises Open Graph optimales.',
    actions: [
      'Crée app/sitemap.ts pour lister toutes les pages statiques et les articles.',
      'Ajoute les balises Open Graph avec image sur chaque page.',
      'Configure le canonical URL sur chaque page.',
      'Ajoute les métadonnées Twitter Card.',
    ],
    codeSnippets: [
      {
        filename: 'app/sitemap.ts',
        language: 'typescript',
        code: `import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const BASE_URL = 'https://www.votre-artisan.fr'

export default function sitemap(): MetadataRoute.Sitemap {
  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: \`\${BASE_URL}/prestations\`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: \`\${BASE_URL}/realisations\`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: \`\${BASE_URL}/a-propos\`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: \`\${BASE_URL}/contact\`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: \`\${BASE_URL}/blog\`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Articles de blog (dynamiques)
  const posts = getAllPosts()
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: \`\${BASE_URL}/blog/\${post.slug}\`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}`,
      },
    ],
    expectedResult:
      'Le sitemap XML sur /sitemap.xml liste toutes les pages ET tous les articles de blog. Les nouvelles pages et articles y apparaissent automatiquement.',
    folderStructure: `app/
├── sitemap.ts    ← Sitemap dynamique
├── robots.ts     ← Robots.txt
└── (site)/
    └── **/page.tsx   ← Métadonnées sur chaque page`,
    helpContent: `<h4>Soumettre le sitemap à Google</h4>
<ol>
  <li>Va sur <a href="https://search.google.com/search-console" target="_blank">Google Search Console</a></li>
  <li>Ajoute la propriété de ton site</li>
  <li>Dans "Sitemaps", saisis l'URL : https://ton-site.fr/sitemap.xml</li>
  <li>Clique "Envoyer"</li>
</ol>`,
  },
  {
    id: 5,
    title: 'Optimisation des performances',
    objective: 'Optimiser le chargement avec lazy loading, code splitting et optimisation des images pour un score Lighthouse > 90.',
    actions: [
      'Ajoute dynamic() pour les composants lourds (galerie, carte).',
      'Configure les headers de cache dans next.config.mjs.',
      'Optimise toutes les images avec next/image et les bons formats.',
      'Exécute un audit et corrige les problèmes identifiés.',
    ],
    codeSnippets: [
      {
        filename: 'app/(site)/realisations/page.tsx (avec lazy loading)',
        language: 'typescript',
        code: `import dynamic from 'next/dynamic'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Réalisations',
  description: 'Découvrez mes réalisations en menuiserie.',
}

// Chargement différé de la galerie (lourde à cause du JavaScript)
const Gallery = dynamic(() => import('@/components/features/Gallery'), {
  loading: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-xl animate-pulse"
          style={{ backgroundColor: 'var(--border)' }}
        />
      ))}
    </div>
  ),
  ssr: false, // La lightbox utilise des APIs browser
})

// ... reste du composant`,
      },
      {
        filename: 'next.config.mjs (avec cache)',
        language: 'javascript',
        code: `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 jours
  },

  async headers() {
    return [
      // Cache des assets statiques (images, fonts, etc.)
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Headers de sécurité
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ]
  },

  compress: true,
  reactStrictMode: true,
}

export default nextConfig`,
      },
    ],
    expectedResult:
      'Score Lighthouse : Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO = 100. Temps de chargement < 1.5s sur une connexion 4G.',
    folderStructure: `Checklist performances:
├── ✅ next/image sur toutes les images
├── ✅ dynamic() sur les composants lourds
├── ✅ Cache-Control sur les assets
├── ✅ Compression gzip/brotli (Vercel)
└── ✅ Core Web Vitals dans les verts`,
    helpContent: `<h4>Outils de mesure</h4>
<ul>
  <li><a href="https://pagespeed.web.dev" target="_blank">PageSpeed Insights</a> (Google)</li>
  <li><a href="https://web.dev/measure/" target="_blank">web.dev/measure</a></li>
  <li>Chrome DevTools → Lighthouse</li>
</ul>
<h4>Les quick wins</h4>
<ul>
  <li>Ajouter <code>priority</code> à l'image hero (above-the-fold)</li>
  <li>Utiliser <code>loading="lazy"</code> sur les images hors viewport</li>
  <li>Minifier et compresser les images (< 200ko par image)</li>
</ul>`,
  },
  {
    id: 6,
    title: 'Design sur mesure et animations',
    objective: 'Ajouter des animations fluides et des transitions soignées pour un site professionnel et mémorable.',
    actions: [
      'Ajoute framer-motion pour les animations d\'entrée.',
      'Crée des transitions de page fluides.',
      'Anime les éléments au scroll avec IntersectionObserver.',
      'Ajoute des micro-interactions sur les boutons et cartes.',
    ],
    commands: [
      'npm install framer-motion',
    ],
    codeSnippets: [
      {
        filename: 'components/ui/AnimateOnScroll.tsx',
        language: 'typescript',
        code: `'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface AnimateOnScrollProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export default function AnimateOnScroll({
  children,
  className,
  delay = 0,
  direction = 'up',
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}`,
      },
    ],
    expectedResult:
      'Les sections apparaissent progressivement au scroll avec une animation fluide. Les cartes ont un effet de survol soigné. Les transitions entre pages sont douces.',
    folderStructure: `components/ui/
├── AnimateOnScroll.tsx    ← Animation au scroll
└── ...

Utilisation :
<AnimateOnScroll delay={0.2}>
  <MonComposant />
</AnimateOnScroll>`,
    helpContent: `<h4>Performances des animations</h4>
<p>Les animations Framer Motion utilisent le GPU (transform et opacity). Elles n'impactent pas les Core Web Vitals.</p>
<h4>Respecter prefers-reduced-motion</h4>
<pre><code>const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches</code></pre>`,
  },
  {
    id: 7,
    title: 'Stratégie de contenu',
    objective: 'Rédiger et intégrer 5 articles de blog optimisés SEO pour attirer du trafic organique.',
    actions: [
      'Crée 5 articles MDX dans le dossier /posts.',
      'Optimise chaque article avec un titre H1, meta description, et balises structurées.',
      'Ajoute des liens internes entre les articles.',
      'Crée une page /blog avec la liste des articles.',
    ],
    codeSnippets: [
      {
        filename: 'posts/choisir-menuisier-paris.mdx',
        language: 'markdown',
        code: `---
title: "Comment choisir son menuisier à Paris : 7 critères essentiels"
description: "Vous cherchez un menuisier artisan à Paris ? Voici les 7 critères pour trouver un professionnel de confiance pour votre projet bois."
date: "2024-02-01"
tags: ["conseils", "menuisier paris", "artisan"]
author: "Jean Martin"
---

# Comment choisir son menuisier à Paris : 7 critères essentiels

Trouver un bon menuisier à Paris peut sembler difficile face aux nombreuses
options. Voici mes conseils en tant qu'artisan avec 30 ans d'expérience.

## 1. Vérifiez les qualifications

Un menuisier qualifié doit posséder le CAP Menuisier ou le BTM.
Demandez toujours à voir les diplômes ou le numéro SIRET.

## 2. Demandez des références

Un artisan sérieux peut vous montrer des photos de réalisations passées
et vous mettre en contact avec d'anciens clients.

## 3. Obtenez plusieurs devis

Comparez au moins 3 devis. Un prix très bas est souvent un signal d'alarme.
Un devis sérieux détaille le matériau, la main d'œuvre et les délais.

## 4. Vérifiez l'assurance

L'artisan doit posséder une assurance décennale et une RC Pro.
Demandez l'attestation avant de signer.

## 5. Lisez les avis clients

Google, Pages Jaunes ou Houzz sont de bonnes sources d'avis vérifiés.

## 6. Visitez l'atelier

Un atelier bien organisé reflète le sérieux de l'artisan.

## 7. Signez un contrat détaillé

Le contrat doit mentionner : devis accepté, délais, conditions de paiement,
garanties.

---

**Vous cherchez un menuisier de confiance à Paris ?** Je suis disponible pour
vous rencontrer et discuter de votre projet. [Contactez-moi →](/contact)`,
      },
    ],
    expectedResult:
      '5 articles apparaissent sur la page /blog. Chaque article a sa propre URL, ses métadonnées SEO et un temps de lecture estimé.',
    folderStructure: `posts/
├── comment-choisir-son-parquet.mdx
├── choisir-menuisier-paris.mdx
├── renovation-cuisine-bois.mdx
├── entretien-parquet-massif.mdx
└── meuble-sur-mesure-vs-ikea.mdx`,
    helpContent: `<h4>Bonnes pratiques SEO pour les articles</h4>
<ul>
  <li>Un seul H1 par article (le titre principal)</li>
  <li>Mot-clé cible dans le titre et la meta description</li>
  <li>Articles de 800-1500 mots minimum</li>
  <li>1 lien interne vers le formulaire de contact</li>
  <li>Publier régulièrement (1 article/mois minimum)</li>
</ul>`,
  },
  {
    id: 8,
    title: 'Monitoring et déploiement final',
    objective: 'Configurer les analytics, les alertes d\'erreur et déployer le site en production avec toutes les vérifications.',
    actions: [
      'Configure Vercel Analytics pour le suivi du trafic.',
      'Ajoute Sentry pour la surveillance des erreurs.',
      'Crée un checklist de validation avant mise en ligne.',
      'Configure les alertes email pour les nouvelles demandes de contact.',
    ],
    commands: [
      'npm install @vercel/analytics @sentry/nextjs',
      'npx @sentry/wizard@latest -i nextjs',
    ],
    codeSnippets: [
      {
        filename: 'app/layout.tsx (avec Analytics)',
        language: 'typescript',
        code: `import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}`,
      },
    ],
    expectedResult:
      'Le tableau de bord Vercel affiche les visites en temps réel. Sentry capture les erreurs JavaScript. Les emails de contact arrivent dans la boîte mail du client.',
    folderStructure: `Checklist finale avant livraison:
├── ✅ npm run build → 0 erreurs TypeScript
├── ✅ Lighthouse Score > 90 sur toutes les pages
├── ✅ Formulaire de contact → email reçu
├── ✅ Responsive testé sur iPhone + Android
├── ✅ Domaine personnalisé configuré
├── ✅ HTTPS actif (cadenas vert)
├── ✅ Sitemap soumis à Google Search Console
└── ✅ Analytics Vercel actif`,
    helpContent: `<h4>Checklist SEO post-lancement</h4>
<ol>
  <li>Créer un compte Google Search Console</li>
  <li>Vérifier la propriété du site</li>
  <li>Soumettre le sitemap</li>
  <li>Vérifier le crawl (pas d'erreurs 404)</li>
  <li>Créer/optimiser la fiche Google Business Profile</li>
</ol>`,
  },
]

// ============================================================
// EXPORT DES PACKS
// ============================================================

export const PACKS: Pack[] = [
  {
    slug: 'starter',
    name: 'Pack Starter',
    price: 790,
    duration: '10-12h',
    description:
      'Le site vitrine essentiel pour un artisan qui débute en ligne. Simple, efficace et professionnel.',
    color: '#16a34a',
    features: [
      'Page d\'accueil avec hero section',
      'Présentation des services',
      'Formulaire de contact avec Zod',
      'SEO de base (sitemap, robots.txt)',
      'Responsive mobile-first',
      'Déploiement Vercel + domaine',
    ],
    steps: STARTER_STEPS,
    checklistItems: [
      'Page d\'accueil fonctionnelle avec hero et services',
      'Formulaire de contact envoie un email',
      'Sitemap et robots.txt accessibles',
      'Site responsive sur mobile',
      'HTTPS actif sur le domaine',
      'Score Lighthouse > 80',
      'Métadonnées SEO complètes',
      'Aucune erreur TypeScript ou console',
    ],
  },
  {
    slug: 'artisan',
    name: 'Pack Artisan',
    price: 1390,
    duration: '18-25h',
    description:
      'Le site complet avec galerie, carte et plusieurs pages pour mettre en valeur votre savoir-faire.',
    color: '#2c5f8a',
    features: [
      'Tout le Pack Starter',
      'Galerie photo avec lightbox',
      'Page Réalisations',
      'Page Prestations détaillée',
      'Intégration Google Maps',
      'Navigation avancée avec sous-menus',
      'SEO local (Schema.org)',
      'Score Lighthouse > 90',
    ],
    steps: ARTISAN_STEPS,
    checklistItems: [
      'Navigation avec sous-menus fonctionnelle',
      'Galerie photo avec lightbox (Échap, flèches)',
      'Filtres par catégorie dans la galerie',
      'Page Réalisations avec 6+ photos',
      'Page Prestations avec tarifs et FAQ',
      'Carte Google Maps intégrée',
      'Schema.org LocalBusiness valide',
      'Score Lighthouse > 90',
      'Site responsive sur mobile et tablette',
    ],
  },
  {
    slug: 'business',
    name: 'Pack Business',
    price: 2190,
    duration: '30-40h',
    description:
      'Le site premium avec blog MDX, animations et monitoring pour dominer les résultats de recherche.',
    color: '#7c3aed',
    features: [
      'Tout le Pack Artisan',
      'Blog MDX avec articles dynamiques',
      'Animations Framer Motion',
      'Sitemap dynamique (pages + articles)',
      'Analytics Vercel intégré',
      'Monitoring des erreurs (Sentry)',
      'Score Lighthouse > 95',
      '5 articles SEO rédigés',
    ],
    steps: BUSINESS_STEPS,
    checklistItems: [
      'Blog fonctionnel avec 5+ articles',
      'Chaque article a sa propre URL',
      'Sitemap dynamique inclut les articles',
      'Animations Framer Motion fluides',
      'Vercel Analytics actif',
      'Sentry configuré (0 erreurs)',
      'Score Lighthouse > 95 sur toutes les pages',
      'Google Search Console configuré',
      'Formulaire de contact → email reçu',
      'Google Business Profile créé',
    ],
  },
]
