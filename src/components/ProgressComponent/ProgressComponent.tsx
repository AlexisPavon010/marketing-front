import { useEffect, useState } from 'react'
import { Progress } from "antd"
import axios from "axios"

import { BASE_URL } from "../../api/Post"
import { IPost } from '../../interfaces/Post'

export const ProgressComponent = () => {
  const [pending, setPending] = useState([])
  const total = 100 - (pending.length * 10)

  useEffect(() => {
    axios.get(`${BASE_URL}/api/posts`)
      .then(({ data }) => {
        setPending(data.posts.filter((post: IPost) => post.scored === false))
      })
      .catch()
      .finally()
  }, [])

  return (
    <Progress percent={total} />
  )
}