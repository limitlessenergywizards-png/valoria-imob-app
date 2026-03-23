'use client'

import { useState } from 'react'
import { toast } from 'sonner'

export function useScoring() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyze = async (empreendimentoId: number) => {
    setIsAnalyzing(true)
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ empreendimentoId }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erro ao analisar')
      }

      const result = await response.json()
      toast.success('Análise concluída!')
      return result
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao analisar'
      toast.error(message)
      throw error
    } finally {
      setIsAnalyzing(false)
    }
  }

  return { analyze, isAnalyzing }
}
