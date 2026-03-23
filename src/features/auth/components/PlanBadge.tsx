import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Plan } from '@/types'

const planConfig: Record<Plan, { label: string; className: string }> = {
  free: { label: 'FREE', className: 'bg-gray-100 text-gray-700 border-gray-200' },
  basico: { label: 'BÁSICO', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  pro: { label: 'PRO', className: 'bg-purple-100 text-purple-700 border-purple-200' },
  enterprise: { label: 'ENTERPRISE', className: 'bg-amber-100 text-amber-700 border-amber-200' },
}

interface PlanBadgeProps {
  plan: Plan
  className?: string
}

export function PlanBadge({ plan, className }: PlanBadgeProps) {
  const config = planConfig[plan]
  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      {config.label}
    </Badge>
  )
}
