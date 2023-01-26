import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"

import { LayoutComponent } from "../components/Layout"
import { store } from "../store"
import { PublicRoute } from "./PublicRoute"
import { PrivateRoute } from "./PrivateRoute"
import { DashboardRouter } from "./DashboardRouter"
import { Login } from "../views"

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
                  <DashboardRouter />
                </LayoutComponent>
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
    </BrowserRouter >
  )
}


const RouterLayout = () => {
  return (
    <div></div>
  )
}

const RouterLogin = () => {
  return (
    <div></div>
  )
}
