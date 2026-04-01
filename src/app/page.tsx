import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-border bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Valor<span className="text-gray-900 dark:text-white">IA</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Planos
            </Link>
            <ThemeToggle />
            <Button variant="ghost" render={<Link href="/login" />}>Entrar</Button>
            <Button render={<Link href="/signup" />}>Criar Conta</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Invista em imóveis com{" "}
            <span className="text-blue-600 dark:text-blue-400">inteligência</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Pare de comprar apartamentos na planta baseado em propaganda.
            Use dados reais e IA para encontrar as melhores oportunidades
            de valorização em Fortaleza.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" render={<Link href="/signup" />}>Começar Grátis</Button>
            <Button variant="outline" size="lg" render={<Link href="/pricing" />}>Ver Planos</Button>
          </div>
        </div>

        {/* Features */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl bg-white/50 dark:bg-white/5 border border-transparent dark:border-white/10">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Descoberta</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Mapa interativo com score de valorização para cada empreendimento
            </p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/50 dark:bg-white/5 border border-transparent dark:border-white/10">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Portfolio</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Gerencie seus imóveis, acompanhe valorização e renda em tempo real
            </p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/50 dark:bg-white/5 border border-transparent dark:border-white/10">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Estratégia</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Recomendações personalizadas de compra e venda baseadas em IA
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-white dark:bg-gray-950 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-500 dark:text-gray-500">
          ValorIA. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
