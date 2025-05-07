import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ role }: { role?: string }) => {
  const { isAuthenticated, user } = useAuth(); // Obtendo os dados de autenticação e o usuário

  if (!isAuthenticated) {
    // Se não estiver autenticado, redireciona para login
    return <Navigate to="/login" />;
  }

  if (role && user?.role !== role) {
    // Se o usuário não tiver a role necessária (ex: 'admin'), redireciona para outra página
    return <Navigate to="/home" />;
  }

  return <Outlet />; // Se estiver autenticado, renderiza o componente da rota
};

export default ProtectedRoute;