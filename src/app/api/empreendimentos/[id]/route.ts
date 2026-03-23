import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  // Will be implemented in Etapa 7
  return NextResponse.json({ message: 'Not yet implemented', id }, { status: 501 })
}
