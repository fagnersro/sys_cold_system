import Image from "next/image"
import Link from "next/link"
import { FuturisticCard } from "@/components/futuristic-card"
import { FuturisticButton } from "@/components/futuristic-button"
import { GlobeIcon, ZapIcon, ShieldIcon, ArrowRightIcon } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-black/5">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative size-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">F</div>
            </div>
            <span className="font-bold text-xl">FHCD</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Características
            </Link>
            <Link href="#product" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Produtos
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Sobre
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="#contact" className="hidden sm:block text-sm font-medium hover:text-blue-600 transition-colors">
              Contato
            </Link>
            <Link href="/login">
              <FuturisticButton>Começar</FuturisticButton>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(38,99,235,0.1),transparent_50%)]"></div>
          <div className="container flex flex-col items-center text-center">
            <div className="inline-flex items-center rounded-full border border-black/5 bg-white px-3 py-1 text-sm shadow-sm mb-6">
              <span className="rounded-full bg-blue-600 px-1.5 py-0.5 text-xs text-white mr-2">Novo</span>
              <span className="text-black/80">Apresentando nossa mais recente inovação</span>
            </div>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            O Futuro da Experiência Digital Está {" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Aqui</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-black/70">
              Redefina o que é possível com nossa plataforma de ponta. Integração perfeita, 
              recursos poderosos e uma interface intuitiva projetada para a próxima geração.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <FuturisticButton size="lg">
                Explorar agora
                <ArrowRightIcon className="ml-2 size-4" />
              </FuturisticButton>
              <Link
                href="#demo"
                className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-medium shadow-sm transition-colors hover:bg-black/5"
              >
                Assistir demonstração
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gradient-to-b from-white to-blue-50/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Recursos Poderosos para o Mundo Moderno
              </h2>
              <p className="max-w-2xl mx-auto text-black/70">
               Nossa plataforma combina tecnologia de ponta com design intuitivo para oferecer uma experiência de usuário incomparável.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FuturisticCard
                icon={<GlobeIcon className="size-6" />}
                title="Conectividade Global"
                description="Conecte-se perfeitamente entre dispositivos e plataformas com nossa tecnologia de sincronização avançada."
              />
              <FuturisticCard
                icon={<ZapIcon className="size-6" />}
                title="Desempenho Relâmpago"
                description="Experimente tempos de carregamento extremamente rápidos e interações responsivas otimizadas para os padrões modernos da web."
              />
              <FuturisticCard
                icon={<ShieldIcon className="size-6" />}
                title="Segurança empresarial"
                description="Fique tranquilo com criptografia de nível bancário e protocolos de segurança abrangentes protegendo seus dados."
              />
            </div>
          </div>
        </section>

        {/* Dynamic Visual Section */}
        <section id="product" className="py-20 md:py-32 overflow-hidden">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                  Reimagine o que é Possível com nossa Plataforma
                </h2>
                <p className="text-black/70 mb-6">
                 Nossa interface intuitiva e recursos poderosos trabalham juntos para criar uma experiência perfeita
                 que se adapta às suas necessidades. Descubra como nossa plataforma pode transformar seu 
                 fluxo de trabalho e aumentar a produtividade.
                </p>
                <ul className="space-y-4">
                  {[
                    "Interface intuitiva de arrastar e soltar",
                    "Ferramentas de colaboração em tempo real",
                    "Análise e relatórios avançados",
                    "Fluxos de trabalho e automação personalizáveis",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100">
                        <svg
                          className="size-4 text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <FuturisticButton>Saber mais</FuturisticButton>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative">
                <div className="relative aspect-square max-w-md mx-auto lg:max-w-none overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 p-2">
                  <div className="absolute inset-0 bg-grid-black/5 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
                  <Image
                    src="/img-dashboard.png?height=600&width=600"
                    width={600}
                    height={600}
                    alt="Product visualization"
                    className="rounded-xl object-cover"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 size-64 rounded-full bg-blue-600/20 blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-blue-50/50 to-white">
          <div className="container">
            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-12 md:px-12 md:py-16 text-center text-white">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Pronto para Começar?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-blue-100">
                Junte-se a milhares de usuários satisfeitos que transformaram sua experiência digital com nossa plataforma.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#signup"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-blue-600 shadow-sm transition-colors hover:bg-blue-50"
                >
                  Cadastre-se gratuitamente
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  Contato de vendas
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 bg-white py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative size-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold">F</div>
                </div>
                <span className="font-bold text-xl">FHCD</span>
              </Link>
              <p className="mt-2 text-sm text-black/60">© {new Date().getFullYear()} FHCD. Todos os direitos reservados.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">
              <div>
                <h3 className="font-medium mb-3">Product</h3>
                <ul className="space-y-2 text-sm text-black/60">
                  <li>
                    <Link href="#" className="hover:text-blue-600 transition-colors">
                      Características
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-blue-600 transition-colors">
                      Preços
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-blue-600 transition-colors">
                      Integrações
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3">Company</h3>
                <ul className="space-y-2 text-sm text-black/60">
                  <li>
                    <Link href="#" className="hover:text-blue-600 transition-colors">
                      Sobre
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-blue-600 transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-blue-600 transition-colors">
                      Carreiras
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3">Resources</h3>
                <ul className="space-y-2 text-sm text-black/60">
                  <li>
                    <Link href="#" className="hover:text-blue-600 transition-colors">
                      Documentação
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-blue-600 transition-colors">
                      Central de Ajuda
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-blue-600 transition-colors">
                      Comunidade
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3">Legal</h3>
                <ul className="space-y-2 text-sm text-black/60">
                  <li>
                    <Link href="#" className="hover:text-blue-600 transition-colors">
                      Privacidade
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-blue-600 transition-colors">
                      Termos
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-blue-600 transition-colors">
                      Segurança
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

