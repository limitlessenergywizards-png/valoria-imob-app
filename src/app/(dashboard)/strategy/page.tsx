import { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Análise Estratégica',
}

// Mock bairro data - will come from Supabase
const bairrosData = [
  { bairro: 'Cocó', score: 88, tendencia: 'subindo', valorizacao: '+35-45%', acao: 'AUMENTAR' },
  { bairro: 'Papicu', score: 82, tendencia: 'subindo', valorizacao: '+30-42%', acao: 'AUMENTAR' },
  { bairro: 'Edson Queiroz', score: 78, tendencia: 'subindo', valorizacao: '+25-38%', acao: 'AUMENTAR' },
  { bairro: 'Meireles', score: 72, tendencia: 'estavel', valorizacao: '+15-28%', acao: 'MANTER' },
  { bairro: 'Dionísio Torres', score: 65, tendencia: 'estavel', valorizacao: '+12-22%', acao: 'MANTER' },
  { bairro: 'Aldeota', score: 55, tendencia: 'caindo', valorizacao: '+10-18%', acao: 'REDUZIR' },
  { bairro: 'Praia de Iracema', score: 42, tendencia: 'caindo', valorizacao: '+5-12%', acao: 'EVITAR' },
]

export default function StrategyPage() {
  return (
    <PageContainer
      title="Análise Estratégica"
      subtitle="Diagnóstico e recomendações para seu portfolio"
    >
      <div className="space-y-6">
        {/* Diagnosis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Diagnóstico do Mercado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
              <strong>Cocó e Papicu</strong> apresentam os melhores indicadores de valorização, impulsionados pela chegada do metrô e baixa saturação.
            </div>
            <div className="p-3 bg-amber-50 rounded-lg text-sm text-amber-800">
              <strong>Aldeota</strong> mostra sinais de saturação com 8 lançamentos ativos no bairro.
            </div>
            <div className="p-3 bg-red-50 rounded-lg text-sm text-red-800">
              <strong>Praia de Iracema</strong> em tendência de queda - evitar novos investimentos.
            </div>
          </CardContent>
        </Card>

        {/* Bairros Table */}
        <Card>
          <CardHeader>
            <CardTitle>Tendências por Bairro</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bairro</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Tendência</TableHead>
                  <TableHead>Valorização</TableHead>
                  <TableHead>Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bairrosData.map((bairro) => (
                  <TableRow key={bairro.bairro}>
                    <TableCell className="font-medium">{bairro.bairro}</TableCell>
                    <TableCell>
                      <Badge variant={bairro.score >= 75 ? 'default' : bairro.score >= 50 ? 'secondary' : 'destructive'}>
                        {bairro.score}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {bairro.tendencia === 'subindo' && <TrendingUp className="h-4 w-4 text-green-500" />}
                        {bairro.tendencia === 'estavel' && <Minus className="h-4 w-4 text-yellow-500" />}
                        {bairro.tendencia === 'caindo' && <TrendingDown className="h-4 w-4 text-red-500" />}
                        <span className="text-sm capitalize">{bairro.tendencia}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-green-700">{bairro.valorizacao}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        bairro.acao === 'AUMENTAR' ? 'text-green-700 border-green-300' :
                        bairro.acao === 'MANTER' ? 'text-yellow-700 border-yellow-300' :
                        bairro.acao === 'REDUZIR' ? 'text-orange-700 border-orange-300' :
                        'text-red-700 border-red-300'
                      }>
                        {bairro.acao}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Action Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Plano de Ação Recomendado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-500">
              Conecte seu portfolio para receber recomendações personalizadas de compra e venda.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
