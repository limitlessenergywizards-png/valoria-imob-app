import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detalhes do Imóvel',
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Detalhes do Imóvel</h1>
      <p className="text-gray-500">Imóvel ID: {id}</p>
    </div>
  )
}
