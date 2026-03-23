import { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Search, Bell, Settings } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Watchlist',
}

export default function WatchlistPage() {
  // TODO: Fetch from Supabase when connected
  const watchlistItems: never[] = []

  return (
    <PageContainer
      title="Watchlist"
      subtitle="Seus empreendimentos salvos"
      actions={
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Configurar Alertas
        </Button>
      }
    >
      {watchlistItems.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="mx-auto w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mb-4">
            <Star className="h-6 w-6 text-yellow-500" />
          </div>
          <h3 className="font-semibold">Nenhum empreendimento salvo</h3>
          <p className="text-sm text-gray-500 mt-1">
            Explore empreendimentos e salve os que mais interessam para acompanhar preço e score.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Button render={<Link href="/discovery" />}>
              <Search className="mr-2 h-4 w-4" />
              Explorar Empreendimentos
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {/* Watchlist items will be rendered here */}
        </div>
      )}

      {/* Alert info */}
      <Card className="mt-6">
        <CardContent className="p-4 flex items-start gap-3">
          <Bell className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium">Alertas Automáticos</p>
            <p className="text-xs text-gray-500 mt-1">
              Receba notificações quando o preço cair ou o score mudar nos empreendimentos salvos.
              Configure seus alertas nas preferências.
            </p>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
