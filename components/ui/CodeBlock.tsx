'use client'

import { useState } from 'react'
import { copyToClipboard } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export default function CodeBlock({ code, language = 'bash', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const success = await copyToClipboard(code)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div
      className="rounded-xl overflow-hidden my-4"
      style={{
        backgroundColor: 'var(--code-bg)',
        border: '1px solid var(--border)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{
          backgroundColor: 'var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="flex items-center gap-2">
          {/* Dots macOS style */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          {filename && (
            <span
              className="text-xs font-mono ml-2"
              style={{ color: 'var(--fg-muted)' }}
            >
              {filename}
            </span>
          )}
          {!filename && (
            <span
              className="text-xs font-mono ml-2 uppercase"
              style={{ color: 'var(--fg-muted)' }}
            >
              {language}
            </span>
          )}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all hover:opacity-80"
          style={{
            backgroundColor: copied
              ? 'rgba(22, 163, 74, 0.15)'
              : 'var(--bg-card)',
            color: copied ? 'var(--success)' : 'var(--fg-muted)',
            border: '1px solid var(--border)',
          }}
          aria-label="Copier le code"
        >
          {copied ? (
            <>
              <span>✓</span>
              <span>Copié !</span>
            </>
          ) : (
            <>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copier</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <pre
        className="p-4 overflow-x-auto text-sm leading-relaxed"
        style={{ color: 'var(--code-fg)' }}
      >
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
}
