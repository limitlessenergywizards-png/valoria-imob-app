'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Home, Search, Star, Building2, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Sidebar } from './Sidebar'

const tabs = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Descoberta', href: '/discovery', icon: Search },
  { name: 'Watchlist', href: '/watchlist', icon: Star },
  { name: 'Portfolio', href: '/portfolio', icon: Building2 },
]

export function MobileNav({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 bg-white border-t safe-area-bottom',
        className
      )}
    >
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/')
          const Icon = tab.icon

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs',
                isActive ? 'text-blue-600' : 'text-gray-500'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{tab.name}</span>
            </Link>
          )
        })}
        <Sheet>
          <SheetTrigger className="flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs text-gray-500">
            <Menu className="h-5 w-5" />
            <span>Menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar className="relative w-full border-none pt-0" />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
