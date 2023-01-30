import axios from "axios"

const BASE_URL = process.env.REACT_APP_BASE_URL

export const createPost = (payload: any) => {
  return axios.post(`${BASE_URL}/api/posts`, payload)
}

export const getPosts = () => {
  return axios.get(`${BASE_URL}/api/posts`)
}

export const getPostByIdAndCategory = (id: string, category: string) => {
  return axios.get(`${BASE_URL}/api/posts/user/${id}/category/${category}`)
}

export const getPostById = (id: string) => {
  return axios.get(`${BASE_URL}/api/posts/${id}`)
}

export const updatePost = (id: string, payload: any) => {
  return axios.patch(`${BASE_URL}/api/posts/${id}`, {
    ...payload,
    published: true
  })
}
