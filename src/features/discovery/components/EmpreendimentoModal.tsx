'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { EmpreendimentoDetail } from './EmpreendimentoDetail'
import { Skeleton } from '@/components/ui/skeleton'
import type { Empreendimento } from '@/types'

interface EmpreendimentoModalProps {
  empreendimentoId: number | null
  empreendimentos: Empreendimento[]
  onClose: () => void
}

export function EmpreendimentoModal({ empreendimentoId, empreendimentos, onClose }: EmpreendimentoModalProps) {
  const empreendimento = empreendimentoId
    ? empreendimentos.find(e => e.id === empreendimentoId)
    : null

  return (
    <Dialog open={!!empreendimentoId} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {empreendimento ? (
          <EmpreendimentoDetail
            empreendimento={empreendimento}
            isModal={true}
            onClose={onClose}
          />
        ) : (
          <EmpreendimentoSkeleton />
        )}
      </DialogContent>
    </Dialog>
  )
}

function EmpreendimentoSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="grid grid-cols-3 gap-3">
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
      <Skeleton className="h-32" />
    </div>
  )
}
