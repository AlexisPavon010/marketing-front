import { Routes, Route } from 'react-router-dom'
import { useSelector } from "react-redux"
import { useEffect } from "react"

import { PublishedCategory, Questions, Table, Users } from '../views'

export const DashboardRouter = () => {
  const user = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!user.uid) return;
    localStorage.setItem('user', JSON.stringify(user));
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Table />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/users" element={<Users />} />
      <Route path='/categories'>
        <Route path="branding" element={<h1>branding</h1>} />
        <Route path="creación-de-contenido" element={<h1>creación-de-contenido</h1>} />
        <Route path="marketing-promocional" element={<h1>marketing-promocional</h1>} />
        <Route path="performance-marketing" element={<h1>performance-marketing</h1>} />
        <Route path="estrategia-de-crecimiento" element={<h1>estrategia-de-crecimiento</h1>} />
        <Route path="impacto-positivo" element={<h1>impacto-positivo</h1>} />
      </Route>
      <Route path='/categories/published/:id' element={<PublishedCategory />} />
    </Routes>
  )
}
