import axios from "axios"

const BASE_URL = process.env.REACT_APP_BASE_URL

export const register = (payload: any) => {
  return axios.post(`${BASE_URL}/api/auth/register`, payload)
}

export const login = (payload: any) => {
  return axios.post(`${BASE_URL}/api/auth/login`, payload)
}

export const getUsers = () => {
  return axios.get(`${BASE_URL}/api/auth/users`)
}

export const updatedRole = (id: string, payload: any) => {
  return axios.post(`${BASE_URL}/api/auth/update/${id}`, payload)
}

export const resetPassword = (payload: any) => {
  return axios.post(`${BASE_URL}/api/email/reset`, payload)
}

export const recoveryPassword = (payload: any) => {
  return axios.post(`${BASE_URL}/api/email/recovery`, payload)
}