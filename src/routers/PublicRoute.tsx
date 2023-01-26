import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";


interface PublicRouteProps {
  children: ReactElement;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { uid } = useSelector((state: any) => state.auth)

  return (
    (!uid)
      ? children
      : <Navigate to='/' />
  )
}
