import { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { PortfolioKPIs } from '@/features/portfolio/components/PortfolioKPIs'
import { EvolucaoChart, DistribuicaoChart } from '@/features/portfolio/components/PortfolioCharts'
import { PortfolioList } from '@/features/portfolio/components/PortfolioList'
import { AddImovelButton } from '@/features/portfolio/components/AddImovelButton'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Meu Portfolio',
}

export default function PortfolioPage() {
  // TODO: Fetch from Supabase when connected
  return (
    <PageContainer
      title="Meu Portfolio"
      subtitle="Visão geral dos seus investimentos imobiliários"
      actions={<AddImovelButton />}
    >
      <div className="space-y-6">
        <PortfolioKPIs
          valorTotal={0}
          valorizacao={0}
          rendaMensal={0}
          roiMedio={0}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EvolucaoChart data={[]} />
          <DistribuicaoChart data={[]} />
        </div>

        <PortfolioList imoveis={[]} />
      </div>
    </PageContainer>
  )
}
