'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <h2 className="text-xl font-semibold">Algo deu errado!</h2>
      <p className="text-gray-500 mt-2">Ocorreu um erro inesperado.</p>
      <Button onClick={reset} className="mt-4">
        Tentar novamente
      </Button>
    </div>
  )
}
