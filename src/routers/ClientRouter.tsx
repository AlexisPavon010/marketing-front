import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import { FormScreen, Home } from '../views'

export const ClientRouter = () => {
  const user = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!user.uid) return;
    localStorage.setItem('user', JSON.stringify(user));
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories/:id" element={<FormScreen />} />
    </Routes>
  )
}
