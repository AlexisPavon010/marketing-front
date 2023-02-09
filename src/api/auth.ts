import axios from "axios"

const BASE_URL = process.env.REACT_APP_BASE_URL

export const register = (payload: any) => {
  return axios.post(`${BASE_URL}/api/auth/register`, payload)
}

export const login = (payload: any) => {
  return axios.post(`${BASE_URL}/api/auth/login`, payload)
}

export const updatedRole = (payload: any)=> {
  return axios.post(`${BASE_URL}/api/auth/login`, payload)
}