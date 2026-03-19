import { ArrowRight, LogIn, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router';

export function Header() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header className="bg-white/95 backdrop-blur px-4 md:px-6 py-4 flex items-center justify-between border-b border-gray-200">
      <div className="flex items-center gap-4">
        {/* Logo IFMS */}
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded grid grid-cols-3 gap-0.5 p-1">
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
        
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg">IFMS</span>
          <div className="w-px h-6 bg-gray-300"></div>
          <span className="text-sm md:text-lg">Central de Salas IFMS</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 text-xs text-[#1f3c68] bg-blue-50 border border-blue-100 px-3 py-2 rounded-full">
          <Sparkles className="w-4 h-4" />
          Acesso publico para consulta de salas
        </div>

        <Button
          onClick={handleLogin}
          className="rounded-full h-10 px-5 bg-gradient-to-r from-[#143f74] via-[#1f5ea4] to-[#1f8c6d] hover:from-[#123a68] hover:via-[#1b528f] hover:to-[#1b7a5f] text-white border border-white/20 shadow-[0_10px_24px_-14px_rgba(20,63,116,0.95)] flex items-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          Logar
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}