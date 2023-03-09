import { Card, Image, Spin, Typography, Descriptions, Tag, Row, Button, Rate, Form, Select, Col, Space, Tooltip } from "antd"
import { useNavigate, useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { FiDownload } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify";
import moment from "moment";

import { CATEGORIES, STATUSES } from "../constans";
import { Video } from "../components/Video";
import { IPost } from "../interfaces/Post";
import { updatePost } from "../api/Post";
import { getPostById } from "../api";
import { Questions } from "../components/Questions";
import { useSelector } from "react-redux";
import { BsTrash } from "react-icons/bs";
import { DeletedModal } from "../components/Modals";

const { Title, Paragraph } = Typography;
const { PreviewGroup } = Image;

export const PublishedCategory = ({ adminView = false }: { adminView?: boolean }) => {
  const [openModal, setOpenModal] = useState<{ visible: boolean; id: string | null }>({ visible: false, id: null })
  const { role } = useSelector((state: any) => state.auth)
  const [layoutLoading, setLayoutLoading] = useState(true)
  const [post, setPost] = useState<IPost>()
  const [form] = Form.useForm();
  const navigate = useNavigate()

  const { id } = useParams()

  const handleUpdatePost = (values: any) => {

    if (!post?._id) return
    updatePost(post?._id, values)
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
        navigate('/dashboard')
      }
      )
      .catch((error) => console.log(error))
      .finally()
  }

  const handleDeleted = (id: string) => {
    setOpenModal({ visible: true, id: id })
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
    <>
      <Card style={{ marginBottom: '20px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)' }}>
        <Row>
          <Col>
            <Link to={adminView ? '/dashboard' : '/'}>
              <BiArrowBack size={26} />
            </Link>
          </Col>
          <Col flex={1}></Col>
          <Col>
            <Space>
              <Link target='_blank' to={`/view/${id}`}>
                <Tooltip title="Descargar PDF">
                  <FiDownload size={26} />
                </Tooltip>
              </Link>
              {role === 'jury' && (
                <Tooltip title="Eliminar">
                  <BsTrash onClick={() => handleDeleted(id!)} size={24} color='gray' cursor='pointer' />
                </Tooltip>
              )}
            </Space>
          </Col>
        </Row>
        <Descriptions title="Información">
          <Descriptions.Item label="Usuario">
            {/* <Avatar src={post?.photoURL ? post.photoURL : null}>
            {post?.username ? post.username : post?.email?.charAt(0).toUpperCase()}
          </Avatar> */}
            {post?.username ? post.username : post?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Categoria">
            {/* @ts-ignore  */}
            <Tag color="cyan">{CATEGORIES.find(({ id }) => id === post?.categories).name}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Marca">
            <Tag color="orange">{post?.brand}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Fecha">{moment(post?.createdAt).format('DD/MM/YYYY, h:mm:ss a')}</Descriptions.Item>
          <Descriptions.Item label="Estado">
            {/* @ts-ignore  */}
            <Tag color={STATUSES.find(({ id }) => id === post?.status).color}>{STATUSES.find(({ id }) => id === post?.status).name}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Score">
            <Tag color="blue">{post?.juryScore}</Tag>
          </Descriptions.Item>
        </Descriptions>
        <Typography>
          <Title level={5}>Titulo</Title>
          <Paragraph>
            {post?.title}
          </Paragraph>
          <Title level={5}>Descripcion</Title>
          <Paragraph>
            {post?.description}
          </Paragraph>
          <Title level={5}>Duración</Title>
          <Paragraph>
            {post?.duration! == 1 ? `${post?.duration} Semana` : `${post?.duration} Semanas`}
          </Paragraph>
          <Title level={5}>Core Target</Title>
          <Paragraph>
            {post?.core_target}
          </Paragraph>
          <Title level={5}>Resultado</Title>
          <Paragraph>
            {post?.result}
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
        {adminView ? (
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
                  {/* <Form.Item label='Role' name="role" >
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
                </Form.Item> */}
                </Col>
                <Col xs={12} md={6}>
                  <Form.Item label='Puntuación' name="adminScore" >
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
        ) : null}
      </Card >
      {role === 'jury' && (
        <Questions id={id!} post={post!} />
      )}
      <DeletedModal
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  )
}