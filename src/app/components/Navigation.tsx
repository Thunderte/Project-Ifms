import { Home, Search, Calendar, Users } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Início', path: '/inicio' },
    { icon: Search, label: 'Cadastro', path: '/gerenciamento/cadastro' },
    { icon: Calendar, label: 'Reservas', path: '/gerenciamento/reservas' },
    { icon: Users, label: 'Usuários', path: '/gerenciamento/usuarios' },
  ];

  return (
    <nav className="bg-[#1f3c68] px-6">
      <div className="flex items-center gap-8">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 py-4 text-white text-sm transition-colors ${
                isActive ? 'border-b-2 border-white' : 'hover:bg-white/10'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}