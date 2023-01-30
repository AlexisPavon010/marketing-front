import { Card, Image, Spin, Typography, Descriptions, Tag, Avatar, Space, Row, Col, Button, Rate } from "antd"
import moment from "moment";
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getPostById } from "../api";
import { Video } from "../components/Video";
import { CATEGORIES, STATUSES } from "../constans";
import { IPost } from "../interfaces/Post";

const { Title, Paragraph, Text, Link } = Typography;
const { PreviewGroup } = Image;

export const PublishedCategory = () => {
  const [layoutLoading, setLayoutLoading] = useState(true)
  const [post, setPost] = useState<IPost>()

  const { id } = useParams()


  useEffect(() => {
    if (!id) return
    getPostById(id)
      .then(({ data }) => {
        setPost(data)
        console.log(data)
      }
      )
      .catch()
      .finally(() => setLayoutLoading(false))
  }, [])

  if (layoutLoading) return (
    <div className="loading__container">
      <Spin />
    </div>
  )


  return (
    <Card>
      <Descriptions title="Informacion">
        <Descriptions.Item label="Usuario">
          {/* <Avatar src={post?.photoURL ? post.photoURL : null}>
            {post?.displayName ? post.displayName : post?.email?.charAt(0).toUpperCase()}
          </Avatar> */}
          {post?.displayName ? post.displayName : post?.email}
        </Descriptions.Item>
        <Descriptions.Item label="Categoria">
          {/* @ts-ignore  */}
          <Tag color="green">{CATEGORIES.find(({ id }) => id === post?.categories).name}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Marca">
          <Tag color="orange">{post?.brand}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Fecha">{moment(post?.createdAt).format('DD/MM/YYYY, h:mm:ss a')}</Descriptions.Item>
        <Descriptions.Item label="Status">
          {/* @ts-ignore  */}
          <Tag color="orange">{STATUSES.find(({ id }) => id === post?.status).name}</Tag>
        </Descriptions.Item>
      </Descriptions>
      <Typography>
        <Title level={5}>Descripcion</Title>
        <Paragraph>
          {post?.description}
        </Paragraph>
      </Typography>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '10px'
      }}>
        <PreviewGroup  >
          {post?.images.map((url: string, i: number) => (
            <Image
              style={{
                aspectRatio: ' 8 / 9',
                objectFit: 'cover'
              }}
              width={180}
              key={i}
              src={url}
            />
          ))}
        </PreviewGroup>
      </div>
      <Row gutter={10}>
        {post?.videos.map((url, i) => (
          <Video height={380} width={220} src={url} key={i} />
        ))}
      </Row>
      <Row gutter={10}>
        <Col  >
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Col>
        <Col>
          <Button htmlType="button" >
            Rechazar
          </Button>
        </Col>
        <Col>
          <Rate />
        </Col>
      </Row>
    </Card>
  )
}
