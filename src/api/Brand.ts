import axios from "axios"

const BASE_URL = process.env.REACT_APP_BASE_URL

export const createBrand = (payload: any) => {
  return axios.post(`${BASE_URL}/api/brands`, payload)
}

export const getBrands = () => {
  return axios.get(`${BASE_URL}/api/brands`)
}