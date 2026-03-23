// Tipos base da aplicação

export type Plan = 'free' | 'basico' | 'pro' | 'enterprise'

export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  cpf_cnpj: string | null
  plan: Plan
  trial_expires_at: string | null
  subscription_status: string | null
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  alert_frequency: string | null
  alert_channels: Record<string, boolean> | null
  theme: string | null
  monthly_analyses_count: number
  monthly_analyses_limit: number
  last_analysis_reset_at: string | null
  created_at: string
  updated_at: string
  last_login_at: string | null
}

export interface Empreendimento {
  id: number
  nome: string
  slug: string
  endereco: string
  bairro: string
  cidade: string
  estado: string
  cep: string | null
  lat: number
  lng: number
  construtora: string
  preco: number
  metragem: number
  preco_m2: number
  quartos: number
  suites: number
  vagas: number
  entrega_prevista: string | null
  score: number
  valorizacao_min: number | null
  valorizacao_max: number | null
  confianca: 'baixa' | 'media' | 'alta' | null
  recomendacao: 'COMPRAR' | 'ANALISAR' | 'EVITAR' | null
  justificativa: string | null
  fatores_positivos: Fator[] | null
  fatores_negativos: Fator[] | null
  proximos_passos: string[] | null
  imagem_principal: string | null
  imagens: string[] | null
  fonte: string | null
  url_original: string | null
  status: string
  visibilidade: string | null
  scraped_at: string | null
  enriched_at: string | null
  scored_at: string | null
  created_at: string
  updated_at: string
  enrichment_data?: EnrichmentData | null
}

export interface Fator {
  titulo: string
  descricao: string
  peso: number
  icone?: string
}

export interface EnrichmentData {
  id: number
  empreendimento_id: number
  escolas_1km: number | null
  hospitais_1km: number | null
  supermercados_1km: number | null
  farmacias_1km: number | null
  metro_distancia: number | null
  metro_linha: string | null
  shopping_distancia: number | null
  shopping_nome: string | null
  concorrentes_bairro: number | null
  preco_medio_bairro: number | null
  preco_vs_bairro: number | null
  saturacao_score: number | null
  obras_planejadas: Record<string, unknown>[] | null
  obras_andamento: Record<string, unknown>[] | null
  renda_media_cep: number | null
  populacao_bairro: number | null
  crescimento_populacional: number | null
  enriched_at: string | null
  data_source: Record<string, unknown> | null
}

export interface PortfolioImovel {
  id: number
  user_id: string
  nome: string
  slug: string | null
  endereco: string
  bairro: string
  cidade: string
  cep: string | null
  lat: number | null
  lng: number | null
  data_compra: string
  valor_compra: number
  valor_entrada: number | null
  financiamento_valor: number | null
  financiamento_banco: string | null
  metragem: number
  quartos: number
  suites: number | null
  vagas: number | null
  andar: number | null
  aluguel_mensal: number | null
  aluguel_inicio: string | null
  inquilino_contrato_fim: string | null
  inquilino_nome: string | null
  valor_atual_estimado: number
  valor_atualizado_em: string | null
  score_atual: number | null
  score_atualizado_em: string | null
  status: string
  imagem_principal: string | null
  imagens: string[] | null
  created_at: string
  updated_at: string
}

export interface PortfolioTransacao {
  id: number
  imovel_id: number
  tipo: string
  valor: number
  data_transacao: string
  descricao: string | null
  recorrente: boolean
  frequencia: string | null
  created_at: string
}

export interface BairroAnalytics {
  id: number
  bairro: string
  cidade: string
  preco_medio_m2: number | null
  variacao_mensal: number | null
  variacao_anual: number | null
  lancamentos_ativos: number | null
  lancamentos_pipeline_6m: number | null
  saturacao_score: number | null
  renda_media: number | null
  crescimento_renda: number | null
  populacao: number | null
  score_bairro: number | null
  tendencia: 'subindo' | 'estavel' | 'caindo' | null
  recomendacao_acao: string | null
  data_referencia: string | null
  created_at: string
}

export interface WatchlistItem {
  id: number
  user_id: string
  empreendimento_id: number
  alert_price_drop: boolean
  alert_score_change: boolean
  alert_threshold: number | null
  notes: string | null
  tags: string[] | null
  added_at: string
  empreendimento?: Empreendimento
}

export interface Notification {
  id: number
  user_id: string
  type: string
  title: string
  message: string
  action_url: string | null
  action_label: string | null
  metadata: Record<string, unknown> | null
  read_at: string | null
  clicked_at: string | null
  created_at: string
  expires_at: string | null
}

export interface ScoreHistory {
  id: number
  empreendimento_id: number
  score: number
  score_anterior: number | null
  score_delta: number | null
  valorizacao_min: number | null
  valorizacao_max: number | null
  confianca: string | null
  recomendacao: string | null
  motivo_mudanca: string | null
  calculated_at: string
}

// Scoring types
export interface ScoringResult {
  score: number
  valorizacao_min: number
  valorizacao_max: number
  confianca: 'baixa' | 'media' | 'alta'
  recomendacao: 'COMPRAR' | 'ANALISAR' | 'EVITAR'
  breakdown: {
    saturacao: PillarScore
    infraestrutura: PillarScore
    obras_publicas: PillarScore
    demographics: PillarScore
    pricing: PillarScore
  }
  fatores_positivos: Fator[]
  fatores_negativos: Fator[]
}

export interface PillarScore {
  nome: string
  score: number
  peso: number
  detalhes: string
}

// Filter types
export interface DiscoveryFilters {
  precoMin: number | null
  precoMax: number | null
  metragemMin: number | null
  metragemMax: number | null
  scoreMin: number
  bairros: string[]
  quartos: number[]
  construtoras: string[]
  ordenacao: 'score' | 'preco_asc' | 'preco_desc' | 'valorizacao'
}

// Plan config
export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    analyses: 3,
    portfolio_limit: 1,
    features: ['Score visível', '3 análises/mês'],
  },
  basico: {
    name: 'Básico',
    price: 299,
    analyses: Infinity,
    portfolio_limit: 5,
    features: ['Análises ilimitadas', '5 imóveis', 'Newsletter', 'Alertas email'],
  },
  pro: {
    name: 'Pro',
    price: 899,
    analyses: Infinity,
    portfolio_limit: 20,
    features: ['Tudo do Básico', '20 imóveis', 'WhatsApp', 'API', 'Estratégia'],
  },
  enterprise: {
    name: 'Enterprise',
    price: null,
    analyses: Infinity,
    portfolio_limit: Infinity,
    features: ['Tudo do Pro', 'White-label', 'Consultor dedicado'],
  },
} as const
