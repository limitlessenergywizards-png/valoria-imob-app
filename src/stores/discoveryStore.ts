import { create } from 'zustand'
import type { DiscoveryFilters } from '@/types'

interface DiscoveryState {
  filters: DiscoveryFilters
  mapCenter: [number, number]
  mapZoom: number

  setFilters: (filters: Partial<DiscoveryFilters>) => void
  resetFilters: () => void
  setMapView: (center: [number, number], zoom: number) => void
}

const defaultFilters: DiscoveryFilters = {
  precoMin: null,
  precoMax: null,
  metragemMin: null,
  metragemMax: null,
  scoreMin: 0,
  bairros: [],
  quartos: [],
  construtoras: [],
  ordenacao: 'score',
}

export const useDiscoveryStore = create<DiscoveryState>((set) => ({
  filters: defaultFilters,
  mapCenter: [-3.7327, -38.5270], // Fortaleza
  mapZoom: 12,

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  resetFilters: () => set({ filters: defaultFilters }),

  setMapView: (center, zoom) => set({ mapCenter: center, mapZoom: zoom }),
}))
