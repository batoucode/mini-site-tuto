interface ProgressBarProps {
  completed: number
  total: number
  showLabel?: boolean
}

export default function ProgressBar({ completed, total, showLabel = true }: ProgressBarProps) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: 'var(--fg)' }}>
            Progression
          </span>
          <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
            {completed}/{total} étapes ({percentage}%)
          </span>
        </div>
      )}
      <div
        className="w-full h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--border)' }}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progression : ${completed} sur ${total} étapes`}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: percentage === 100 ? 'var(--success)' : 'var(--accent)',
          }}
        />
      </div>
    </div>
  )
}
