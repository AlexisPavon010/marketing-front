import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import { FormScreen, FormUpdate, Home, PublishedCategory } from '../views'

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
      <Route path="/update-categories/:id" element={<FormUpdate />} />
      <Route path="/categories/published/:id" element={<PublishedCategory />} />
    </Routes>
  )
}
