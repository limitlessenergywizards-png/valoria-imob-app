'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, Filter, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import type { DiscoveryFilters as FiltersType } from '@/types'

interface DiscoveryFiltersProps {
  bairros: string[]
  filters: FiltersType
  onFiltersChange: (filters: Partial<FiltersType>) => void
  onReset: () => void
  count: number
}

export function DiscoveryFilters({
  bairros,
  filters,
  onFiltersChange,
  onReset,
  count,
}: DiscoveryFiltersProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">{count} empreendimentos</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="h-3 w-3 mr-1" />
          Limpar
        </Button>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? '' : '-rotate-90'}`} />
          Filtros
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-3">
          {/* Price Range */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Preco min.</Label>
              <Input
                type="number"
                placeholder="R$ 200.000"
                value={filters.precoMin || ''}
                onChange={(e) =>
                  onFiltersChange({ precoMin: e.target.value ? Number(e.target.value) : null })
                }
              />
            </div>
            <div>
              <Label className="text-xs">Preco max.</Label>
              <Input
                type="number"
                placeholder="R$ 900.000"
                value={filters.precoMax || ''}
                onChange={(e) =>
                  onFiltersChange({ precoMax: e.target.value ? Number(e.target.value) : null })
                }
              />
            </div>
          </div>

          {/* Score Min */}
          <div>
            <Label className="text-xs">Score minimo: {filters.scoreMin}</Label>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.scoreMin}
              onChange={(e) => onFiltersChange({ scoreMin: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Quartos */}
          <div>
            <Label className="text-xs">Quartos</Label>
            <div className="flex gap-2 mt-1">
              {[1, 2, 3, 4].map((q) => (
                <Badge
                  key={q}
                  variant={filters.quartos.includes(q) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => {
                    const newQuartos = filters.quartos.includes(q)
                      ? filters.quartos.filter((x) => x !== q)
                      : [...filters.quartos, q]
                    onFiltersChange({ quartos: newQuartos })
                  }}
                >
                  {q}{q === 4 ? '+' : ''}
                </Badge>
              ))}
            </div>
          </div>

          {/* Bairros */}
          <div>
            <Label className="text-xs">Bairros</Label>
            <div className="flex flex-wrap gap-1 mt-1 max-h-24 overflow-y-auto">
              {bairros.map((bairro) => (
                <Badge
                  key={bairro}
                  variant={filters.bairros.includes(bairro) ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => {
                    const newBairros = filters.bairros.includes(bairro)
                      ? filters.bairros.filter((b) => b !== bairro)
                      : [...filters.bairros, bairro]
                    onFiltersChange({ bairros: newBairros })
                  }}
                >
                  {bairro}
                </Badge>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
