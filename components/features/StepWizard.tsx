'use client'

import { useState, useEffect, useRef } from 'react'
import type { Pack, Step } from '@/lib/constants'
import ProgressBar from '@/components/ui/ProgressBar'
import CodeBlock from '@/components/ui/CodeBlock'
import Checklist from '@/components/features/Checklist'
import { loadProgress, saveProgress, resetProgress } from '@/lib/utils'

interface StepWizardProps {
  pack: Pack
}

export default function StepWizard({ pack }: StepWizardProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [currentStepDone, setCurrentStepDone] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  const totalSteps = pack.steps.length
  const currentStep = pack.steps[currentStepIndex]
  const isLastStep = currentStepIndex === totalSteps - 1
  const showFinalChecklist = completedSteps.length === totalSteps

  // Load from localStorage
  useEffect(() => {
    setMounted(true)
    const saved = loadProgress(pack.slug)
    setCompletedSteps(saved)
    // Find first uncompleted step
    const firstUncompleted = pack.steps.findIndex((s) => !saved.includes(s.id))
    if (firstUncompleted >= 0) {
      setCurrentStepIndex(firstUncompleted)
    } else if (saved.length === totalSteps) {
      setCurrentStepIndex(totalSteps - 1)
    }
  }, [pack.slug, pack.steps, totalSteps])

  // Update checkbox state when changing steps
  useEffect(() => {
    setCurrentStepDone(completedSteps.includes(currentStep.id))
  }, [currentStepIndex, completedSteps, currentStep.id])

  // Scroll to top when step changes
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [currentStepIndex])

  const handleCheckStep = (checked: boolean) => {
    setCurrentStepDone(checked)
    let newCompleted: number[]
    if (checked) {
      newCompleted = completedSteps.includes(currentStep.id)
        ? completedSteps
        : [...completedSteps, currentStep.id]
    } else {
      newCompleted = completedSteps.filter((id) => id !== currentStep.id)
    }
    setCompletedSteps(newCompleted)
    saveProgress(pack.slug, newCompleted)
  }

  const goToNext = () => {
    if (!currentStepDone) return
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  const goToPrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const goToStep = (index: number) => {
    setCurrentStepIndex(index)
  }

  const handleReset = () => {
    resetProgress(pack.slug)
    setCompletedSteps([])
    setCurrentStepIndex(0)
    setCurrentStepDone(false)
    setShowResetConfirm(false)
  }

  if (!mounted) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 rounded-full" style={{ backgroundColor: 'var(--border)' }} />
        <div className="h-48 rounded-xl" style={{ backgroundColor: 'var(--border)' }} />
      </div>
    )
  }

  // Final checklist screen
  if (showFinalChecklist) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div
          className="p-6 rounded-xl text-center"
          style={{
            backgroundColor: 'rgba(22,163,74,0.06)',
            border: '1px solid rgba(22,163,74,0.25)',
          }}
        >
          <div className="text-4xl mb-3">🎉</div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--success)' }}>
            Toutes les étapes terminées !
          </h2>
          <p style={{ color: 'var(--fg-muted)' }}>
            Validez maintenant la checklist finale avant de livrer le site au client.
          </p>
        </div>

        <Checklist
          packSlug={pack.slug}
          packName={pack.name}
          items={pack.checklistItems}
        />

        <button
          onClick={() => setShowResetConfirm(true)}
          className="w-full py-2 rounded-xl text-sm transition-all hover:opacity-70"
          style={{ color: 'var(--fg-muted)', border: '1px solid var(--border)' }}
        >
          Recommencer depuis le début
        </button>

        {showResetConfirm && (
          <div
            className="p-4 rounded-xl"
            style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}
          >
            <p className="text-sm font-medium mb-3" style={{ color: '#ef4444' }}>
              ⚠️ Réinitialiser toute la progression de ce pack ?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-2 rounded-xl text-sm font-medium text-white"
                style={{ backgroundColor: '#ef4444' }}
              >
                Oui, réinitialiser
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 rounded-xl text-sm font-medium"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--fg)' }}
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6" ref={topRef}>

      {/* Progress bar */}
      <ProgressBar completed={completedSteps.length} total={totalSteps} />

      {/* Step dots navigator */}
      <div className="flex flex-wrap gap-2">
        {pack.steps.map((step, index) => {
          const isDone = completedSteps.includes(step.id)
          const isCurrent = index === currentStepIndex
          return (
            <button
              key={step.id}
              onClick={() => goToStep(index)}
              title={`Étape ${step.id} : ${step.title}`}
              className="w-8 h-8 rounded-full text-xs font-bold transition-all hover:scale-110"
              style={{
                backgroundColor: isDone
                  ? 'var(--success)'
                  : isCurrent
                  ? 'var(--accent)'
                  : 'var(--border)',
                color: isDone || isCurrent ? 'white' : 'var(--fg-muted)',
                transform: isCurrent ? 'scale(1.15)' : undefined,
                boxShadow: isCurrent ? '0 0 0 3px rgba(44,95,138,0.25)' : undefined,
              }}
            >
              {isDone ? '✓' : step.id}
            </button>
          )
        })}
      </div>

      {/* Step card */}
      <div
        key={currentStep.id}
        className="rounded-xl overflow-hidden animate-slide-up"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {/* Step header */}
        <div
          className="px-6 py-4 flex items-center gap-3"
          style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg)' }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            {currentStep.id}
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
              Étape {currentStep.id} sur {totalSteps}
            </div>
            <h2 className="font-bold text-lg leading-tight" style={{ color: 'var(--fg)' }}>
              {currentStep.title}
            </h2>
          </div>
        </div>

        {/* Step content */}
        <div className="p-6 space-y-8">

          {/* Objectif */}
          <Section icon="🎯" title="Objectif">
            <p
              className="text-base leading-relaxed px-4 py-3 rounded-xl"
              style={{
                color: 'var(--fg)',
                backgroundColor: 'var(--accent-subtle, rgba(44,95,138,0.06))',
                borderLeft: '3px solid var(--accent)',
              }}
            >
              {currentStep.objective}
            </p>
          </Section>

          {/* Actions */}
          <Section icon="📋" title="Actions à réaliser">
            <ol className="space-y-3">
              {currentStep.actions.map((action, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 text-white"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--fg)' }}>
                    {action}
                  </span>
                </li>
              ))}
            </ol>
          </Section>

          {/* Commands */}
          {currentStep.commands && currentStep.commands.length > 0 && (
            <Section icon="💻" title="Commandes à exécuter">
              <CodeBlock
                code={currentStep.commands.join('\n')}
                language="bash"
                filename="Terminal"
              />
            </Section>
          )}

          {/* Code snippets */}
          {currentStep.codeSnippets && currentStep.codeSnippets.length > 0 && (
            <Section icon="📄" title="Fichiers à créer">
              <div className="space-y-4">
                {currentStep.codeSnippets.map((snippet, i) => (
                  <CodeBlock
                    key={i}
                    code={snippet.code}
                    language={snippet.language}
                    filename={snippet.filename}
                  />
                ))}
              </div>
            </Section>
          )}

          {/* Résultat attendu */}
          <Section icon="✅" title="Résultat attendu">
            <div
              className="px-4 py-3 rounded-xl text-sm leading-relaxed"
              style={{
                color: 'var(--fg)',
                backgroundColor: 'rgba(22,163,74,0.06)',
                border: '1px solid rgba(22,163,74,0.2)',
              }}
            >
              {currentStep.expectedResult}
            </div>
          </Section>

          {/* Folder structure */}
          {currentStep.folderStructure && (
            <Section icon="📁" title="Structure de dossier après cette étape">
              <CodeBlock
                code={currentStep.folderStructure}
                language="bash"
                filename="Arborescence"
              />
            </Section>
          )}

          {/* Aide contextuelle */}
          {currentStep.helpContent && (
            <Section icon="💡" title="">
              <details
                className="rounded-xl overflow-hidden"
                style={{ border: '1px solid var(--border)' }}
              >
                <summary
                  className="px-4 py-3 flex items-center gap-2 cursor-pointer select-none font-medium text-sm"
                  style={{
                    backgroundColor: 'var(--bg)',
                    color: 'var(--fg)',
                    listStyle: 'none',
                  }}
                >
                  <span>💡</span>
                  <span>Aide contextuelle — Problèmes fréquents & Liens utiles</span>
                  <span className="ml-auto" style={{ color: 'var(--fg-muted)' }}>▾</span>
                </summary>
                <div
                  className="px-5 py-4 prose-sm space-y-3"
                  style={{ backgroundColor: 'var(--bg-card)' }}
                  dangerouslySetInnerHTML={{ __html: currentStep.helpContent }}
                />
              </details>
            </Section>
          )}

          {/* Checkbox "J'ai terminé" */}
          <div
            className="flex items-start gap-4 p-5 rounded-xl transition-all"
            style={{
              backgroundColor: currentStepDone
                ? 'rgba(22,163,74,0.07)'
                : 'var(--bg)',
              border: `2px solid ${currentStepDone ? 'rgba(22,163,74,0.4)' : 'var(--border)'}`,
            }}
          >
            {/* Custom big checkbox */}
            <button
              onClick={() => handleCheckStep(!currentStepDone)}
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 mt-0.5"
              style={{
                backgroundColor: currentStepDone ? 'var(--success)' : 'transparent',
                border: `2.5px solid ${currentStepDone ? 'var(--success)' : 'var(--border)'}`,
              }}
              aria-label="Marquer l'étape comme terminée"
            >
              {currentStepDone && (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path
                    d="M1 5L4.5 8.5L11 1"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <div>
              <div className="font-semibold" style={{ color: currentStepDone ? 'var(--success)' : 'var(--fg)' }}>
                {currentStepDone
                  ? '☑️ Étape terminée !'
                  : '☐ J\'ai terminé cette étape'}
              </div>
              <p className="text-sm mt-1" style={{ color: 'var(--fg-muted)' }}>
                {currentStepDone
                  ? 'Progression sauvegardée. Vous pouvez passer à l\'étape suivante.'
                  : 'Cochez cette case une fois l\'étape complétée pour débloquer la suivante.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={goToPrev}
          disabled={currentStepIndex === 0}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            color: 'var(--fg)',
          }}
        >
          ← Étape précédente
        </button>

        <div className="flex-1 text-center text-sm" style={{ color: 'var(--fg-muted)' }}>
          {currentStepIndex + 1} / {totalSteps}
        </div>

        <button
          onClick={goToNext}
          disabled={!currentStepDone || isLastStep}
          title={!currentStepDone ? 'Cochez "J\'ai terminé" pour continuer' : ''}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          {isLastStep ? 'Dernière étape' : 'Étape suivante →'}
        </button>
      </div>

      {!currentStepDone && (
        <p className="text-center text-xs" style={{ color: 'var(--fg-muted)' }}>
          💡 Cochez la case "J'ai terminé cette étape" pour accéder à l'étape suivante
        </p>
      )}
    </div>
  )
}

// ── Helper section component ──────────────────────────────────
function Section({
  icon,
  title,
  children,
}: {
  icon: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      {title && (
        <div className="flex items-center gap-2 mb-3">
          <span>{icon}</span>
          <h3 className="font-semibold" style={{ color: 'var(--fg)' }}>
            {title}
          </h3>
        </div>
      )}
      {children}
    </div>
  )
}
