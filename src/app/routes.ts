import { createBrowserRouter, redirect } from 'react-router';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { ManagementPage } from './pages/ManagementPage';
import { TOKEN_KEY } from './contexts/AuthContext';

function requireAuth() {
  const token = localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);
  if (!token) return redirect('/login');
  return null;
}

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
    loader: requireAuth,
    Component: ManagementPage,
  },
]);
