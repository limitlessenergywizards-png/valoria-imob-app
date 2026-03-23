'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn, formatCurrency, formatPercent } from '@/lib/utils'
import { TrendingUp, TrendingDown, MoreVertical, Plus } from 'lucide-react'
import type { PortfolioImovel } from '@/types'

export function PortfolioList({ imoveis }: { imoveis: PortfolioImovel[] }) {
  if (imoveis.length === 0) {
    return <EmptyPortfolio />
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Seus Imóveis</h2>
      {imoveis.map((imovel) => (
        <ImovelCard key={imovel.id} imovel={imovel} />
      ))}
    </div>
  )
}

function ImovelCard({ imovel }: { imovel: PortfolioImovel }) {
  const valorizacao = imovel.valor_compra > 0
    ? ((imovel.valor_atual_estimado - imovel.valor_compra) / imovel.valor_compra) * 100
    : 0
  const capRate = imovel.aluguel_mensal
    ? (imovel.aluguel_mensal * 12 / imovel.valor_atual_estimado) * 100
    : null

  return (
    <Card className={cn('p-4', valorizacao < 0 && 'border-red-200', valorizacao >= 0 && valorizacao < 5 && 'border-yellow-200')}>
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{imovel.nome}</h3>
              <p className="text-sm text-gray-500">{imovel.bairro}</p>
            </div>
            {imovel.score_atual && (
              <Badge variant={imovel.score_atual >= 75 ? 'default' : 'secondary'}>
                Score: {imovel.score_atual}
              </Badge>
            )}
          </div>

          <div className="mt-2 flex items-center gap-4 text-sm">
            <span>Compra: {formatCurrency(imovel.valor_compra)}</span>
            <span>→</span>
            <span>Atual: {formatCurrency(imovel.valor_atual_estimado)}</span>
            <span className={valorizacao >= 0 ? 'text-green-600' : 'text-red-600'}>
              {valorizacao >= 0 ? <TrendingUp className="inline h-4 w-4" /> : <TrendingDown className="inline h-4 w-4" />}
              {formatPercent(valorizacao)}
            </span>
          </div>

          {imovel.aluguel_mensal && capRate && (
            <p className="text-sm text-gray-500 mt-1">
              Aluguel: {formatCurrency(imovel.aluguel_mensal)}/mês | Cap Rate: {formatPercent(capRate)}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" render={<Link href={`/portfolio/${imovel.id}`} />}>
            Ver Detalhes
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

function EmptyPortfolio() {
  return (
    <Card className="p-8 text-center">
      <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <Plus className="h-6 w-6 text-blue-600" />
      </div>
      <h3 className="font-semibold">Nenhum imóvel no portfolio</h3>
      <p className="text-sm text-gray-500 mt-1">Adicione seu primeiro imóvel para começar a acompanhar</p>
      <Button className="mt-4">
        <Plus className="mr-2 h-4 w-4" />
        Adicionar Imóvel
      </Button>
    </Card>
  )
}
