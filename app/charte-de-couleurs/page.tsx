import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DESCODES — Charte de Couleurs',
}

const swatches = {
  accents: [
    { bg: '#00f2ff',                    hex: '#00F2FF',              light: false, name: 'Cyan Neon',       token: '--accent (option Bleu)',      use: 'Grille fond · Accent principal' },
    { bg: '#f97316',                    hex: '#F97316',              light: false, name: 'Orange Vif',      token: '--accent2',                  use: 'Logo · Accent secondaire · CTA' },
    { bg: 'oklch(74% 0.17 65)',         hex: 'oklch(74% .17 65)',    light: true,  name: 'Ambre Chaud',     token: '--accent (option Ambre)',     use: 'Option Tweaks · Boutons primaires' },
    { bg: 'oklch(72% 0.18 155)',        hex: '#2ECC8F',              light: false, name: 'Émeraude',        token: '--accent (option Émeraude)', use: 'Option Tweaks · Validation · Succès' },
    { bg: 'oklch(68% 0.20 250)',        hex: 'oklch(68% .20 250)',   light: true,  name: 'Bleu Électrique', token: '--accent (option Bleu)',      use: 'Option Tweaks · Tech · IA' },
  ],
  dark: [
    { bg: '#020617', border: true,      hex: '#020617', light: true,  name: 'Navy Profond',   token: '--bg',           use: 'Fond principal · Corps de page' },
    { bg: '#080f1e',                    hex: '#080F1E', light: true,  name: 'Navy Surélevé',  token: '--bg-elevated',  use: 'Sections alternées' },
    { bg: '#0d1425',                    hex: '#0D1425', light: true,  name: 'Surface Card',   token: '--surface',      use: 'Cards · Formulaires · Panels' },
    { bg: 'rgba(2,6,23,0.9)', border2: true, hex: 'rgba(2,6,23,0.9)', light: true, name: 'Nav Blur', token: '--bg-nav', use: 'Navbar avec backdrop-filter' },
  ],
  light: [
    { bg: '#F6F5F2',   hex: '#F6F5F2',  light: false, name: 'Crème Clair',     token: '--bg (light)',           use: 'Fond principal mode clair' },
    { bg: '#EEECEA',   hex: '#EEECEA',  light: false, name: 'Crème Surélevé',  token: '--bg-elevated (light)',  use: 'Sections alternées mode clair' },
    { bg: '#FFFFFF',   hex: '#FFFFFF',  light: false, name: 'Blanc Pur',        token: '--surface (light)',      use: 'Cards · Formulaires' },
  ],
  text: [
    { bg: '#F2F0EB',                        hex: '#F2F0EB',                  light: false, name: 'Blanc Cassé',     token: '--text-primary',          use: 'Titres · Corps principal' },
    { bg: 'rgba(242,240,235,0.55)',          hex: 'rgba(242,240,235,.55)',    light: true,  name: 'Gris Secondaire', token: '--text-secondary',        use: 'Descriptions · Sous-titres' },
    { bg: 'rgba(242,240,235,0.28)',          hex: 'rgba(242,240,235,.28)',    light: true,  name: 'Gris Muet',       token: '--text-muted',            use: 'Labels · Métadonnées · Dates' },
    { bg: '#0F0F0D',                         hex: '#0F0F0D',                  light: true,  name: 'Noir Texte',      token: '--text-primary (light)',  use: 'Texte sur fond clair' },
  ],
  grid: [
    { bg: 'rgba(0,242,255,0.05)',  dashed: true, hex: 'rgba(0,242,255,.05)', light: true,  name: 'Grille Neon',   token: 'body::before / z-index:0',  use: 'Quadrillage 48×48px fond' },
    { bg: 'rgba(0,242,255,0.10)',              hex: 'rgba(0,242,255,.10)', light: true,  name: 'Accent Dim',    token: '--accent-dim',              use: 'Tags · Badges · Fond actif' },
    { bg: 'rgba(249,115,22,0.12)',             hex: 'rgba(249,115,22,.12)', light: true, name: 'Orange Dim',    token: '--accent2-dim',             use: 'Tags orange · Étapes alternées' },
    { bg: 'rgba(255,255,255,0.07)',            hex: 'rgba(255,255,255,.07)', light: true, name: 'Border Subtle', token: '--border',                 use: 'Séparateurs · Contours cards' },
  ],
}

function Swatch({ bg, hex, light, name, token, use, border, border2, dashed }: {
  bg: string; hex: string; light: boolean; name: string; token: string; use: string;
  border?: boolean; border2?: boolean; dashed?: boolean;
}) {
  return (
    <div style={{
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.07)',
    }}>
      <div style={{
        height: '96px',
        background: bg,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '10px 14px',
        borderBottom: border ? '1px solid rgba(255,255,255,0.1)' : undefined,
        border: border2 ? '1px solid rgba(255,255,255,0.08)' : undefined,
        outline: dashed ? '1px dashed rgba(0,242,255,0.3)' : undefined,
        outlineOffset: '-4px',
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.72rem',
          color: light ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)',
          background: light ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.25)',
          padding: '2px 8px',
          borderRadius: '4px',
          backdropFilter: 'blur(4px)',
        }}>{hex}</span>
      </div>
      <div style={{ background: 'rgba(13,20,37,0.95)', padding: '14px 16px' }}>
        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#F2F0EB', marginBottom: '4px' }}>{name}</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: 'rgba(242,240,235,0.4)', marginBottom: '4px' }}>{token}</div>
        <div style={{ fontSize: '0.75rem', color: 'rgba(242,240,235,0.5)' }}>{use}</div>
      </div>
    </div>
  )
}

