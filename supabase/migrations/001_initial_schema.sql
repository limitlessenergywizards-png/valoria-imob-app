-- ValorIA - Initial Schema Migration
-- Run this in the Supabase SQL Editor

-- ============================================
-- 1. TABLES
-- ============================================

-- Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  cpf_cnpj TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'basico', 'pro', 'enterprise')),
  trial_expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
  subscription_status TEXT DEFAULT 'trialing',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  alert_frequency TEXT DEFAULT 'weekly',
  alert_channels JSONB DEFAULT '{"email": true, "push": false}'::jsonb,
  theme TEXT DEFAULT 'light',
  monthly_analyses_count INTEGER NOT NULL DEFAULT 0,
  monthly_analyses_limit INTEGER NOT NULL DEFAULT 3,
  last_analysis_reset_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

-- Empreendimentos
CREATE TABLE IF NOT EXISTS public.empreendimentos (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  endereco TEXT NOT NULL,
  bairro TEXT NOT NULL,
  cidade TEXT NOT NULL DEFAULT 'Fortaleza',
  estado TEXT NOT NULL DEFAULT 'CE',
  cep TEXT,
  lat NUMERIC NOT NULL,
  lng NUMERIC NOT NULL,
  construtora TEXT NOT NULL,
  preco NUMERIC NOT NULL,
  metragem NUMERIC NOT NULL,
  preco_m2 NUMERIC NOT NULL,
  quartos INTEGER NOT NULL DEFAULT 2,
  suites INTEGER NOT NULL DEFAULT 1,
  vagas INTEGER NOT NULL DEFAULT 1,
  entrega_prevista DATE,
  score INTEGER NOT NULL DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  valorizacao_min NUMERIC,
  valorizacao_max NUMERIC,
  confianca TEXT CHECK (confianca IN ('baixa', 'media', 'alta')),
  recomendacao TEXT CHECK (recomendacao IN ('COMPRAR', 'ANALISAR', 'EVITAR')),
  justificativa TEXT,
  fatores_positivos JSONB,
  fatores_negativos JSONB,
  proximos_passos JSONB,
  imagem_principal TEXT,
  imagens JSONB,
  fonte TEXT,
  url_original TEXT,
  status TEXT NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo', 'vendido', 'rascunho')),
  visibilidade TEXT DEFAULT 'publico' CHECK (visibilidade IN ('publico', 'premium', 'privado')),
  scraped_at TIMESTAMPTZ,
  enriched_at TIMESTAMPTZ,
  scored_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enrichment Data
CREATE TABLE IF NOT EXISTS public.enrichment_data (
  id BIGSERIAL PRIMARY KEY,
  empreendimento_id BIGINT NOT NULL REFERENCES public.empreendimentos(id) ON DELETE CASCADE,
  escolas_1km INTEGER DEFAULT 0,
  hospitais_1km INTEGER DEFAULT 0,
  supermercados_1km INTEGER DEFAULT 0,
  farmacias_1km INTEGER DEFAULT 0,
  metro_distancia INTEGER,
  metro_linha TEXT,
  shopping_distancia INTEGER,
  shopping_nome TEXT,
  concorrentes_bairro INTEGER DEFAULT 0,
  preco_medio_bairro NUMERIC,
  preco_vs_bairro NUMERIC,
  saturacao_score INTEGER DEFAULT 0,
  obras_planejadas JSONB,
  obras_andamento JSONB,
  renda_media_cep NUMERIC,
  populacao_bairro NUMERIC,
  crescimento_populacional NUMERIC,
  enriched_at TIMESTAMPTZ DEFAULT NOW(),
  data_source JSONB
);

-- Portfolio Imóveis
CREATE TABLE IF NOT EXISTS public.portfolio_imoveis (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  slug TEXT,
  endereco TEXT NOT NULL,
  bairro TEXT NOT NULL,
  cidade TEXT NOT NULL DEFAULT 'Fortaleza',
  cep TEXT,
  lat NUMERIC,
  lng NUMERIC,
  data_compra DATE NOT NULL,
  valor_compra NUMERIC NOT NULL,
  valor_entrada NUMERIC,
  financiamento_valor NUMERIC,
  financiamento_banco TEXT,
  metragem NUMERIC NOT NULL,
  quartos INTEGER NOT NULL DEFAULT 2,
  suites INTEGER DEFAULT 1,
  vagas INTEGER DEFAULT 1,
  andar INTEGER,
  aluguel_mensal NUMERIC,
  aluguel_inicio DATE,
  inquilino_contrato_fim DATE,
  inquilino_nome TEXT,
  valor_atual_estimado NUMERIC NOT NULL,
  valor_atualizado_em TIMESTAMPTZ,
  score_atual INTEGER,
  score_atualizado_em TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'vendido', 'em_obras')),
  imagem_principal TEXT,
  imagens JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Portfolio Histórico de Valores
