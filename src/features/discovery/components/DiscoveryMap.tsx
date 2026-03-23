'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Empreendimento } from '@/types'
import { formatCurrency } from '@/lib/utils'

// Fix for default markers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

function createScoreIcon(score: number, isSelected: boolean) {
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'
  const size = isSelected ? 36 : 28
  const borderWidth = isSelected ? 3 : 2

  return L.divIcon({
    className: 'custom-score-marker',
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${color};
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${isSelected ? 13 : 11}px;
      font-weight: bold;
      border: ${borderWidth}px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      transition: all 0.2s;
    ">${score}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

interface DiscoveryMapProps {
  empreendimentos: Empreendimento[]
  selectedId: number | null
  onSelect: (id: number | null) => void
}

export function DiscoveryMap({ empreendimentos, selectedId, onSelect }: DiscoveryMapProps) {
  return (
    <MapContainer
      center={[-3.7327, -38.527]}
      zoom={12}
      className="h-full w-full"
      style={{ minHeight: '400px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {empreendimentos.map((emp) => (
        <Marker
          key={emp.id}
          position={[Number(emp.lat), Number(emp.lng)]}
          icon={createScoreIcon(emp.score, emp.id === selectedId)}
          eventHandlers={{
            click: () => onSelect(emp.id),
          }}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{emp.nome}</p>
              <p className="text-gray-500">{emp.bairro}</p>
              <p className="font-medium">{formatCurrency(emp.preco)}</p>
              <p className="text-xs">Score: {emp.score}/100</p>
            </div>
          </Popup>
        </Marker>
      ))}

      <MapController selectedId={selectedId} empreendimentos={empreendimentos} />
    </MapContainer>
  )
}

function MapController({
  selectedId,
  empreendimentos,
}: {
  selectedId: number | null
  empreendimentos: Empreendimento[]
}) {
  const map = useMap()

  useEffect(() => {
    if (selectedId) {
      const emp = empreendimentos.find((e) => e.id === selectedId)
      if (emp) {
        map.flyTo([Number(emp.lat), Number(emp.lng)], 15)
      }
    }
  }, [selectedId, empreendimentos, map])

  return null
}
