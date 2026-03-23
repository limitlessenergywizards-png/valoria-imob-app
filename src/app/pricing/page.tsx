import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Planos',
}

const plans = [
  {
    name: 'Free',
    price: 'R$ 0',
    period: '/mês',
    description: 'Para conhecer a plataforma',
    features: ['Score visível', '3 análises/mês', '1 imóvel no portfolio'],
    cta: 'Plano Atual',
    popular: false,
    disabled: true,
  },
  {
    name: 'Básico',
    price: 'R$ 299',
    period: '/mês',
    description: 'Para investidores iniciantes',
    features: [
      'Análises ilimitadas',
      '5 imóveis no portfolio',
      'Newsletter semanal',
      'Alertas por email',
      'Histórico de scores',
    ],
    cta: 'Começar Básico',
    popular: false,
    disabled: false,
  },
  {
    name: 'Pro',
    price: 'R$ 899',
    period: '/mês',
    description: 'Para investidores sérios',
    features: [
      'Tudo do Básico',
      '20 imóveis no portfolio',
      'Análise estratégica',
      'Chat com IA',
      'Alertas WhatsApp',
      'Acesso à API',
      'Exportação PDF',
    ],
    cta: 'Começar Pro',
    popular: true,
    disabled: false,
  },
  {
    name: 'Enterprise',
    price: 'Sob consulta',
    period: '',
    description: 'Para construtoras e gestoras',
    features: [
      'Tudo do Pro',
      'Imóveis ilimitados',
      'White-label',
      'Consultor dedicado',
      'API sem limites',
      'SLA garantido',
    ],
    cta: 'Fale Conosco',
    popular: false,
    disabled: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Valor<span className="text-gray-900">IA</span>
          </Link>
          <Button variant="ghost" render={<Link href="/login" />}>Entrar</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Escolha seu Plano</h1>
          <p className="mt-4 text-lg text-gray-600">
            Comece gratuitamente e escale conforme sua necessidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                'relative flex flex-col',
                plan.popular && 'border-blue-500 shadow-lg ring-1 ring-blue-500'
              )}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600">
                  Mais Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-2 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-6"
                  variant={plan.popular ? 'default' : 'outline'}
                  disabled={plan.disabled}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 text-sm text-gray-500">
          Todos os planos incluem 7 dias de teste grátis. Cancele a qualquer momento.
        </div>
      </main>
    </div>
  )
}
