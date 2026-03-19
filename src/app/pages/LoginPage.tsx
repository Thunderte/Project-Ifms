import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Database, Loader2, LogIn, Server, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const authDefaults = {
  endpoint: 'https://api-auth.ifms.dev/v1/sessions',
  tenant: 'ifms-campo-grande',
  grantType: 'password',
  timeoutMs: 8000,
  rememberMe: true,
  email: 'visitante@ifms.edu.br',
  password: 'ifms@123',
};

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(authDefaults.email);
  const [password, setPassword] = useState(authDefaults.password);
  const [rememberMe, setRememberMe] = useState(authDefaults.rememberMe);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Informe e-mail e senha para continuar.');
      return;
    }

    const payload = {
      email,
      password,
      tenant: authDefaults.tenant,
      grant_type: authDefaults.grantType,
      remember_me: rememberMe,
    };

    setLoading(true);
    try {
      // Futuro: substituir pela chamada real de autenticacao externa.
      await new Promise(resolve => setTimeout(resolve, 900));

      console.info('Payload de autenticacao preparado', {
        endpoint: authDefaults.endpoint,
        timeoutMs: authDefaults.timeoutMs,
        payload,
      });

      navigate('/inicio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{
        fontFamily: 'var(--font-body, "Segoe UI", sans-serif)',
        background: 'linear-gradient(125deg, #f6f9ff 0%, #eef4ff 45%, #eefaf3 100%)',
      }}
    >
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #ffffff 0%, transparent 45%), radial-gradient(circle at 80% 30%, #dce9ff 0%, transparent 35%)' }} />
      <div className="absolute -left-24 top-[-4rem] h-80 w-80 rounded-full bg-[#2d5a8f]/20 blur-3xl animate-pulse" />
      <div className="absolute -right-20 bottom-[-6rem] h-96 w-96 rounded-full bg-[#28a36b]/20 blur-3xl animate-pulse" />

      <div
        className={`relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-10 md:px-8 transition-all duration-700 ${
          isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="grid w-full gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-3xl border border-white/70 bg-white/85 p-6 md:p-10 shadow-[0_24px_80px_-36px_rgba(31,60,104,0.65)] backdrop-blur-xl">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/inicio')}
              className="mb-6 -ml-3 text-[#1f3c68] hover:bg-[#1f3c68]/5"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para inicio
            </Button>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl grid grid-cols-3 gap-1 p-2 shadow-lg">
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
              </div>

              <div>
                <p className="text-sm text-[#45618a] uppercase tracking-[0.16em]">Acesso seguro</p>
                <h1 className="text-3xl font-semibold text-[#1a2f4f]" style={{ fontFamily: 'var(--font-heading, "Trebuchet MS", sans-serif)' }}>
                  Login IFMS
                </h1>
              </div>
            </div>

            <p className="text-sm text-[#5f6d82] mb-6">
              Tela preparada para autenticacao com API externa. Os campos ja iniciam com valores default para facilitar testes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#243b5d]">
                  E-mail institucional
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu.email@ifms.edu.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 border-[#c9d8eb] bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#243b5d]">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 border-[#c9d8eb] bg-white"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-center gap-2 text-sm text-[#4e6078]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-[#9fb8db] accent-[#1f3c68]"
                  />
                  Manter sessao ativa
                </label>

                <button type="button" className="text-sm text-[#1f3c68] hover:text-[#12325a] transition-colors text-left">
                  Recuperar senha
                </button>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-[#1f3c68] hover:bg-[#163056] text-white font-semibold shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Autenticando...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Entrar com conta IFMS
                  </>
                )}
              </Button>

              {errorMessage && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {errorMessage}
                </p>
              )}
            </form>

            <p className="mt-6 text-xs text-[#5f6d82] leading-relaxed">
              Ao autenticar, a aplicacao utilizara o endpoint padrao configurado nesta tela ate a API oficial ser integrada.
            </p>
          </section>

          <aside className="rounded-3xl border border-[#cddbef] bg-[#f8fbff] p-6 md:p-8 shadow-[0_20px_60px_-45px_rgba(31,60,104,0.75)]">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#e6eefb] text-[#1f3c68] px-4 py-2 text-xs font-semibold tracking-wide uppercase">
              <Shield className="w-4 h-4" />
              Modo integracao futura
            </div>

            <h2
              className="mt-5 text-3xl font-semibold text-[#1b355b]"
              style={{ fontFamily: 'var(--font-heading, "Trebuchet MS", sans-serif)' }}
            >
              Conector da API de autenticacao
            </h2>

            <p className="mt-3 text-sm text-[#5f6d82]">
              Os parametros abaixo representam a estrutura default que sera enviada para o provedor externo de login quando a integracao estiver ativa.
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-[#d6e2f3] bg-white px-4 py-3">
                <div className="text-xs uppercase tracking-wide text-[#55739b] flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  Endpoint default
                </div>
                <p className="mt-1 text-sm font-medium text-[#1f3c68] break-all">{authDefaults.endpoint}</p>
              </div>

              <div className="rounded-2xl border border-[#d6e2f3] bg-white px-4 py-3">
                <div className="text-xs uppercase tracking-wide text-[#55739b] flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Tenant e metodo
                </div>
                <p className="mt-1 text-sm text-[#1f3c68]">Tenant: {authDefaults.tenant}</p>
                <p className="text-sm text-[#1f3c68]">Grant type: {authDefaults.grantType}</p>
              </div>

              <div className="rounded-2xl border border-[#d6e2f3] bg-white px-4 py-3">
                <p className="text-sm text-[#1f3c68]">Timeout padrao: {authDefaults.timeoutMs}ms</p>
                <p className="text-sm text-[#1f3c68]">Remember me default: {rememberMe ? 'true' : 'false'}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-[#10253f] p-4 text-xs text-[#d4e2f8]">
              <p className="text-white font-semibold mb-2">Preview do payload</p>
              <pre className="whitespace-pre-wrap leading-relaxed">
{`{
  "email": "${email}",
  "tenant": "${authDefaults.tenant}",
  "grant_type": "${authDefaults.grantType}",
  "remember_me": ${rememberMe}
}`}
              </pre>
            </div>
          </aside>
        </div>
      </div>

      <div className="relative text-center pb-6 text-xs text-[#5f6d82]">
        © 2026 Instituto Federal de Mato Grosso do Sul
      </div>
    </main>
  );
}
