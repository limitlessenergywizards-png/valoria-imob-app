import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { calculateScore } from '@/lib/scoring/scoringEngine'
import type { Empreendimento, EnrichmentData } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const { empreendimentoId } = await request.json()

    if (!empreendimentoId) {
      return NextResponse.json({ error: 'empreendimentoId is required' }, { status: 400 })
    }

    const supabase = await createClient()

    // Check auth
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    // Check analysis limit
    const { data: profile } = await supabase
      .from('profiles')
      .select('monthly_analyses_count, monthly_analyses_limit, plan')
      .eq('id', user.id)
      .single()

    if (profile && profile.plan !== 'pro' && profile.plan !== 'enterprise') {
      if (profile.monthly_analyses_count >= profile.monthly_analyses_limit) {
        return NextResponse.json(
          { error: 'Limite de análises mensais atingido' },
          { status: 429 }
        )
      }
    }

    // Fetch empreendimento data
    const { data: empreendimento } = await supabase
      .from('empreendimentos')
      .select('*')
      .eq('id', empreendimentoId)
      .single()

    if (!empreendimento) {
      return NextResponse.json({ error: 'Empreendimento não encontrado' }, { status: 404 })
    }

    // Fetch enrichment data
    const { data: enrichmentData } = await supabase
      .from('enrichment_data')
      .select('*')
      .eq('empreendimento_id', empreendimentoId)
      .single()

    // Calculate score
    const result = calculateScore({
      empreendimento: empreendimento as unknown as Empreendimento,
      enrichmentData: enrichmentData as unknown as EnrichmentData | null,
    })

    // Save result
    await supabase
      .from('empreendimentos')
      .update({
        score: result.score,
        valorizacao_min: result.valorizacao_min,
        valorizacao_max: result.valorizacao_max,
        confianca: result.confianca,
        recomendacao: result.recomendacao,
        fatores_positivos: JSON.parse(JSON.stringify(result.fatores_positivos)),
        fatores_negativos: JSON.parse(JSON.stringify(result.fatores_negativos)),
        scored_at: new Date().toISOString(),
      })
      .eq('id', empreendimentoId)

    // Save history
    await supabase.from('scores_history').insert({
      empreendimento_id: empreendimentoId,
      score: result.score,
      valorizacao_min: result.valorizacao_min,
      valorizacao_max: result.valorizacao_max,
      confianca: result.confianca,
      recomendacao: result.recomendacao,
    })

    // Increment counter
    await supabase.rpc('increment_analysis_count', { user_uuid: user.id })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Scoring error:', error)
    return NextResponse.json({ error: 'Erro ao calcular score' }, { status: 500 })
  }
}
