'use server'

import { createClient } from '@/lib/supabase/server'

export async function getEmpreendimentos() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('empreendimentos')
    .select('*, enrichment_data(*)')
    .eq('status', 'ativo')
    .order('score', { ascending: false })

  if (error) throw error
  return data
}

export async function getEmpreendimentoBySlug(slug: string) {
  const supabase = await createClient()

  const { data } = await supabase
    .from('empreendimentos')
    .select('*, enrichment_data(*)')
    .eq('slug', slug)
    .single()

  return data
}

export async function getEmpreendimentoById(id: number) {
  const supabase = await createClient()

  const { data } = await supabase
    .from('empreendimentos')
    .select('*, enrichment_data(*), scores_history(*)')
    .eq('id', id)
    .single()

  return data
}
