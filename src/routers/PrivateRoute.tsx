import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";


interface PrivateRouteProps {
  children: ReactElement;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { uid } = useSelector((state: any) => state.auth)

  console.log('private')

  return (
    (!uid)
      ? <Navigate to="/login" />
      : children
  )
}