export default function CharteDeCouleursPage() {
  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&family=Ubuntu:wght@400;700;800&display=swap');
      `}</style>

      <div style={{
        background: '#020617',
        color: '#F2F0EB',
        fontFamily: "'DM Sans', sans-serif",
        WebkitFontSmoothing: 'antialiased',
        minHeight: '100vh',
        padding: '60px 48px',
        position: 'relative',
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage:
            'linear-gradient(rgba(0,242,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,255,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.5rem',
            letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '4px',
            marginBottom: '8px',
          }}>
            <span style={{ color: '#f97316', fontFamily: "'JetBrains Mono', monospace" }}>&lt;/&gt;</span>
            {' '}DES<span style={{ color: '#00f2ff' }}>CODES</span>
          </div>
          <p style={{
            fontSize: '0.9rem', color: 'rgba(242,240,235,0.45)',
            fontFamily: "'JetBrains Mono', monospace", marginBottom: '56px',
          }}>
            // charte-de-couleurs.v1 — Design System 2025
          </p>

          {/* Section helper */}
          {([
            { id: '01', label: "Couleurs d'accent", items: swatches.accents },
            { id: '02', label: 'Fonds (Dark Mode)',  items: swatches.dark   },
            { id: '03', label: 'Fonds (Light Mode)', items: swatches.light  },
            { id: '04', label: 'Textes',             items: swatches.text   },
          ] as const).map(sec => (
            <div key={sec.id}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem',
                color: 'rgba(0,242,255,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase',
                marginBottom: '20px', marginTop: '48px',
              }}>
                // {sec.id} — {sec.label}
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '8px',
              }}>
                {sec.items.map((s: typeof swatches.accents[0] & { border?: boolean; border2?: boolean; dashed?: boolean }) => (
                  <Swatch key={s.token} {...s} />
                ))}
              </div>
            </div>
          ))}

          {/* Divider */}
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', margin: '48px 0' }} />

          {/* Typographie */}
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem',
            color: 'rgba(0,242,255,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            // 05 — Typographie
          </p>

          {[
            {
              sample: (
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '2.2rem', letterSpacing: '-0.02em', color: '#F2F0EB', lineHeight: 1.1 }}>
                  DES<span style={{ color: '#00f2ff' }}>&lt;/&gt;</span>CODES
                </div>
              ),
              meta: ['Police — Syne', 'Poids — 800', 'Usage — Logo uniquement'],
            },
            {
              sample: (
                <div style={{ fontFamily: "'Ubuntu', sans-serif", fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.02em', color: '#F2F0EB', lineHeight: 1.1 }}>
                  Création de Sites Web &<br /><span style={{ color: '#00f2ff' }}>Solutions Numériques.</span>
                </div>
              ),
              meta: ['Police — Ubuntu', 'Poids — 700 / 800', 'Usage — H1, H2, H3, H4'],
            },
            {
              sample: (
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '1rem', color: 'rgba(242,240,235,0.6)', lineHeight: 1.7, maxWidth: '500px' }}>
                  DESCODES propulse votre business avec des sites web percutants, des apps sur mesure et des solutions IA qui travaillent pendant que vous dormez.
                </div>
              ),
              meta: ['Police — DM Sans', 'Poids — 400 / 500 / 600', 'Usage — Corps de texte'],
            },
            {
              sample: (
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: '0.85rem', color: '#00f2ff', lineHeight: 1.8 }}>
                  {'// 01 — Services'}&nbsp;&nbsp;{'const client = "performant";'}&nbsp;&nbsp;--accent: #00F2FF
                </div>
              ),
              meta: ['Police — JetBrains Mono', 'Poids — 400 / 700', 'Usage — Labels · Code · Tokens'],
            },
          ].map((row, i) => (
            <div key={i} style={{
              background: 'rgba(13,20,37,0.80)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px',
              padding: '24px 28px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }}>
              <div style={{ flex: 1 }}>{row.sample}</div>
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                {row.meta.map(m => (
                  <p key={m} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'rgba(242,240,235,0.4)', lineHeight: 1.8 }}>{m}</p>
                ))}
              </div>
            </div>
          ))}

          {/* Divider */}
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', margin: '48px 0' }} />

          {/* Boutons */}
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem',
            color: 'rgba(0,242,255,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            // 06 — Boutons & UI
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px' }}>
            <button style={{ padding: '12px 24px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.9rem', background: '#f97316', color: '#000' }}>
              Démarrer un projet
            </button>
            <button style={{ padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.9rem', background: 'rgba(0,242,255,0.08)', color: '#00f2ff', border: '1px solid rgba(0,242,255,0.5)' }}>
              Voir le portfolio
            </button>
            <button style={{ padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.9rem', background: 'transparent', color: '#00f2ff', border: '1px solid rgba(0,242,255,0.3)' }}>
              Voir tous les tarifs →
            </button>
          </div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'rgba(242,240,235,0.35)', marginTop: '12px' }}>
            Primary: bg #F97316 · Ghost/Outline: border #00F2FF · Text link: color #00F2FF
          </p>

          {/* Divider */}
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', margin: '48px 0' }} />

          {/* Grille & Effets */}
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem',
            color: 'rgba(0,242,255,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            // 07 — Grille & Effets
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '8px' }}>
            {swatches.grid.map(s => <Swatch key={s.token} {...s} />)}
          </div>

          {/* Footer */}
          <div style={{
            marginTop: '64px', paddingTop: '24px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem',
            color: 'rgba(242,240,235,0.25)',
          }}>
            © 2025 DESCODES — Charte de couleurs v1.0 · Exportée le 19 avril 2025
          </div>

        </div>
      </div>
    </>
  )
}
