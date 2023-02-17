import axios from "axios"

const BASE_URL = process.env.REACT_APP_BASE_URL

export const sendWelcome = (email: string) => {
  return axios.post(`${BASE_URL}/api/email`, {
    email
  })
}

export const sendPostulation = (email: string) => {
  return axios.post(`${BASE_URL}/api/email/postulation`, {
    email
  })
}