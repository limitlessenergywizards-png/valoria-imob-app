// Placeholder - será gerado automaticamente pelo Supabase CLI após configuração
// Use: pnpm supabase gen types typescript --project-id $PROJECT_ID > src/types/database.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      vi_profiles: {
        Row: {
          id: string
          full_name: string | null
          phone: string | null
          cpf_cnpj: string | null
          plan: string
          trial_expires_at: string | null
          subscription_status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          alert_frequency: string | null
          alert_channels: Json | null
          theme: string | null
          monthly_analyses_count: number
          monthly_analyses_limit: number
          last_analysis_reset_at: string | null
          created_at: string
          updated_at: string
          last_login_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          phone?: string | null
          cpf_cnpj?: string | null
          plan?: string
          trial_expires_at?: string | null
          subscription_status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          alert_frequency?: string | null
          alert_channels?: Json | null
          theme?: string | null
          monthly_analyses_count?: number
          monthly_analyses_limit?: number
          last_analysis_reset_at?: string | null
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          phone?: string | null
          cpf_cnpj?: string | null
          plan?: string
          trial_expires_at?: string | null
          subscription_status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          alert_frequency?: string | null
          alert_channels?: Json | null
          theme?: string | null
          monthly_analyses_count?: number
          monthly_analyses_limit?: number
          last_analysis_reset_at?: string | null
          updated_at?: string
          last_login_at?: string | null
        }
        Relationships: []
      }
      vi_empreendimentos: {
        Row: {
          id: number
          nome: string
          slug: string
          endereco: string
          bairro: string
          cidade: string
          estado: string
          cep: string | null
          lat: number
          lng: number
          construtora: string
          preco: number
          metragem: number
          preco_m2: number
          quartos: number
          suites: number
          vagas: number
          entrega_prevista: string | null
          score: number
          valorizacao_min: number | null
          valorizacao_max: number | null
          confianca: string | null
          recomendacao: string | null
          justificativa: string | null
          fatores_positivos: Json | null
          fatores_negativos: Json | null
          proximos_passos: Json | null
          imagem_principal: string | null
          imagens: Json | null
          fonte: string | null
          url_original: string | null
          status: string
          visibilidade: string | null
          scraped_at: string | null
          enriched_at: string | null
          scored_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          nome: string
          slug: string
          endereco: string
          bairro: string
          cidade: string
          estado: string
          cep?: string | null
          lat: number
          lng: number
          construtora: string
          preco: number
          metragem: number
          preco_m2: number
          quartos: number
          suites?: number
          vagas?: number
          entrega_prevista?: string | null
          score?: number
          valorizacao_min?: number | null
          valorizacao_max?: number | null
          confianca?: string | null
          recomendacao?: string | null
          justificativa?: string | null
          fatores_positivos?: Json | null
          fatores_negativos?: Json | null
          proximos_passos?: Json | null
          imagem_principal?: string | null
          imagens?: Json | null
          fonte?: string | null
          url_original?: string | null
          status?: string
          visibilidade?: string | null
        }
        Update: {
          nome?: string
          slug?: string
          endereco?: string
          bairro?: string
          cidade?: string
          estado?: string
          preco?: number
          metragem?: number
          preco_m2?: number
          quartos?: number
          suites?: number
          vagas?: number
          score?: number
          valorizacao_min?: number | null
          valorizacao_max?: number | null
          confianca?: string | null
          recomendacao?: string | null
          justificativa?: string | null
          fatores_positivos?: Json | null
          fatores_negativos?: Json | null
          proximos_passos?: Json | null
          imagem_principal?: string | null
          status?: string
          scored_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      vi_enrichment_data: {
        Row: {
          id: number
          empreendimento_id: number
          escolas_1km: number | null
          hospitais_1km: number | null
          supermercados_1km: number | null
          farmacias_1km: number | null
          metro_distancia: number | null
          metro_linha: string | null
          shopping_distancia: number | null
          shopping_nome: string | null
          concorrentes_bairro: number | null
          preco_medio_bairro: number | null
          preco_vs_bairro: number | null
          saturacao_score: number | null
          obras_planejadas: Json | null
          obras_andamento: Json | null
          renda_media_cep: number | null
          populacao_bairro: number | null
          crescimento_populacional: number | null
          enriched_at: string | null
          data_source: Json | null
        }
        Insert: {
          empreendimento_id: number
          escolas_1km?: number | null
          hospitais_1km?: number | null
          supermercados_1km?: number | null
          farmacias_1km?: number | null
          metro_distancia?: number | null
          metro_linha?: string | null
          shopping_distancia?: number | null
          shopping_nome?: string | null
          concorrentes_bairro?: number | null
          preco_medio_bairro?: number | null
          preco_vs_bairro?: number | null
          saturacao_score?: number | null
          obras_planejadas?: Json | null
          obras_andamento?: Json | null
          renda_media_cep?: number | null
          populacao_bairro?: number | null
          crescimento_populacional?: number | null
        }
        Update: {
          escolas_1km?: number | null
          hospitais_1km?: number | null
          metro_distancia?: number | null
          concorrentes_bairro?: number | null
          preco_medio_bairro?: number | null
          preco_vs_bairro?: number | null
          saturacao_score?: number | null
        }
        Relationships: []
      }
      vi_portfolio_imoveis: {
        Row: {
          id: number
          user_id: string
          nome: string
          slug: string | null
          endereco: string
          bairro: string
          cidade: string
          cep: string | null
          lat: number | null
          lng: number | null
          data_compra: string
          valor_compra: number
          valor_entrada: number | null
          financiamento_valor: number | null
          financiamento_banco: string | null
          metragem: number
          quartos: number
          suites: number | null
          vagas: number | null
          andar: number | null
          aluguel_mensal: number | null
          aluguel_inicio: string | null
          inquilino_contrato_fim: string | null
          inquilino_nome: string | null
          valor_atual_estimado: number
          valor_atualizado_em: string | null
          score_atual: number | null
          score_atualizado_em: string | null
          status: string
          imagem_principal: string | null
          imagens: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          nome: string
          endereco: string
          bairro: string
          cidade: string
          data_compra: string
          valor_compra: number
          metragem: number
          quartos: number
          valor_atual_estimado: number
          slug?: string | null
          cep?: string | null
          lat?: number | null
          lng?: number | null
          valor_entrada?: number | null
          financiamento_valor?: number | null
          financiamento_banco?: string | null
          suites?: number | null
          vagas?: number | null
          andar?: number | null
          aluguel_mensal?: number | null
          aluguel_inicio?: string | null
          inquilino_contrato_fim?: string | null
          inquilino_nome?: string | null
          valor_atualizado_em?: string | null
          score_atual?: number | null
          score_atualizado_em?: string | null
          status?: string
          imagem_principal?: string | null
          imagens?: Json | null
        }
        Update: {
          user_id?: string
          nome?: string
          endereco?: string
          bairro?: string
          cidade?: string
          data_compra?: string
          valor_compra?: number
          metragem?: number
          quartos?: number
          valor_atual_estimado?: number
          slug?: string | null
          cep?: string | null
          lat?: number | null
          lng?: number | null
          valor_entrada?: number | null
          financiamento_valor?: number | null
          financiamento_banco?: string | null
          suites?: number | null
          vagas?: number | null
          andar?: number | null
          aluguel_mensal?: number | null
          aluguel_inicio?: string | null
          inquilino_contrato_fim?: string | null
          inquilino_nome?: string | null
          valor_atualizado_em?: string | null
          score_atual?: number | null
          score_atualizado_em?: string | null
          status?: string
          imagem_principal?: string | null
          imagens?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      vi_portfolio_historico_valores: {
        Row: {
          id: number
          imovel_id: number
          valor_estimado: number
          preco_m2: number | null
          preco_medio_bairro: number | null
          variacao_vs_bairro: number | null
          fonte: string | null
          data_referencia: string
          created_at: string
        }
        Insert: {
          imovel_id: number
          valor_estimado: number
          data_referencia: string
          preco_m2?: number | null
          preco_medio_bairro?: number | null
          variacao_vs_bairro?: number | null
          fonte?: string | null
        }
        Update: {
          imovel_id?: number
          valor_estimado?: number
          data_referencia?: string
          preco_m2?: number | null
          preco_medio_bairro?: number | null
          variacao_vs_bairro?: number | null
          fonte?: string | null
          created_at?: string
        }
        Relationships: []
      }
      vi_portfolio_transacoes: {
        Row: {
          id: number
          imovel_id: number
          tipo: string
          valor: number
          data_transacao: string
          descricao: string | null
          recorrente: boolean
          frequencia: string | null
          created_at: string
        }
        Insert: {
          imovel_id: number
          tipo: string
          valor: number
          data_transacao: string
          descricao?: string | null
          recorrente?: boolean
          frequencia?: string | null
        }
        Update: {
          imovel_id?: number
          tipo?: string
          valor?: number
          data_transacao?: string
          descricao?: string | null
          recorrente?: boolean
          frequencia?: string | null
          created_at?: string
        }
        Relationships: []
      }
      vi_bairros_analytics: {
        Row: {
          id: number
          bairro: string
          cidade: string
          preco_medio_m2: number | null
          variacao_mensal: number | null
          variacao_anual: number | null
          lancamentos_ativos: number | null
          lancamentos_pipeline_6m: number | null
          saturacao_score: number | null
          renda_media: number | null
          crescimento_renda: number | null
          populacao: number | null
          score_bairro: number | null
          tendencia: string | null
          recomendacao_acao: string | null
          data_referencia: string | null
          created_at: string
        }
        Insert: {
          bairro: string
          cidade: string
          preco_medio_m2?: number | null
          variacao_mensal?: number | null
          variacao_anual?: number | null
          lancamentos_ativos?: number | null
          lancamentos_pipeline_6m?: number | null
          saturacao_score?: number | null
          renda_media?: number | null
          crescimento_renda?: number | null
          populacao?: number | null
          score_bairro?: number | null
          tendencia?: string | null
          recomendacao_acao?: string | null
          data_referencia?: string | null
        }
        Update: {
          bairro?: string
          cidade?: string
          preco_medio_m2?: number | null
          variacao_mensal?: number | null
          variacao_anual?: number | null
          lancamentos_ativos?: number | null
          lancamentos_pipeline_6m?: number | null
          saturacao_score?: number | null
          renda_media?: number | null
          crescimento_renda?: number | null
          populacao?: number | null
          score_bairro?: number | null
          tendencia?: string | null
          recomendacao_acao?: string | null
          data_referencia?: string | null
          created_at?: string
        }
        Relationships: []
      }
      vi_watchlist: {
        Row: {
          id: number
          user_id: string
          empreendimento_id: number
          alert_price_drop: boolean
          alert_score_change: boolean
          alert_threshold: number | null
          notes: string | null
          tags: string[] | null
          added_at: string
        }
        Insert: {
          user_id: string
          empreendimento_id: number
          alert_price_drop?: boolean
          alert_score_change?: boolean
          alert_threshold?: number | null
          notes?: string | null
          tags?: string[] | null
        }
        Update: {
          user_id?: string
          empreendimento_id?: number
          alert_price_drop?: boolean
          alert_score_change?: boolean
          alert_threshold?: number | null
          notes?: string | null
          tags?: string[] | null
          added_at?: string
        }
        Relationships: []
      }
      vi_notifications: {
        Row: {
          id: number
          user_id: string
          type: string
          title: string
          message: string
          action_url: string | null
          action_label: string | null
          metadata: Json | null
          read_at: string | null
          clicked_at: string | null
          created_at: string
          expires_at: string | null
        }
        Insert: {
          user_id: string
          type: string
          title: string
          message: string
          action_url?: string | null
          action_label?: string | null
          metadata?: Json | null
          expires_at?: string | null
        }
        Update: {
          user_id?: string
          type?: string
          title?: string
          message?: string
          action_url?: string | null
          action_label?: string | null
          metadata?: Json | null
          read_at?: string | null
          clicked_at?: string | null
          created_at?: string
          expires_at?: string | null
        }
        Relationships: []
      }
      vi_subscriptions: {
        Row: {
          id: number
          user_id: string
          stripe_subscription_id: string | null
          stripe_invoice_id: string | null
          plan: string
          billing_period: string | null
          amount: number
          currency: string
          status: string
          period_start: string | null
          period_end: string | null
          coupon_code: string | null
          discount_amount: number | null
          created_at: string
          paid_at: string | null
          refunded_at: string | null
        }
        Insert: {
          user_id: string
          plan: string
          amount: number
          currency?: string
          status: string
          stripe_subscription_id?: string | null
          stripe_invoice_id?: string | null
          billing_period?: string | null
          period_start?: string | null
          period_end?: string | null
          coupon_code?: string | null
          discount_amount?: number | null
          paid_at?: string | null
          refunded_at?: string | null
        }
        Update: {
          user_id?: string
          plan?: string
          amount?: number
          currency?: string
          status?: string
          stripe_subscription_id?: string | null
          stripe_invoice_id?: string | null
          billing_period?: string | null
          period_start?: string | null
          period_end?: string | null
          coupon_code?: string | null
          discount_amount?: number | null
          created_at?: string
          paid_at?: string | null
          refunded_at?: string | null
        }
        Relationships: []
      }
      vi_scores_history: {
        Row: {
          id: number
          empreendimento_id: number
          score: number
          score_anterior: number | null
          score_delta: number | null
          valorizacao_min: number | null
          valorizacao_max: number | null
          confianca: string | null
          recomendacao: string | null
          motivo_mudanca: string | null
          calculated_at: string
        }
        Insert: {
          empreendimento_id: number
          score: number
          score_anterior?: number | null
          score_delta?: number | null
          valorizacao_min?: number | null
          valorizacao_max?: number | null
          confianca?: string | null
          recomendacao?: string | null
          motivo_mudanca?: string | null
          calculated_at?: string
        }
        Update: {
          empreendimento_id?: number
          score?: number
          score_anterior?: number | null
          score_delta?: number | null
          valorizacao_min?: number | null
          valorizacao_max?: number | null
          confianca?: string | null
          recomendacao?: string | null
          motivo_mudanca?: string | null
          calculated_at?: string
        }
        Relationships: []
      }
      vi_analytics: {
        Row: {
          id: number
          user_id: string | null
          session_id: string | null
          event_type: string
          page_path: string | null
          empreendimento_id: number | null
          event_data: Json | null
          user_agent: string | null
          ip_address: string | null
          device_type: string | null
          created_at: string
        }
        Insert: {
          event_type: string
          user_id?: string | null
          session_id?: string | null
          page_path?: string | null
          empreendimento_id?: number | null
          event_data?: Json | null
          user_agent?: string | null
          ip_address?: string | null
          device_type?: string | null
        }
        Update: {
          event_type?: string
          user_id?: string | null
          session_id?: string | null
          page_path?: string | null
          empreendimento_id?: number | null
          event_data?: Json | null
          user_agent?: string | null
          ip_address?: string | null
          device_type?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      vi_can_analyze: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      vi_increment_analysis_count: {
        Args: { user_uuid: string }
        Returns: void
      }
      vi_reset_monthly_analyses: {
        Args: Record<string, never>
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
