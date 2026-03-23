'use client'

import { cn } from '@/lib/utils'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Empreendimento } from '@/types'

interface DiscoveryListProps {
  empreendimentos: Empreendimento[]
  selectedId: number | null
  onSelect: (id: number) => void
}

export function DiscoveryList({ empreendimentos, selectedId, onSelect }: DiscoveryListProps) {
  if (empreendimentos.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
        Nenhum empreendimento encontrado com estes filtros.
      </div>
    )
  }

  return (
    <ScrollArea className="flex-1">
      <div className="space-y-2 pr-2">
        {empreendimentos.map((emp) => (
          <EmpreendimentoCard
            key={emp.id}
            empreendimento={emp}
            isSelected={emp.id === selectedId}
            onClick={() => onSelect(emp.id)}
          />
        ))}
      </div>
    </ScrollArea>
  )
}

function EmpreendimentoCard({
  empreendimento: emp,
  isSelected,
  onClick,
}: {
  empreendimento: Empreendimento
  isSelected: boolean
  onClick: () => void
}) {
  const scoreColor = emp.score >= 75 ? 'bg-green-500' : emp.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'

  return (
    <div
      onClick={onClick}
      className={cn(
        'p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm',
        isSelected
          ? 'border-blue-500 bg-blue-50/50 shadow-sm'
          : 'border-gray-200 bg-white hover:border-gray-300'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate">{emp.nome}</h3>
          <p className="text-xs text-gray-500">{emp.bairro} | {emp.construtora}</p>
        </div>
        <div className={cn('flex items-center justify-center h-8 w-8 rounded-full text-white text-xs font-bold shrink-0', scoreColor)}>
          {emp.score}
        </div>
      </div>

      <div className="mt-2 flex items-center gap-3 text-xs text-gray-600">
        <span className="font-medium text-gray-900">{formatCurrency(emp.preco)}</span>
        <span>{emp.metragem}m2</span>
        <span>{emp.quartos}q</span>
        <span>{emp.vagas}v</span>
      </div>

      {emp.valorizacao_min != null && emp.valorizacao_max != null && (
        <div className="mt-1.5 flex items-center gap-2">
          <Badge variant="secondary" className="text-xs text-green-700 bg-green-50">
            {formatPercent(emp.valorizacao_min)} a {formatPercent(emp.valorizacao_max)}
          </Badge>
          {emp.recomendacao && (
            <Badge
              variant="outline"
              className={cn('text-xs', {
                'text-green-700 border-green-300': emp.recomendacao === 'COMPRAR',
                'text-yellow-700 border-yellow-300': emp.recomendacao === 'ANALISAR',
                'text-red-700 border-red-300': emp.recomendacao === 'EVITAR',
              })}
            >
              {emp.recomendacao}
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
