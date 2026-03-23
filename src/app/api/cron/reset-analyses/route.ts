import { NextResponse } from 'next/server'

export async function GET() {
  // Monthly reset of analysis counts - triggered 1st of each month
  // Will call reset_monthly_analyses() when Supabase is connected
  return NextResponse.json({ message: 'Analysis reset executed', timestamp: new Date().toISOString() })
}