CREATE TABLE IF NOT EXISTS public.portfolio_historico_valores (
  id BIGSERIAL PRIMARY KEY,
  imovel_id BIGINT NOT NULL REFERENCES public.portfolio_imoveis(id) ON DELETE CASCADE,
  valor_estimado NUMERIC NOT NULL,
  preco_m2 NUMERIC,
  preco_medio_bairro NUMERIC,
  variacao_vs_bairro NUMERIC,
  fonte TEXT,
  data_referencia DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Portfolio Transações
CREATE TABLE IF NOT EXISTS public.portfolio_transacoes (
  id BIGSERIAL PRIMARY KEY,
  imovel_id BIGINT NOT NULL REFERENCES public.portfolio_imoveis(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('compra', 'venda', 'aluguel_recebido', 'condominio', 'iptu', 'manutencao', 'seguro', 'outros')),
  valor NUMERIC NOT NULL,
  data_transacao DATE NOT NULL,
  descricao TEXT,
  recorrente BOOLEAN NOT NULL DEFAULT false,
  frequencia TEXT CHECK (frequencia IN ('mensal', 'trimestral', 'semestral', 'anual')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bairros Analytics
CREATE TABLE IF NOT EXISTS public.bairros_analytics (
  id BIGSERIAL PRIMARY KEY,
  bairro TEXT NOT NULL,
  cidade TEXT NOT NULL DEFAULT 'Fortaleza',
  preco_medio_m2 NUMERIC,
  variacao_mensal NUMERIC,
  variacao_anual NUMERIC,
  lancamentos_ativos INTEGER DEFAULT 0,
  lancamentos_pipeline_6m INTEGER DEFAULT 0,
  saturacao_score INTEGER DEFAULT 0,
  renda_media NUMERIC,
  crescimento_renda NUMERIC,
  populacao INTEGER,
  score_bairro INTEGER,
  tendencia TEXT CHECK (tendencia IN ('subindo', 'estavel', 'caindo')),
  recomendacao_acao TEXT,
  data_referencia DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(bairro, cidade, data_referencia)
);

-- Watchlist
CREATE TABLE IF NOT EXISTS public.watchlist (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  empreendimento_id BIGINT NOT NULL REFERENCES public.empreendimentos(id) ON DELETE CASCADE,
  alert_price_drop BOOLEAN NOT NULL DEFAULT true,
  alert_score_change BOOLEAN NOT NULL DEFAULT true,
  alert_threshold INTEGER DEFAULT 5,
  notes TEXT,
  tags TEXT[],
  added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, empreendimento_id)
);

-- Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  action_url TEXT,
  action_label TEXT,
  metadata JSONB,
  read_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

-- Subscriptions
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT,
  stripe_invoice_id TEXT,
  plan TEXT NOT NULL,
  billing_period TEXT,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'BRL',
  status TEXT NOT NULL CHECK (status IN ('active', 'past_due', 'canceled', 'incomplete', 'trialing')),
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ,
  coupon_code TEXT,
  discount_amount NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ
);

-- Scores History
CREATE TABLE IF NOT EXISTS public.scores_history (
  id BIGSERIAL PRIMARY KEY,
  empreendimento_id BIGINT NOT NULL REFERENCES public.empreendimentos(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  score_anterior INTEGER,
  score_delta INTEGER,
  valorizacao_min NUMERIC,
  valorizacao_max NUMERIC,
  confianca TEXT,
  recomendacao TEXT,
  motivo_mudanca TEXT,
  calculated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Analytics
CREATE TABLE IF NOT EXISTS public.analytics (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  session_id UUID,
  event_type TEXT NOT NULL,
  page_path TEXT,
  empreendimento_id BIGINT REFERENCES public.empreendimentos(id) ON DELETE SET NULL,
  event_data JSONB,
  user_agent TEXT,
  ip_address INET,
  device_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 2. INDEXES
-- ============================================

-- Empreendimentos
CREATE INDEX idx_empreendimentos_status ON public.empreendimentos(status);
CREATE INDEX idx_empreendimentos_bairro ON public.empreendimentos(bairro);
CREATE INDEX idx_empreendimentos_score ON public.empreendimentos(score DESC);
CREATE INDEX idx_empreendimentos_slug ON public.empreendimentos(slug);
CREATE INDEX idx_empreendimentos_construtora ON public.empreendimentos(construtora);
CREATE INDEX idx_empreendimentos_preco ON public.empreendimentos(preco);
CREATE INDEX idx_empreendimentos_status_score ON public.empreendimentos(status, score DESC);

-- Enrichment
CREATE INDEX idx_enrichment_empreendimento ON public.enrichment_data(empreendimento_id);

-- Portfolio
CREATE INDEX idx_portfolio_user ON public.portfolio_imoveis(user_id);
CREATE INDEX idx_portfolio_historico_imovel ON public.portfolio_historico_valores(imovel_id);
CREATE INDEX idx_portfolio_historico_data ON public.portfolio_historico_valores(data_referencia);
CREATE INDEX idx_portfolio_transacoes_imovel ON public.portfolio_transacoes(imovel_id);
CREATE INDEX idx_portfolio_transacoes_tipo ON public.portfolio_transacoes(tipo);

-- Bairros
CREATE INDEX idx_bairros_bairro ON public.bairros_analytics(bairro);
CREATE INDEX idx_bairros_score ON public.bairros_analytics(score_bairro DESC);

-- Watchlist
CREATE INDEX idx_watchlist_user ON public.watchlist(user_id);
CREATE INDEX idx_watchlist_empreendimento ON public.watchlist(empreendimento_id);

-- Notifications
CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_unread ON public.notifications(user_id) WHERE read_at IS NULL;
CREATE INDEX idx_notifications_created ON public.notifications(created_at DESC);

-- Subscriptions
CREATE INDEX idx_subscriptions_user ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe ON public.subscriptions(stripe_subscription_id);

-- Scores History
CREATE INDEX idx_scores_history_empreendimento ON public.scores_history(empreendimento_id);
CREATE INDEX idx_scores_history_calculated ON public.scores_history(calculated_at DESC);

-- Analytics
CREATE INDEX idx_analytics_user ON public.analytics(user_id);
CREATE INDEX idx_analytics_event ON public.analytics(event_type);
CREATE INDEX idx_analytics_created ON public.analytics(created_at DESC);
CREATE INDEX idx_analytics_event_data ON public.analytics USING GIN(event_data);

-- JSONB indexes
CREATE INDEX idx_empreendimentos_fatores_pos ON public.empreendimentos USING GIN(fatores_positivos);
CREATE INDEX idx_empreendimentos_fatores_neg ON public.empreendimentos USING GIN(fatores_negativos);

-- ============================================
-- 3. FUNCTIONS
-- ============================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'phone'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user can analyze
CREATE OR REPLACE FUNCTION public.can_analyze(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_plan TEXT;
  current_count INTEGER;
  current_limit INTEGER;
BEGIN
  SELECT plan, monthly_analyses_count, monthly_analyses_limit
  INTO user_plan, current_count, current_limit
  FROM public.profiles
  WHERE id = user_uuid;

  IF user_plan IN ('pro', 'enterprise') THEN
    RETURN true;
  END IF;

  RETURN current_count < current_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment analysis count
CREATE OR REPLACE FUNCTION public.increment_analysis_count(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.profiles
  SET monthly_analyses_count = monthly_analyses_count + 1
  WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Reset monthly analyses (for cron)
CREATE OR REPLACE FUNCTION public.reset_monthly_analyses()
RETURNS VOID AS $$
BEGIN
  UPDATE public.profiles
  SET monthly_analyses_count = 0,
      last_analysis_reset_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create notification helper
CREATE OR REPLACE FUNCTION public.create_notification(
  p_user_id UUID,
  p_type TEXT,
  p_title TEXT,
  p_message TEXT,
  p_action_url TEXT DEFAULT NULL,
  p_action_label TEXT DEFAULT NULL,
  p_metadata JSONB DEFAULT NULL
)
RETURNS BIGINT AS $$
DECLARE
  notification_id BIGINT;
BEGIN
  INSERT INTO public.notifications (user_id, type, title, message, action_url, action_label, metadata)
  VALUES (p_user_id, p_type, p_title, p_message, p_action_url, p_action_label, p_metadata)
  RETURNING id INTO notification_id;

  RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 4. TRIGGERS
-- ============================================

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_empreendimentos_updated_at
  BEFORE UPDATE ON public.empreendimentos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolio_imoveis_updated_at
  BEFORE UPDATE ON public.portfolio_imoveis
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 5. ROW LEVEL SECURITY
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.empreendimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrichment_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_imoveis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_historico_valores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_transacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bairros_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scores_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Profiles: user can read/update own
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Empreendimentos: public visible to all authenticated, premium to subscribers
CREATE POLICY "Authenticated users can view active empreendimentos"
  ON public.empreendimentos FOR SELECT
  TO authenticated
  USING (status = 'ativo' AND (visibilidade = 'publico' OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND plan IN ('basico', 'pro', 'enterprise')
  )));

-- Enrichment data: accessible with empreendimento
CREATE POLICY "Authenticated users can view enrichment data"
  ON public.enrichment_data FOR SELECT
  TO authenticated
  USING (true);

-- Portfolio: user can CRUD own
CREATE POLICY "Users can view own portfolio"
  ON public.portfolio_imoveis FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own portfolio"
  ON public.portfolio_imoveis FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolio"
  ON public.portfolio_imoveis FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own portfolio"
  ON public.portfolio_imoveis FOR DELETE
  USING (auth.uid() = user_id);

-- Portfolio histórico: via portfolio ownership
CREATE POLICY "Users can view own portfolio history"
  ON public.portfolio_historico_valores FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.portfolio_imoveis WHERE id = imovel_id AND user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own portfolio history"
  ON public.portfolio_historico_valores FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.portfolio_imoveis WHERE id = imovel_id AND user_id = auth.uid()
  ));

-- Portfolio transacoes: via portfolio ownership
CREATE POLICY "Users can view own transactions"
  ON public.portfolio_transacoes FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.portfolio_imoveis WHERE id = imovel_id AND user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own transactions"
  ON public.portfolio_transacoes FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.portfolio_imoveis WHERE id = imovel_id AND user_id = auth.uid()
  ));

CREATE POLICY "Users can update own transactions"
  ON public.portfolio_transacoes FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.portfolio_imoveis WHERE id = imovel_id AND user_id = auth.uid()
  ));

