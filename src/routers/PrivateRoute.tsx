import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from "react-router-dom";


interface PrivateRouteProps {
  children: ReactElement;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { uid, role } = useSelector((state: any) => state.auth)
  const { pathname } = useLocation()

  if (!uid) {
    return <Navigate to="/login" />
  } else if (pathname === '/dashboard' && role == 'user') {
    return <Navigate to="/" />
  } else if (pathname === '/' && role == 'admin') {
    return <Navigate to="/dashboard" />
  }
  return children
}
