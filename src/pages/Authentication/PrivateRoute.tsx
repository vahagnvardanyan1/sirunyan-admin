import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: any) => state.auth.token);

  return token ? children : <Navigate to="/auth/signin" />;
};

export default ProtectedRoute;