CREATE POLICY "Users can delete own transactions"
  ON public.portfolio_transacoes FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.portfolio_imoveis WHERE id = imovel_id AND user_id = auth.uid()
  ));

-- Bairros analytics: public read
CREATE POLICY "Authenticated users can view bairros analytics"
  ON public.bairros_analytics FOR SELECT
  TO authenticated
  USING (true);

-- Watchlist: user can CRUD own
CREATE POLICY "Users can view own watchlist"
  ON public.watchlist FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own watchlist"
  ON public.watchlist FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own watchlist"
  ON public.watchlist FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own watchlist"
  ON public.watchlist FOR DELETE
  USING (auth.uid() = user_id);

-- Notifications: user can read/update own
CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Subscriptions: user can read own
CREATE POLICY "Users can view own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Scores history: public read for authenticated
CREATE POLICY "Authenticated users can view scores history"
  ON public.scores_history FOR SELECT
  TO authenticated
  USING (true);

-- Analytics: insert only (admin reads via service role)
CREATE POLICY "Authenticated users can insert analytics"
  ON public.analytics FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ============================================
-- 6. VIEWS
-- ============================================

CREATE OR REPLACE VIEW public.vw_empreendimentos_completos AS
SELECT
  e.*,
  ed.escolas_1km,
  ed.hospitais_1km,
  ed.metro_distancia,
  ed.metro_linha,
  ed.shopping_distancia,
  ed.concorrentes_bairro,
  ed.preco_medio_bairro,
  ed.preco_vs_bairro,
  ed.saturacao_score,
  ed.renda_media_cep,
  ed.crescimento_populacional,
  COALESCE(wc.watchlist_count, 0) AS watchlist_count
