import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { LayoutComponent } from "../components/Layout"
import { store } from "../store"
import { PublicRoute } from "./PublicRoute"
import { PrivateRoute } from "./PrivateRoute"
import { DashboardRouter } from "./DashboardRouter"
import { Login } from "../views"
import { AdminLayout } from "../components/Layout/AdminLayout"
import { ClientRouter } from "./ClientRouter"

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <LayoutComponent>
                  <ClientRouter />
                </LayoutComponent>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <AdminLayout>
                  <DashboardRouter />
                </AdminLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
        </Routes>
      </Provider>
      <ToastContainer />
    </BrowserRouter>
  )
}