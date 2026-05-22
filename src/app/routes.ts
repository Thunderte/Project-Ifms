import { createBrowserRouter, redirect } from 'react-router';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { ManagementCadastroPage } from './pages/ManagementCadastroPage';
import { ManagementReservasPage } from './pages/ManagementReservasPage';
import { ManagementUsuariosPage } from './pages/ManagementUsuariosPage';

export const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/inicio'),
  },
  {
    path: '/inicio',
    loader: requireAuth,
    Component: HomePage,
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/gerenciamento',
    loader: () => redirect('/gerenciamento/cadastro'),
  },
  {
    path: '/gerenciamento/cadastro',
    Component: ManagementCadastroPage,
  },
  {
    path: '/gerenciamento/reservas',
    Component: ManagementReservasPage,
  },
  {
    path: '/gerenciamento/usuarios',
    Component: ManagementUsuariosPage,
  },
]);
