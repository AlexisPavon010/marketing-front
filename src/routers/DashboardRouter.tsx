import { Routes, Route } from 'react-router-dom'
import { useSelector } from "react-redux"
import { useEffect } from "react"

import { Home, Questions, Table } from '../views'

export const DashboardRouter = () => {
  const user = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!user.uid) return;
    localStorage.setItem('user', JSON.stringify(user));
  }, [])
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/table" element={<Table />} />
    </Routes>
  )
}