FROM public.empreendimentos e
LEFT JOIN public.enrichment_data ed ON ed.empreendimento_id = e.id
LEFT JOIN (
  SELECT empreendimento_id, COUNT(*) AS watchlist_count
  FROM public.watchlist
  GROUP BY empreendimento_id
) wc ON wc.empreendimento_id = e.id;

CREATE OR REPLACE VIEW public.vw_user_stats AS
SELECT
  p.id AS user_id,
  p.full_name,
  p.plan,
  COALESCE(w.watchlist_count, 0) AS watchlist_count,
  COALESCE(n.unread_count, 0) AS unread_notifications,
  COALESCE(pi.portfolio_count, 0) AS portfolio_count,
  COALESCE(pi.portfolio_value, 0) AS portfolio_total_value
FROM public.profiles p
LEFT JOIN (
  SELECT user_id, COUNT(*) AS watchlist_count FROM public.watchlist GROUP BY user_id
) w ON w.user_id = p.id
LEFT JOIN (
  SELECT user_id, COUNT(*) AS unread_count FROM public.notifications WHERE read_at IS NULL GROUP BY user_id
) n ON n.user_id = p.id
LEFT JOIN (
  SELECT user_id, COUNT(*) AS portfolio_count, SUM(valor_atual_estimado) AS portfolio_value
  FROM public.portfolio_imoveis GROUP BY user_id
) pi ON pi.user_id = p.id;

