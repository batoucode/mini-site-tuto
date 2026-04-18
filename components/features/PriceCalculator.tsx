'use client'

import { useState, useEffect } from 'react'
import { OPTIONS, type Pack } from '@/lib/constants'
import { formatPrice, loadSelectedOptions, saveSelectedOptions } from '@/lib/utils'

interface PriceCalculatorProps {
  pack: Pack
}

export default function PriceCalculator({ pack }: PriceCalculatorProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = loadSelectedOptions(pack.slug)
    setSelectedOptions(saved)
  }, [pack.slug])

  const toggleOption = (optionId: string) => {
    const newSelected = selectedOptions.includes(optionId)
      ? selectedOptions.filter((id) => id !== optionId)
      : [...selectedOptions, optionId]

    setSelectedOptions(newSelected)
    saveSelectedOptions(pack.slug, newSelected)
  }

  const optionsTotal = OPTIONS.filter((opt) =>
    selectedOptions.includes(opt.id)
  ).reduce((sum, opt) => sum + opt.price, 0)

  const total = pack.price + optionsTotal

  const handleRequestQuote = () => {
    const selectedLabels = OPTIONS.filter((opt) => selectedOptions.includes(opt.id))
      .map((opt) => `• ${opt.label} (+${formatPrice(opt.price)})`)
      .join('\n')

    const message = [
      `📋 Devis demandé : ${pack.name}`,
      `💰 Pack de base : ${formatPrice(pack.price)}`,
      selectedLabels ? `\n🔧 Options sélectionnées :\n${selectedLabels}` : '',
      `\n💰 Total estimé : ${formatPrice(total)}`,
    ]
      .filter(Boolean)
      .join('\n')

    alert(message)
  }

  if (!mounted) {
    return (
      <div
        className="p-5 rounded-xl animate-pulse"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          height: '400px',
        }}
      />
    )
  }

  return (
    <div
      className="sticky top-24 p-5 rounded-xl"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Header */}
      <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--fg)' }}>
        💰 Calculateur de prix
      </h3>

      {/* Base price */}
      <div
        className="flex items-center justify-between p-3 rounded-xl mb-4"
        style={{ backgroundColor: 'var(--bg)' }}
      >
        <div>
          <div className="font-semibold text-sm" style={{ color: 'var(--fg)' }}>
            {pack.name}
          </div>
          <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
            Pack de base · {pack.duration}
          </div>
        </div>
        <div className="font-bold" style={{ color: 'var(--accent)' }}>
          {formatPrice(pack.price)}
        </div>
      </div>

      {/* Options */}
      <div className="mb-4">
        <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--fg-muted)' }}>
          Options disponibles
        </div>
        <div className="space-y-2">
          {OPTIONS.map((option) => {
            const isSelected = selectedOptions.includes(option.id)
            return (
              <label
                key={option.id}
                className="flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all hover:opacity-90"
                style={{
                  backgroundColor: isSelected
                    ? 'var(--accent-subtle, rgba(44,95,138,0.08))'
                    : 'var(--bg)',
                  border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                }}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleOption(option.id)}
                  className="mt-0.5 flex-shrink-0 accent-[var(--accent)]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium" style={{ color: 'var(--fg)' }}>
                      {option.label}
                    </span>
                    <span
                      className="text-sm font-semibold flex-shrink-0"
                      style={{ color: isSelected ? 'var(--accent)' : 'var(--fg-muted)' }}
                    >
                      +{formatPrice(option.price)}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--fg-muted)' }}>
                    {option.description}
                  </p>
                </div>
              </label>
            )
          })}
        </div>
      </div>

      {/* Separator */}
      <div
        className="h-px my-4"
        style={{ backgroundColor: 'var(--border)' }}
      />

      {/* Total */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="font-bold" style={{ color: 'var(--fg)' }}>
            Total estimé
          </div>
          {optionsTotal > 0 && (
            <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
              Pack + {selectedOptions.length} option{selectedOptions.length > 1 ? 's' : ''}
            </div>
          )}
        </div>
        <div
          className="text-2xl font-bold"
          style={{ color: 'var(--accent)' }}
        >
          {formatPrice(total)}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleRequestQuote}
        className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-105 active:scale-95"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        Demander ce devis
      </button>

      <p className="text-center text-xs mt-3" style={{ color: 'var(--fg-muted)' }}>
        Devis détaillé gratuit sous 24h
      </p>
    </div>
  )
}
