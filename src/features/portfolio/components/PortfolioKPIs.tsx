'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Building2, Wallet, Percent } from 'lucide-react'
import { formatCurrency, formatPercent } from '@/lib/utils'

interface PortfolioKPIsProps {
  valorTotal: number
  valorizacao: number
  rendaMensal: number
  roiMedio: number
}

export function PortfolioKPIs({ valorTotal, valorizacao, rendaMensal, roiMedio }: PortfolioKPIsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard title="Valor Total" value={formatCurrency(valorTotal)} icon={Building2} />
      <KPICard title="Valorização" value={formatPercent(valorizacao)} icon={valorizacao >= 0 ? TrendingUp : TrendingDown} trend={valorizacao >= 0 ? 'up' : 'down'} />
      <KPICard title="Renda Mensal" value={formatCurrency(rendaMensal)} icon={Wallet} subtitle="/mês" />
      <KPICard title="ROI Médio" value={formatPercent(roiMedio)} icon={Percent} subtitle="a.a." />
    </div>
  )
}

function KPICard({ title, value, icon: Icon, subtitle, trend }: {
  title: string; value: string; icon: React.ElementType; subtitle?: string; trend?: 'up' | 'down'
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-400'}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  )
}
