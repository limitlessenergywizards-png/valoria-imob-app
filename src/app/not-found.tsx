import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <h2 className="text-xl font-semibold mt-4">Página não encontrada</h2>
      <p className="text-gray-500 mt-2">A página que você procura não existe.</p>
      <Button className="mt-6" render={<Link href="/dashboard" />}>Voltar ao início</Button>
    </div>
  )
}
