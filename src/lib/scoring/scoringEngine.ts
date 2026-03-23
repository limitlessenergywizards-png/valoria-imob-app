import type { Empreendimento, EnrichmentData, ScoringResult, PillarScore, Fator } from '@/types'

interface ScoringInput {
  empreendimento: Empreendimento
  enrichmentData: EnrichmentData | null
}

export function calculateScore(input: ScoringInput): ScoringResult {
  const { empreendimento, enrichmentData } = input
  const enrichment = enrichmentData || ({} as Partial<EnrichmentData>)

  // Calculate each pillar
  const saturacao = calculateSaturacao(enrichment)
  const infraestrutura = calculateInfraestrutura(enrichment)
  const obrasPublicas = calculateObrasPublicas(enrichment)
  const demographics = calculateDemographics(enrichment)
  const pricing = calculatePricing(empreendimento, enrichment)

  // Weighted average
  const score = Math.round(
    saturacao.score * saturacao.peso +
    infraestrutura.score * infraestrutura.peso +
    obrasPublicas.score * obrasPublicas.peso +
    demographics.score * demographics.peso +
    pricing.score * pricing.peso
  )

  const clampedScore = Math.max(0, Math.min(100, score))

  // Determine recommendation and confidence
  const recomendacao = clampedScore >= 75 ? 'COMPRAR' : clampedScore >= 50 ? 'ANALISAR' : 'EVITAR'

  const highConfidenceFields = [
    enrichment.concorrentes_bairro,
    enrichment.metro_distancia,
    enrichment.preco_medio_bairro,
    enrichment.renda_media_cep,
  ].filter((v) => v != null && v !== 0).length
  const confianca = highConfidenceFields >= 3 ? 'alta' : highConfidenceFields >= 2 ? 'media' : 'baixa'

  // Estimate appreciation
  const { valorizacao_min, valorizacao_max } = estimateAppreciation(clampedScore, confianca)

  // Generate factors
  const fatores_positivos = generatePositiveFactors(enrichment, empreendimento)
  const fatores_negativos = generateNegativeFactors(enrichment, empreendimento)

  return {
    score: clampedScore,
    valorizacao_min,
    valorizacao_max,
    confianca,
    recomendacao,
    breakdown: {
      saturacao,
      infraestrutura,
      obras_publicas: obrasPublicas,
      demographics,
      pricing,
    },
    fatores_positivos,
    fatores_negativos,
  }
}

function calculateSaturacao(enrichment: Partial<EnrichmentData>): PillarScore {
  const concorrentes = enrichment.concorrentes_bairro ?? 5
  let score: number

  if (concorrentes <= 2) score = 100
  else if (concorrentes <= 3) score = 90
  else if (concorrentes <= 5) score = 70
  else if (concorrentes <= 7) score = 50
  else score = Math.max(20, 40 - (concorrentes - 8) * 5)

  // Pipeline penalty
  const saturacaoScore = enrichment.saturacao_score ?? 50
  if (saturacaoScore > 60) score -= 10
  if (saturacaoScore > 80) score -= 10

  return {
    nome: 'Saturação',
    score: Math.max(0, Math.min(100, score)),
    peso: 0.25,
    detalhes: `${concorrentes} concorrentes no bairro`,
  }
}

function calculateInfraestrutura(enrichment: Partial<EnrichmentData>): PillarScore {
  const metroDistancia = enrichment.metro_distancia ?? 2000
  const escolas = enrichment.escolas_1km ?? 5
  const shoppingDistancia = enrichment.shopping_distancia ?? 1500

  // Metro (60% of pillar)
  let metroScore: number
  if (metroDistancia < 500) metroScore = 100
  else if (metroDistancia < 1000) metroScore = 80
  else if (metroDistancia < 1500) metroScore = 60
  else if (metroDistancia < 2000) metroScore = 40
  else metroScore = 20

  // Schools (20%)
  const escolasScore = Math.min(escolas * 8, 100)

  // Shopping (20%)
  let shoppingScore: number
  if (shoppingDistancia < 500) shoppingScore = 100
  else if (shoppingDistancia < 1000) shoppingScore = 80
  else if (shoppingDistancia < 1500) shoppingScore = 60
  else shoppingScore = 40

  const score = Math.round(metroScore * 0.6 + escolasScore * 0.2 + shoppingScore * 0.2)

  return {
    nome: 'Infraestrutura',
    score: Math.max(0, Math.min(100, score)),
    peso: 0.25,
    detalhes: `Metrô ${metroDistancia}m, ${escolas} escolas, shopping ${shoppingDistancia}m`,
  }
}

