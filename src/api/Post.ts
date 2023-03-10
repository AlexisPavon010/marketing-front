import axios from "axios"

export const BASE_URL = process.env.REACT_APP_BASE_URL

export const createPost = (payload: any) => {
  return axios.post(`${BASE_URL}/api/posts`, payload)
}

export const getPosts = (limit?: any, skip?: any, category?: string, brand?: string) => {
  let query: any = { skip, limit }
  if (category) {
    query = {
      ...query,
      category
    }
  }
  if (brand) {
    query = {
      ...query,
      brand
    }
  }
  const urlParams = new URLSearchParams(query)
  return axios.get(`${BASE_URL}/api/posts?${urlParams.toString()}`)
}

export const sendReview = (id: string, payload: any) => {
  return axios.post(`${BASE_URL}/api/posts/review/${id}`, payload)
}

export const getPostById = (id: string) => {
  return axios.get(`${BASE_URL}/api/posts/${id}`)
}

export const getPostByUserId = (id: string, skip: any, limit: any, brand: string, category: string) => {
  let query: any = { skip, limit }
  if (category) {
    query = {
      ...query,
      category
    }
  }
  if (brand) {
    query = {
      ...query,
      brand
    }
  }
  const urlParams = new URLSearchParams(query)
  return axios.get(`${BASE_URL}/api/posts/user/${id}?${urlParams.toString()}`)
}

export const updatePost = (id: string, payload: any) => {
  return axios.patch(`${BASE_URL}/api/posts/${id}`, payload)
}

export const deletedPost = (id: string) => {
  console.log(id)
  return axios.delete(`${BASE_URL}/api/posts/${id}`)
}