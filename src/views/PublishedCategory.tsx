import { Card, Image, Spin, Typography, Descriptions, Tag, Row, Button, Rate, Form, Select, Col } from "antd"
import moment from "moment";
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { getPostById } from "../api";
import { updatePost } from "../api/Post";
import { Video } from "../components/Video";
import { CATEGORIES, STATUSES } from "../constans";
import { IPost } from "../interfaces/Post";

const { Title, Paragraph, Text, Link } = Typography;
const { PreviewGroup } = Image;

export const PublishedCategory = () => {
  const [layoutLoading, setLayoutLoading] = useState(true)
  const [post, setPost] = useState<IPost>()
  const [form] = Form.useForm();

  const { id } = useParams()

  const handleUpdatePost = (values: any) => {

    console.log(values.role)

    let adminScore = post?.adminScore
    let juryScore = post?.juryScore

    if (values.role === 'jury') {
      juryScore = values.score
    } else {
      adminScore = values.score
    }

    if (!post?._id) return
    updatePost(post?._id, { ...values, adminScore, juryScore })
      .then(({ data }) => {
        toast.success('Publicacion Enviada con Exito! 🚀', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        console.log(data)
      }
      )
      .catch((error) => console.log(error))
      .finally()
  }


  useEffect(() => {
    if (!id) return
    getPostById(id)
      .then(({ data }) => {
        setPost(data)
        console.log(data)
      })
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
        justifyContent: 'start',
        gap: '10px'
      }}>
        <PreviewGroup>
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
      <div style={{
        display: 'flex',
        justifyContent: 'start',
        margin: '20px 0'
      }}>
        {post?.videos.map((url, i) => (
          <Video height={480} width={720} src={url} key={i} />
        ))}
      </div>
      <Row gutter={10}>
        <Form
          style={{ width: '100%' }}
          form={form}
          layout="horizontal"
          onFinish={handleUpdatePost}
          initialValues={{
            status: post?.status,
            role: 'admin',
            score: form.getFieldValue('role') === 'jury' ? post?.juryScore : post?.adminScore,
          }}
        >
          <Row gutter={12}>
            <Col xs={12} md={6}>
              <Form.Item label='Estado' name="status" >
                <Select options={STATUSES.map(({ id, name }) => ({ value: id, label: name }))} />
              </Form.Item>
            </Col>
            <Col xs={12} md={6}>
              <Form.Item label='Role' name="role" >
                <Select
                  onChange={(role) => role === 'jury' ? form.setFieldValue('score', post?.juryScore) : form.setFieldValue('score', post?.adminScore)}
                  options={[
                    {
                      value: 'jury',
                      label: 'Jurado'
                    },
                    {
                      value: 'admin',
                      label: 'Essence'
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={12} md={6}>
              <Form.Item label='Puntuación' name="score" >
                <Rate />
              </Form.Item>
            </Col>
            <Col xs={12} md={6}>
              <Button block type="primary" htmlType="submit">
                Enviar
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </Card >
  )
}