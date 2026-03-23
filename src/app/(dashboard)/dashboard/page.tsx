import { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, TrendingUp, Search, Star } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function DashboardPage() {
  return (
    <PageContainer
      title="Dashboard"
      subtitle="Visão geral dos seus investimentos"
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Empreendimentos
            </CardTitle>
            <Building2 className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-gray-500 mt-1">disponíveis para análise</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Score Médio
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">74</div>
            <p className="text-xs text-green-600 mt-1">+5 vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Watchlist
            </CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-gray-500 mt-1">empreendimentos salvos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Análises
            </CardTitle>
            <Search className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0/3</div>
            <p className="text-xs text-gray-500 mt-1">usadas este mês</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button render={<Link href="/discovery" />}>
            <Search className="mr-2 h-4 w-4" />
            Explorar Empreendimentos
          </Button>
          <Button variant="outline" render={<Link href="/portfolio" />}>
            <Building2 className="mr-2 h-4 w-4" />
            Meu Portfolio
          </Button>
          <Button variant="outline" render={<Link href="/strategy" />}>
            <TrendingUp className="mr-2 h-4 w-4" />
            Análise Estratégica
          </Button>
        </CardContent>
      </Card>

      {/* Top Empreendimentos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Empreendimentos da Semana</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-sm">
            Conecte-se ao Supabase para ver os empreendimentos com maior score.
          </p>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
