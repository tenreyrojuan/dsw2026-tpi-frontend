import { Navigate } from 'react-router-dom';
import useAuth from '../hook/useAuth';

const ROLE_HOME = { ADMINISTRADOR: '/admin/home', PACIENTE: '/' };

function ProtectedRoute({ children, redirectTo = '/login', allowedRoles }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const userRole = role?.toUpperCase();

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to={ROLE_HOME[userRole] ?? redirectTo} replace />;
  }

  return children;
}

export default ProtectedRoute;