-- ============================================
-- 7. SEED DATA (15 empreendimentos em Fortaleza)
-- ============================================

INSERT INTO public.empreendimentos (nome, slug, endereco, bairro, cidade, estado, lat, lng, construtora, preco, metragem, preco_m2, quartos, suites, vagas, entrega_prevista, score, valorizacao_min, valorizacao_max, confianca, recomendacao, status, imagem_principal) VALUES
('Residencial Atlântico Prime', 'residencial-atlantico-prime', 'Rua Silva Jatahy, 600', 'Meireles', 'Fortaleza', 'CE', -3.7245, -38.5100, 'MRV Engenharia', 580000, 95, 6105, 3, 2, 2, '2027-06-01', 87, 32, 45, 'alta', 'COMPRAR', 'ativo', '/placeholder-imovel.jpg'),
('Condomínio Vivace', 'condominio-vivace', 'Av. Eng. Santana Jr, 1200', 'Cocó', 'Fortaleza', 'CE', -3.7430, -38.4870, 'Diagonal Engenharia', 385000, 68, 5662, 2, 1, 1, '2027-03-01', 91, 38, 52, 'alta', 'COMPRAR', 'ativo', '/placeholder-imovel.jpg'),
('BS Design 10', 'bs-design-10', 'Rua Desembargador Leite Albuquerque, 100', 'Aldeota', 'Fortaleza', 'CE', -3.7320, -38.5180, 'BSPar', 620000, 82, 7561, 3, 1, 2, '2026-12-01', 62, 10, 18, 'media', 'ANALISAR', 'ativo', '/placeholder-imovel.jpg'),
('Essenza Residence', 'essenza-residence', 'Rua Coronel Jucá, 500', 'Aldeota', 'Fortaleza', 'CE', -3.7350, -38.5200, 'Terra Brasilis', 450000, 72, 6250, 2, 1, 1, '2027-09-01', 58, 8, 15, 'media', 'ANALISAR', 'ativo', '/placeholder-imovel.jpg'),
('Parque das Flores', 'parque-das-flores', 'Av. Washington Soares, 3500', 'Edson Queiroz', 'Fortaleza', 'CE', -3.7710, -38.4780, 'Rossi Residencial', 320000, 55, 5818, 2, 1, 1, '2027-01-01', 78, 25, 38, 'alta', 'COMPRAR', 'ativo', '/placeholder-imovel.jpg'),
('TLA Meireles', 'tla-meireles', 'Av. Beira Mar, 2400', 'Meireles', 'Fortaleza', 'CE', -3.7230, -38.5060, 'C. Rolim Engenharia', 890000, 120, 7417, 4, 3, 3, '2028-01-01', 72, 15, 28, 'media', 'ANALISAR', 'ativo', '/placeholder-imovel.jpg'),
('Cidade Jardim', 'cidade-jardim', 'Rua Frei Mansueto, 300', 'Varjota', 'Fortaleza', 'CE', -3.7290, -38.5020, 'Moura Dubeux', 510000, 85, 6000, 3, 2, 2, '2027-06-01', 83, 28, 40, 'alta', 'COMPRAR', 'ativo', '/placeholder-imovel.jpg'),
('Gran Vista Park', 'gran-vista-park', 'Av. Santos Dumont, 5000', 'Papicu', 'Fortaleza', 'CE', -3.7380, -38.4950, 'Colmeia Engenharia', 290000, 52, 5577, 2, 1, 1, '2026-09-01', 85, 30, 42, 'alta', 'COMPRAR', 'ativo', '/placeholder-imovel.jpg'),
('Porto Belo', 'porto-belo', 'Rua Torres Câmara, 200', 'Dionísio Torres', 'Fortaleza', 'CE', -3.7400, -38.5120, 'Porto Freire', 720000, 105, 6857, 3, 2, 2, '2027-12-01', 68, 12, 22, 'media', 'ANALISAR', 'ativo', '/placeholder-imovel.jpg'),
('Viva Parque', 'viva-parque', 'Av. Dedé Brasil, 1800', 'Passaré', 'Fortaleza', 'CE', -3.7850, -38.5300, 'Direcional', 220000, 45, 4889, 2, 1, 1, '2026-06-01', 74, 20, 35, 'media', 'ANALISAR', 'ativo', '/placeholder-imovel.jpg'),
('Allegro Living', 'allegro-living', 'Rua Vicente Leite, 800', 'Mucuripe', 'Fortaleza', 'CE', -3.7260, -38.5030, 'Patrimar', 480000, 78, 6154, 2, 1, 2, '2027-08-01', 80, 26, 38, 'alta', 'COMPRAR', 'ativo', '/placeholder-imovel.jpg'),
('Solar do Cocó', 'solar-do-coco', 'Rua Padre Valdevino, 1500', 'Cocó', 'Fortaleza', 'CE', -3.7450, -38.4900, 'Marquise', 420000, 70, 6000, 2, 1, 1, '2027-04-01', 88, 35, 48, 'alta', 'COMPRAR', 'ativo', '/placeholder-imovel.jpg'),
('Metropolitan', 'metropolitan', 'Av. Abolição, 2500', 'Meireles', 'Fortaleza', 'CE', -3.7255, -38.5080, 'Tecnisa', 750000, 108, 6944, 3, 2, 2, '2028-03-01', 70, 14, 25, 'media', 'ANALISAR', 'ativo', '/placeholder-imovel.jpg'),
('Villa Toscana', 'villa-toscana', 'Rua Beni de Carvalho, 300', 'Guararapes', 'Fortaleza', 'CE', -3.7500, -38.4830, 'Mota Machado', 340000, 58, 5862, 2, 1, 1, '2027-02-01', 76, 22, 34, 'media', 'COMPRAR', 'ativo', '/placeholder-imovel.jpg'),
('Praia Formosa Residence', 'praia-formosa-residence', 'Av. Historiador Raimundo Girão, 800', 'Praia de Iracema', 'Fortaleza', 'CE', -3.7210, -38.5140, 'Bspar', 550000, 88, 6250, 3, 2, 2, '2027-10-01', 45, 5, 12, 'baixa', 'EVITAR', 'ativo', '/placeholder-imovel.jpg');

