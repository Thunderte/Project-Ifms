import { createBrowserRouter, redirect } from 'react-router';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { ManagementPage } from './pages/ManagementPage';

export const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/inicio'),
  },
  {
    path: '/inicio',
    Component: HomePage,
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/gerenciamento',
    Component: ManagementPage,
  },
]);