function calculateObrasPublicas(enrichment: Partial<EnrichmentData>): PillarScore {
  let score = 40 // Base score
  const metroDistancia = enrichment.metro_distancia ?? 3000

  // Metro/BRT nearby
  if (metroDistancia < 500) score += 30
  else if (metroDistancia < 1000) score += 20
  else if (metroDistancia < 1500) score += 10

  // Planned works
  const obrasCount = (enrichment.obras_planejadas as unknown[])?.length ?? 0
  score += Math.min(obrasCount * 10, 20)

  // Ongoing works
  const andamentoCount = (enrichment.obras_andamento as unknown[])?.length ?? 0
  score += Math.min(andamentoCount * 5, 10)

  return {
    nome: 'Obras Públicas',
    score: Math.max(0, Math.min(100, score)),
    peso: 0.20,
    detalhes: `${obrasCount} obras planejadas, ${andamentoCount} em andamento`,
  }
}

function calculateDemographics(enrichment: Partial<EnrichmentData>): PillarScore {
  const crescimento = enrichment.crescimento_populacional ?? 3

  let score: number
  if (crescimento > 12) score = 100
  else if (crescimento > 8) score = 85
  else if (crescimento > 4) score = 65
  else if (crescimento > 2) score = 50
  else score = 30

  return {
    nome: 'Demographics',
    score: Math.max(0, Math.min(100, score)),
    peso: 0.15,
    detalhes: `Crescimento populacional: ${crescimento.toFixed(1)}%`,
  }
}

function calculatePricing(empreendimento: Empreendimento, enrichment: Partial<EnrichmentData>): PillarScore {
  const precoVsBairro = enrichment.preco_vs_bairro ?? 0

  let score: number
  if (precoVsBairro < -8) score = 100
  else if (precoVsBairro < -4) score = 85
  else if (precoVsBairro < 0) score = 70
  else if (precoVsBairro < 5) score = 50
  else if (precoVsBairro < 10) score = 30
  else score = 15

  return {
    nome: 'Pricing',
    score: Math.max(0, Math.min(100, score)),
    peso: 0.15,
    detalhes: `${precoVsBairro >= 0 ? '+' : ''}${precoVsBairro.toFixed(1)}% vs mercado`,
  }
}

function estimateAppreciation(score: number, confianca: string): { valorizacao_min: number; valorizacao_max: number } {
  const baseMin = score * 0.4
  const baseMax = score * 0.6

  const confidenceMultiplier = confianca === 'alta' ? 1 : confianca === 'media' ? 0.85 : 0.7

  return {
    valorizacao_min: Math.round(baseMin * confidenceMultiplier),
    valorizacao_max: Math.round(baseMax * confidenceMultiplier),
  }
}

function generatePositiveFactors(enrichment: Partial<EnrichmentData>, emp: Empreendimento): Fator[] {
  const factors: Fator[] = []

  if ((enrichment.metro_distancia ?? 5000) < 800) {
    factors.push({ titulo: 'Próximo ao metrô', descricao: `${enrichment.metro_distancia}m da estação`, peso: 40 })
  }
  if ((enrichment.concorrentes_bairro ?? 10) <= 3) {
    factors.push({ titulo: 'Baixa saturação', descricao: `Apenas ${enrichment.concorrentes_bairro} concorrentes`, peso: 30 })
  }
  if ((enrichment.crescimento_populacional ?? 0) > 5) {
    factors.push({ titulo: 'Região em crescimento', descricao: `${enrichment.crescimento_populacional?.toFixed(1)}% crescimento`, peso: 20 })
  }
  if ((enrichment.preco_vs_bairro ?? 0) < -3) {
    factors.push({ titulo: 'Preço abaixo do mercado', descricao: `${enrichment.preco_vs_bairro?.toFixed(1)}% vs média`, peso: 25 })
  }
  if ((enrichment.escolas_1km ?? 0) >= 10) {
    factors.push({ titulo: 'Rica em infraestrutura', descricao: `${enrichment.escolas_1km} escolas em 1km`, peso: 15 })
  }

  return factors.sort((a, b) => b.peso - a.peso).slice(0, 5)
}

function generateNegativeFactors(enrichment: Partial<EnrichmentData>, emp: Empreendimento): Fator[] {
  const factors: Fator[] = []

  if ((enrichment.concorrentes_bairro ?? 0) >= 7) {
    factors.push({ titulo: 'Alta saturação', descricao: `${enrichment.concorrentes_bairro} concorrentes no bairro`, peso: 30 })
  }
  if ((enrichment.metro_distancia ?? 0) > 2000) {
    factors.push({ titulo: 'Distante do metrô', descricao: `${enrichment.metro_distancia}m da estação mais próxima`, peso: 25 })
  }
  if ((enrichment.preco_vs_bairro ?? 0) > 5) {
    factors.push({ titulo: 'Preço acima do mercado', descricao: `+${enrichment.preco_vs_bairro?.toFixed(1)}% vs média`, peso: 20 })
  }
  if ((enrichment.crescimento_populacional ?? 10) < 2) {
    factors.push({ titulo: 'Baixo crescimento', descricao: `Apenas ${enrichment.crescimento_populacional?.toFixed(1)}% crescimento`, peso: 15 })
  }

  return factors.sort((a, b) => b.peso - a.peso).slice(0, 3)
}