-- Enrichment data for each empreendimento
INSERT INTO public.enrichment_data (empreendimento_id, escolas_1km, hospitais_1km, supermercados_1km, farmacias_1km, metro_distancia, metro_linha, shopping_distancia, shopping_nome, concorrentes_bairro, preco_medio_bairro, preco_vs_bairro, saturacao_score, renda_media_cep, populacao_bairro, crescimento_populacional) VALUES
(1, 12, 3, 5, 8, 800, 'Linha Leste', 500, 'Shopping Aldeota', 5, 6200, -1.5, 45, 8500, 42000, 3.2),
(2, 8, 2, 4, 6, 380, 'Linha Sul', 1200, 'Shopping RioMar', 2, 5800, -2.4, 20, 7200, 38000, 5.8),
(3, 15, 4, 6, 10, 1200, 'Linha Leste', 300, 'Shopping Aldeota', 8, 7800, -3.1, 72, 9500, 55000, 1.2),
(4, 14, 3, 5, 9, 1100, 'Linha Leste', 400, 'Shopping Aldeota', 8, 7800, -19.9, 72, 9500, 55000, 1.2),
(5, 6, 1, 3, 4, 2500, NULL, 800, 'Shopping Via Sul', 3, 5200, 11.9, 30, 5800, 28000, 8.5),
(6, 12, 3, 5, 8, 900, 'Linha Leste', 600, 'Shopping Aldeota', 5, 6200, 19.6, 45, 8500, 42000, 3.2),
(7, 10, 2, 6, 7, 700, 'Linha Leste', 400, 'Shopping Aldeota', 4, 6500, -7.7, 35, 8000, 35000, 4.5),
(8, 7, 2, 3, 5, 500, 'Linha Leste', 1000, 'Shopping RioMar', 3, 5500, 1.4, 25, 6500, 30000, 6.2),
(9, 11, 3, 4, 7, 1500, NULL, 800, 'Shopping Del Paseo', 6, 7000, -2.0, 55, 8800, 45000, 2.1),
(10, 4, 1, 2, 3, 3000, NULL, 2000, 'Shopping Parangaba', 2, 4500, 8.6, 15, 3800, 22000, 12.5),
(11, 9, 2, 4, 6, 600, 'Linha Leste', 700, 'Shopping RioMar', 4, 6000, 2.6, 35, 7500, 32000, 4.8),
(12, 8, 2, 4, 6, 350, 'Linha Sul', 1100, 'Shopping RioMar', 2, 5800, 3.4, 18, 7200, 38000, 5.8),
(13, 12, 3, 5, 8, 850, 'Linha Leste', 550, 'Shopping Aldeota', 5, 6200, 12.0, 45, 8500, 42000, 3.2),
(14, 7, 1, 3, 5, 1800, NULL, 600, 'Shopping RioMar', 3, 5600, 4.7, 28, 6800, 33000, 5.5),
(15, 10, 2, 4, 7, 2000, NULL, 900, 'Shopping Praia de Iracema', 7, 6300, -0.8, 65, 7000, 40000, 0.8);

