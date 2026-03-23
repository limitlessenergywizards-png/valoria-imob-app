import { Skeleton } from '@/components/ui/skeleton'

export default function DiscoveryLoading() {
  return (
    <div className="h-[calc(100vh-theme(spacing.20))] flex gap-4">
      <div className="w-[400px] space-y-4 hidden lg:block">
        <Skeleton className="h-12" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
      <Skeleton className="flex-1 rounded-lg" />
    </div>
  )
}
