'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/stores/sidebarStore'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  LayoutDashboard, Search, Star, Building2,
  TrendingUp, Target, Bell, Settings,
  CreditCard, HelpCircle, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const navigation = [
  {
    label: 'PRINCIPAL',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Descoberta', href: '/discovery', icon: Search },
      { name: 'Watchlist', href: '/watchlist', icon: Star },
    ],
  },
  {
    label: 'PORTFOLIO',
    items: [
      { name: 'Meus Imóveis', href: '/portfolio', icon: Building2 },
      { name: 'Valorização', href: '/portfolio', icon: TrendingUp },
    ],
  },
  {
    label: 'ESTRATÉGIA',
    items: [
      { name: 'Análise', href: '/strategy', icon: Target },
      { name: 'Alertas', href: '/watchlist', icon: Bell },
    ],
  },
  {
    label: 'CONFIGURAÇÕES',
    items: [
      { name: 'Preferências', href: '/settings', icon: Settings },
      { name: 'Assinatura', href: '/pricing', icon: CreditCard },
      { name: 'Ajuda', href: '/settings', icon: HelpCircle },
    ],
  },
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const { isCollapsed, toggle } = useSidebar()

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r transition-all duration-300 pt-16',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Collapse toggle */}
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={toggle}
        className="absolute -right-3 top-20 z-10 h-6 w-6 rounded-full border bg-white shadow-sm"
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {navigation.map((group) => (
          <div key={group.label} className="mb-4">
            {!isCollapsed && (
              <p className="px-3 mb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                const Icon = item.icon

                const linkContent = (
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      isCollapsed && 'justify-center px-2'
                    )}
                  >
                    <Icon className={cn('h-4 w-4 shrink-0', isActive && 'text-blue-600')} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                )

                if (isCollapsed) {
                  return (
                    <Tooltip key={item.name}>
                      <TooltipTrigger render={<span />}>
                        {linkContent}
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        {item.name}
                      </TooltipContent>
                    </Tooltip>
                  )
                }

                return <div key={item.name}>{linkContent}</div>
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}
