import Link from "next/link"
import { FuturisticInput } from "@/components/login/futuristic-input"
import { AuthButton } from "@/components/login/auth-button"
import { SocialButton } from "@/components/login/social-button"
import { ArrowLeft, ShieldIcon } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(38,99,235,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 -z-10 bg-grid-black/[0.02] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>

      {/* Back to home link */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-md font-medium text-black/70 hover:text-blue-600 transition-colors"
        aria-label="Return to home page"
      >
        <ArrowLeft className="size-4" />
        <span>De volta para casa</span>
      </Link>

      {/* Login container */}
      <div className="w-full max-w-md px-4 py-8 sm:px-0">
        {/* Header/Logo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex items-center justify-center size-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mb-4">
            <ShieldIcon className="size-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Segurança FHCD</h1>
          <p className="text-sm text-black/60 mt-1">Acesse seu painel seguro</p>
        </div>

        {/* Login card */}
        <div className="relative overflow-hidden rounded-2xl border border-black/5 bg-white/80 backdrop-blur-sm shadow-xl">
          {/* Shiny border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>

          <div className="relative p-6">
            <h2 className="mb-6 text-xl font-semibold">Entre na sua conta</h2>

            <form className="space-y-5">
              <FuturisticInput id="email" type="email" label="Email address" autoComplete="email" required />

              <FuturisticInput
                id="password"
                type="password"
                label="Password"
                autoComplete="current-password"
                required
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="size-4 rounded border-black/20 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-black/70">
                    Lembre de mim
                  </label>
                </div>

                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Esqueceu sua senha?
                </Link>
              </div>

              <AuthButton type="submit" className="w-full">
                Entrar
              </AuthButton>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-black/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-black/60">Ou continue com</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <SocialButton provider="google" />
                <SocialButton provider="github" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-black/60">
          Não tem uma conta?{" "}
          <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
            Inscrever-se
          </Link>
        </div>

        {/* Terms and privacy */}
        <div className="mt-4 text-center text-xs text-black/40">
          Ao fazer login, você concorda com nossos{" "}
          <Link href="/terms" className="underline hover:text-black/60 transition-colors">
            Termos de serviço
          </Link>{" "}
            e{" "}
          <Link href="/privacy" className="underline hover:text-black/60 transition-colors">
            Política de Privacidade
          </Link>
        </div>
      </div>
    </div>
  )
}