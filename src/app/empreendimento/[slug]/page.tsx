import { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { EmpreendimentoDetail } from '@/features/discovery/components/EmpreendimentoDetail'
import type { Empreendimento } from '@/types'

export const metadata: Metadata = {
  title: 'Empreendimento',
}

export default async function EmpreendimentoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // TODO: Fetch from Supabase when connected
  // For now, show a placeholder
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900">Empreendimento</h1>
        <p className="text-gray-500 mt-2">Detalhes para: {slug}</p>
        <p className="text-gray-400 mt-4 text-sm">Conecte-se ao Supabase para ver os dados completos.</p>
      </div>
    </main>
  )
}
