'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScoreGauge } from '@/components/shared/ScoreGauge'
import { RecomendacaoBadge } from '@/components/shared/RecomendacaoBadge'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { MapPin, Calendar, Ruler, BedDouble, Car, Building2, Star, Share2, ExternalLink } from 'lucide-react'
import type { Empreendimento } from '@/types'

interface EmpreendimentoDetailProps {
  empreendimento: Empreendimento
  isModal?: boolean
  onClose?: () => void
}

export function EmpreendimentoDetail({ empreendimento: emp, isModal = false, onClose }: EmpreendimentoDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{emp.nome}</h2>
          <div className="flex items-center gap-2 mt-1 text-gray-500">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{emp.endereco}, {emp.bairro}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{emp.construtora}</p>
        </div>
        <ScoreGauge score={emp.score} size="md" />
      </div>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <InfoCard icon={Building2} label="Preço" value={formatCurrency(emp.preco)} />
        <InfoCard icon={Ruler} label="Área" value={`${emp.metragem}m²`} />
        <InfoCard icon={Building2} label="R$/m²" value={formatCurrency(emp.preco_m2)} />
        <InfoCard icon={BedDouble} label="Quartos" value={`${emp.quartos} (${emp.suites} suítes)`} />
        <InfoCard icon={Car} label="Vagas" value={String(emp.vagas)} />
        <InfoCard icon={Calendar} label="Entrega" value={emp.entrega_prevista ? new Date(emp.entrega_prevista).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'N/A'} />
      </div>

      {/* Score and Recommendation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Análise de Valorização</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <RecomendacaoBadge recomendacao={emp.recomendacao} size="md" />
            {emp.confianca && (
              <Badge variant="outline" className="text-sm">
                Confiança: {emp.confianca}
              </Badge>
            )}
          </div>

          {emp.valorizacao_min != null && emp.valorizacao_max != null && (
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800 font-medium">Valorização estimada (24 meses)</p>
              <p className="text-2xl font-bold text-green-700 mt-1">
                {formatPercent(emp.valorizacao_min)} a {formatPercent(emp.valorizacao_max)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Factors */}
      {(emp.fatores_positivos?.length || emp.fatores_negativos?.length) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {emp.fatores_positivos && emp.fatores_positivos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-700">Fatores Positivos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {emp.fatores_positivos.map((fator, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <div>
                      <p className="text-sm font-medium">{fator.titulo}</p>
                      <p className="text-xs text-gray-500">{fator.descricao}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {emp.fatores_negativos && emp.fatores_negativos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-amber-700">Pontos de Atenção</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {emp.fatores_negativos.map((fator, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">⚠</span>
                    <div>
                      <p className="text-sm font-medium">{fator.titulo}</p>
                      <p className="text-xs text-gray-500">{fator.descricao}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button>
          <Star className="mr-2 h-4 w-4" />
          Adicionar à Watchlist
        </Button>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Compartilhar
        </Button>
        {!isModal && emp.url_original && (
          <Button variant="outline" render={<a href={emp.url_original} target="_blank" rel="noopener noreferrer" />}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Site Original
          </Button>
        )}
      </div>
    </div>
  )
}

function InfoCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-1.5 text-gray-500">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-sm font-semibold mt-1">{value}</p>
    </div>
  )
}
