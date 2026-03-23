import { NextResponse } from 'next/server'

export async function GET() {
  // Newsletter cron - triggered every Monday at 10 AM BRT
  // Will be implemented when Resend is connected
  return NextResponse.json({ message: 'Newsletter cron executed', timestamp: new Date().toISOString() })
}
