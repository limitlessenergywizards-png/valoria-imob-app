import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface RecomendacaoBadgeProps {
  recomendacao: 'COMPRAR' | 'ANALISAR' | 'EVITAR' | null
  size?: 'sm' | 'md'
}

export function RecomendacaoBadge({ recomendacao, size = 'md' }: RecomendacaoBadgeProps) {
  if (!recomendacao) return null

  return (
    <Badge
      variant="outline"
      className={cn(
        size === 'sm' ? 'text-xs' : 'text-sm',
        {
          'text-green-700 bg-green-50 border-green-300': recomendacao === 'COMPRAR',
          'text-yellow-700 bg-yellow-50 border-yellow-300': recomendacao === 'ANALISAR',
          'text-red-700 bg-red-50 border-red-300': recomendacao === 'EVITAR',
        }
      )}
    >
      {recomendacao}
    </Badge>
  )
}
