import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Stripe webhook handler - will be implemented in Etapa 13
  return NextResponse.json({ received: true })
}
