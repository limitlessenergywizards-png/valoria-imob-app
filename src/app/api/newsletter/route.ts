import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Newsletter endpoint - will be implemented in Etapa 12
  return NextResponse.json({ message: 'Not yet implemented' }, { status: 501 })
}
