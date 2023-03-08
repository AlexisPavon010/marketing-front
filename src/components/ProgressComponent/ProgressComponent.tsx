import { useEffect, useState } from 'react'
import { Progress } from "antd"
import axios from "axios"

import { BASE_URL } from "../../api/Post"
import { IPost } from '../../interfaces/Post'

export const ProgressComponent = () => {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    axios.get(`${BASE_URL}/api/posts`)
      .then(({ data }) => {
        const completed = data.posts.filter((post: IPost) => post.scored === true).length
        const pending = data.posts.filter((post: IPost) => post.scored === false).length
        if (pending === 0) {
          setTotal(100)
        } else {
          setTotal(Math.round(completed / (100 - pending) * 100))
        }
      })
      .catch()
      .finally()
  }, [])

  return (
    <Progress percent={total} />
  )
}