-- Bairros analytics
INSERT INTO public.bairros_analytics (bairro, cidade, preco_medio_m2, variacao_mensal, variacao_anual, lancamentos_ativos, lancamentos_pipeline_6m, saturacao_score, renda_media, crescimento_renda, populacao, score_bairro, tendencia, recomendacao_acao, data_referencia) VALUES
('Meireles', 'Fortaleza', 6200, 1.2, 14.5, 5, 2, 45, 8500, 6.2, 42000, 72, 'estavel', 'MANTER', '2026-03-01'),
('Cocó', 'Fortaleza', 5800, 2.1, 22.8, 2, 3, 20, 7200, 8.5, 38000, 88, 'subindo', 'AUMENTAR', '2026-03-01'),
('Aldeota', 'Fortaleza', 7800, 0.3, 5.2, 8, 3, 72, 9500, 3.1, 55000, 55, 'caindo', 'REDUZIR', '2026-03-01'),
('Edson Queiroz', 'Fortaleza', 5200, 1.8, 18.5, 3, 2, 30, 5800, 10.2, 28000, 78, 'subindo', 'AUMENTAR', '2026-03-01'),
('Varjota', 'Fortaleza', 6500, 1.5, 16.2, 4, 1, 35, 8000, 7.5, 35000, 80, 'subindo', 'AUMENTAR', '2026-03-01'),
('Papicu', 'Fortaleza', 5500, 2.0, 20.5, 3, 2, 25, 6500, 9.0, 30000, 82, 'subindo', 'AUMENTAR', '2026-03-01'),
('Dionísio Torres', 'Fortaleza', 7000, 0.5, 8.0, 6, 2, 55, 8800, 4.5, 45000, 65, 'estavel', 'MANTER', '2026-03-01'),
('Passaré', 'Fortaleza', 4500, 2.5, 28.0, 2, 1, 15, 3800, 14.0, 22000, 75, 'subindo', 'AUMENTAR', '2026-03-01'),
('Mucuripe', 'Fortaleza', 6000, 1.3, 15.0, 4, 2, 35, 7500, 6.8, 32000, 77, 'subindo', 'AUMENTAR', '2026-03-01'),
('Guararapes', 'Fortaleza', 5600, 1.6, 17.5, 3, 1, 28, 6800, 7.8, 33000, 76, 'subindo', 'AUMENTAR', '2026-03-01'),
('Praia de Iracema', 'Fortaleza', 6300, -0.2, -2.5, 7, 4, 65, 7000, 1.2, 40000, 42, 'caindo', 'EVITAR', '2026-03-01');
