'use client'

import { cn } from '@/lib/utils'

interface ScoreGaugeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function ScoreGauge({ score, size = 'md', showLabel = true }: ScoreGaugeProps) {
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'
  const label = score >= 75 ? 'Excelente' : score >= 50 ? 'Moderado' : 'Baixo'

  const sizeConfig = {
    sm: { width: 60, height: 60, fontSize: 16, strokeWidth: 4 },
    md: { width: 100, height: 100, fontSize: 24, strokeWidth: 6 },
    lg: { width: 140, height: 140, fontSize: 32, strokeWidth: 8 },
  }

  const config = sizeConfig[size]
  const radius = (config.width - config.strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: config.width, height: config.width }}>
        <svg width={config.width} height={config.width} className="-rotate-90">
          <circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={config.strokeWidth}
          />
          <circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={config.strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center font-bold"
          style={{ fontSize: config.fontSize, color }}
        >
          {score}
        </div>
      </div>
      {showLabel && (
        <span className={cn('text-xs font-medium', {
          'text-green-600': score >= 75,
          'text-yellow-600': score >= 50 && score < 75,
          'text-red-600': score < 50,
        })}>
          {label}
        </span>
      )}
    </div>
  )
}
