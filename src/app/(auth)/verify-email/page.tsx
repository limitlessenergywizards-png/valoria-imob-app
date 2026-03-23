import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Verificar Email',
}

export default function VerifyEmailPage() {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <Mail className="h-6 w-6 text-blue-600" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Verifique seu email</h2>
        <p className="mt-2 text-sm text-gray-600">
          Enviamos um link de verificação para seu email.
          Clique no link para ativar sua conta.
        </p>
      </div>
      <div className="space-y-3">
        <p className="text-xs text-gray-500">
          Não recebeu? Verifique a pasta de spam ou aguarde alguns minutos.
        </p>
        <Button variant="outline" render={<Link href="/login" />} className="w-full">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao login
        </Button>
      </div>
    </div>
  )
}
