'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

interface EvolucaoData {
  mes: string
  valor: number
}

interface DistribuicaoData {
  bairro: string
  valor: number
}

export const PortfolioCharts = {
  Evolucao: function EvolucaoChart({ data }: { data: EvolucaoData[] }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Evolução do Patrimônio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            {data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => `R$${(v / 1000000).toFixed(1)}M`} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="valor" stroke="#2563eb" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                Adicione imóveis ao portfolio para ver a evolução
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  },

  Distribuicao: function DistribuicaoChart({ data }: { data: DistribuicaoData[] }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Distribuição por Bairro</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            {data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} dataKey="valor" nameKey="bairro" cx="50%" cy="50%" outerRadius={100} label>
                    {data.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                Adicione imóveis para ver a distribuição
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  },
}
