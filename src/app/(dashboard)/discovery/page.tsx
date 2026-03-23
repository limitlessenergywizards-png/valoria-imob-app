import { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { DiscoveryContent } from '@/features/discovery/components/DiscoveryContent'

export const metadata: Metadata = {
  title: 'Descoberta',
  description: 'Encontre os melhores empreendimentos para investir em Fortaleza',
}

// Temporary mock data until Supabase is connected
const mockEmpreendimentos = [
  { id: 1, nome: 'Residencial Atlantico Prime', slug: 'residencial-atlantico-prime', endereco: 'Rua Silva Jatahy, 600', bairro: 'Meireles', cidade: 'Fortaleza', estado: 'CE', cep: null, lat: -3.7245, lng: -38.5100, construtora: 'MRV Engenharia', preco: 580000, metragem: 95, preco_m2: 6105, quartos: 3, suites: 2, vagas: 2, entrega_prevista: '2027-06-01', score: 87, valorizacao_min: 32, valorizacao_max: 45, confianca: 'alta' as const, recomendacao: 'COMPRAR' as const, justificativa: null, fatores_positivos: null, fatores_negativos: null, proximos_passos: null, imagem_principal: null, imagens: null, fonte: null, url_original: null, status: 'ativo', visibilidade: null, scraped_at: null, enriched_at: null, scored_at: null, created_at: '', updated_at: '' },
  { id: 2, nome: 'Condominio Vivace', slug: 'condominio-vivace', endereco: 'Av. Eng. Santana Jr, 1200', bairro: 'Coco', cidade: 'Fortaleza', estado: 'CE', cep: null, lat: -3.7430, lng: -38.4870, construtora: 'Diagonal Engenharia', preco: 385000, metragem: 68, preco_m2: 5662, quartos: 2, suites: 1, vagas: 1, entrega_prevista: '2027-03-01', score: 91, valorizacao_min: 38, valorizacao_max: 52, confianca: 'alta' as const, recomendacao: 'COMPRAR' as const, justificativa: null, fatores_positivos: null, fatores_negativos: null, proximos_passos: null, imagem_principal: null, imagens: null, fonte: null, url_original: null, status: 'ativo', visibilidade: null, scraped_at: null, enriched_at: null, scored_at: null, created_at: '', updated_at: '' },
  { id: 3, nome: 'BS Design 10', slug: 'bs-design-10', endereco: 'Rua Desemb. Leite Albuquerque, 100', bairro: 'Aldeota', cidade: 'Fortaleza', estado: 'CE', cep: null, lat: -3.7320, lng: -38.5180, construtora: 'BSPar', preco: 620000, metragem: 82, preco_m2: 7561, quartos: 3, suites: 1, vagas: 2, entrega_prevista: '2026-12-01', score: 62, valorizacao_min: 10, valorizacao_max: 18, confianca: 'media' as const, recomendacao: 'ANALISAR' as const, justificativa: null, fatores_positivos: null, fatores_negativos: null, proximos_passos: null, imagem_principal: null, imagens: null, fonte: null, url_original: null, status: 'ativo', visibilidade: null, scraped_at: null, enriched_at: null, scored_at: null, created_at: '', updated_at: '' },
  { id: 4, nome: 'Parque das Flores', slug: 'parque-das-flores', endereco: 'Av. Washington Soares, 3500', bairro: 'Edson Queiroz', cidade: 'Fortaleza', estado: 'CE', cep: null, lat: -3.7710, lng: -38.4780, construtora: 'Rossi Residencial', preco: 320000, metragem: 55, preco_m2: 5818, quartos: 2, suites: 1, vagas: 1, entrega_prevista: '2027-01-01', score: 78, valorizacao_min: 25, valorizacao_max: 38, confianca: 'alta' as const, recomendacao: 'COMPRAR' as const, justificativa: null, fatores_positivos: null, fatores_negativos: null, proximos_passos: null, imagem_principal: null, imagens: null, fonte: null, url_original: null, status: 'ativo', visibilidade: null, scraped_at: null, enriched_at: null, scored_at: null, created_at: '', updated_at: '' },
  { id: 5, nome: 'Gran Vista Park', slug: 'gran-vista-park', endereco: 'Av. Santos Dumont, 5000', bairro: 'Papicu', cidade: 'Fortaleza', estado: 'CE', cep: null, lat: -3.7380, lng: -38.4950, construtora: 'Colmeia Engenharia', preco: 290000, metragem: 52, preco_m2: 5577, quartos: 2, suites: 1, vagas: 1, entrega_prevista: '2026-09-01', score: 85, valorizacao_min: 30, valorizacao_max: 42, confianca: 'alta' as const, recomendacao: 'COMPRAR' as const, justificativa: null, fatores_positivos: null, fatores_negativos: null, proximos_passos: null, imagem_principal: null, imagens: null, fonte: null, url_original: null, status: 'ativo', visibilidade: null, scraped_at: null, enriched_at: null, scored_at: null, created_at: '', updated_at: '' },
  { id: 6, nome: 'Solar do Coco', slug: 'solar-do-coco', endereco: 'Rua Padre Valdevino, 1500', bairro: 'Coco', cidade: 'Fortaleza', estado: 'CE', cep: null, lat: -3.7450, lng: -38.4900, construtora: 'Marquise', preco: 420000, metragem: 70, preco_m2: 6000, quartos: 2, suites: 1, vagas: 1, entrega_prevista: '2027-04-01', score: 88, valorizacao_min: 35, valorizacao_max: 48, confianca: 'alta' as const, recomendacao: 'COMPRAR' as const, justificativa: null, fatores_positivos: null, fatores_negativos: null, proximos_passos: null, imagem_principal: null, imagens: null, fonte: null, url_original: null, status: 'ativo', visibilidade: null, scraped_at: null, enriched_at: null, scored_at: null, created_at: '', updated_at: '' },
  { id: 7, nome: 'Praia Formosa Residence', slug: 'praia-formosa-residence', endereco: 'Av. Historiador Raimundo Girao, 800', bairro: 'Praia de Iracema', cidade: 'Fortaleza', estado: 'CE', cep: null, lat: -3.7210, lng: -38.5140, construtora: 'Bspar', preco: 550000, metragem: 88, preco_m2: 6250, quartos: 3, suites: 2, vagas: 2, entrega_prevista: '2027-10-01', score: 45, valorizacao_min: 5, valorizacao_max: 12, confianca: 'baixa' as const, recomendacao: 'EVITAR' as const, justificativa: null, fatores_positivos: null, fatores_negativos: null, proximos_passos: null, imagem_principal: null, imagens: null, fonte: null, url_original: null, status: 'ativo', visibilidade: null, scraped_at: null, enriched_at: null, scored_at: null, created_at: '', updated_at: '' },
]

const mockBairros = ['Meireles', 'Coco', 'Aldeota', 'Edson Queiroz', 'Varjota', 'Papicu', 'Dionisio Torres', 'Passare', 'Mucuripe', 'Guararapes', 'Praia de Iracema']

export default function DiscoveryPage() {
  return (
    <PageContainer
      title="Descoberta"
      subtitle={`${mockEmpreendimentos.length} empreendimentos disponiveis`}
    >
      <DiscoveryContent
        initialEmpreendimentos={mockEmpreendimentos}
        bairros={mockBairros}
      />
    </PageContainer>
  )
}
