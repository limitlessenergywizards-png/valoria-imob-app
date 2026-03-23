'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useDiscoveryStore } from '@/stores/discoveryStore'
import { DiscoveryFilters } from './DiscoveryFilters'
import { DiscoveryList } from './DiscoveryList'
import type { Empreendimento } from '@/types'

const DiscoveryMap = dynamic(
  () => import('./DiscoveryMap').then(mod => mod.DiscoveryMap),
  {
    ssr: false,
    loading: () => <div className="h-full bg-gray-100 animate-pulse rounded-lg" />,
  }
)

interface DiscoveryContentProps {
  initialEmpreendimentos: Empreendimento[]
  bairros: string[]
}

export function DiscoveryContent({
  initialEmpreendimentos,
  bairros,
}: DiscoveryContentProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const { filters, setFilters, resetFilters } = useDiscoveryStore()

  const filteredEmpreendimentos = useMemo(() => {
    return initialEmpreendimentos.filter((emp) => {
      if (filters.precoMin && emp.preco < filters.precoMin) return false
      if (filters.precoMax && emp.preco > filters.precoMax) return false
      if (filters.scoreMin && emp.score < filters.scoreMin) return false
      if (filters.metragemMin && emp.metragem < filters.metragemMin) return false
      if (filters.metragemMax && emp.metragem > filters.metragemMax) return false
      if (filters.bairros.length > 0 && !filters.bairros.includes(emp.bairro)) return false
      if (filters.quartos.length > 0 && !filters.quartos.includes(emp.quartos)) return false
      if (filters.construtoras.length > 0 && !filters.construtoras.includes(emp.construtora)) return false
      return true
    })
  }, [initialEmpreendimentos, filters])

  const sortedEmpreendimentos = useMemo(() => {
    const sorted = [...filteredEmpreendimentos]
    switch (filters.ordenacao) {
      case 'preco_asc':
        sorted.sort((a, b) => a.preco - b.preco)
        break
      case 'preco_desc':
        sorted.sort((a, b) => b.preco - a.preco)
        break
      case 'valorizacao':
        sorted.sort((a, b) => (b.valorizacao_max || 0) - (a.valorizacao_max || 0))
        break
      default:
        sorted.sort((a, b) => b.score - a.score)
    }
    return sorted
  }, [filteredEmpreendimentos, filters.ordenacao])

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col lg:flex-row gap-4">
      {/* Sidebar with filters and list */}
      <div className="w-full lg:w-[400px] flex flex-col gap-4 overflow-hidden">
        <DiscoveryFilters
          bairros={bairros}
          filters={filters}
          onFiltersChange={setFilters}
          onReset={resetFilters}
          count={sortedEmpreendimentos.length}
        />
        <DiscoveryList
          empreendimentos={sortedEmpreendimentos}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>

      {/* Map */}
      <div className="flex-1 rounded-lg overflow-hidden min-h-[400px]">
        <DiscoveryMap
          empreendimentos={sortedEmpreendimentos}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>
    </div>
  )
}
