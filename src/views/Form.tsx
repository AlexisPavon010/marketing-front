import { Button, Card, Col, Form, Result, Row, Select, Spin, Input, Typography, Alert } from 'antd'
import { useEffect, useState } from 'react';
import { BiUpload } from 'react-icons/bi';
import { BsPencilSquare } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createPost } from '../api';
import { getPostByIdAndCategory } from '../api/Post';
import { BrandSelect } from '../components/BrandSelect';
import { AlertModal } from '../components/Modals';
import { UploadImage } from '../components/UploadImage';
import { UploadVideo } from '../components/UploadVideo';
import { CATEGORIES } from '../constans';
import { IPost } from '../interfaces/Post';

const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;


const formItemLayout = {
  wrapperCol: { span: 24 },
};

export const FormScreen = () => {
  const { uid, email, displayName, photoURL, } = useSelector((state: any) => state.auth)
  const [openModal, setOpenModal] = useState(false)
  const [post, setPost] = useState<IPost>()
  const [loading, setLoading] = useState(false)
  const [loadingLayout, setLoadingLayout] = useState(true)
  const [posted, setPosted] = useState(false)
  const [form] = Form.useForm();

  const navigate = useNavigate()
  const { id: categoria } = useParams()

  const onFinish = (values: any) => {
    console.log(values, 'crear', uid)
    setOpenModal(true)
  };

  const handelUpdatePost = () => {
    console.log('updateadr')
    setLoading(true)
    createPost({ ...form.getFieldsValue(), uid, email, displayName, photoURL, })
      .then(() => {
        toast.success('Publicación Guardada con Exito! 🚀', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "light",
        });
        setLoading(false)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }


  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    console.log(categoria)
    setLoadingLayout(true)
    if (!categoria) return
    getPostByIdAndCategory(uid, categoria!)
      .then(({ data }) => {
        setPost(data)
        form.setFieldsValue(data)
        console.log(data)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoadingLayout(false))
  }, [])


  if (loadingLayout) return (
    <div className='loading__container'>
      <Spin size='large' />
    </div>
  )


  if (posted) return (
    <Card style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Result
        status="success"
        title="Su caso ha sido presentado correctamente!"
        subTitle="Vamos a revisar su caso. Puede hacer un seguimiento del estado del mismo desde su dashboard principal."
        extra={[
          <Button type="primary" key="console" onClick={() => navigate('/')}>
            Volver
          </Button>,
        ]}
      />
    </Card>
  )

  return (
    <>


      {post?.categories === categoria && post?.published === true ? (
        <Card style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Result
            status="success"
            title="Su caso ha sido presentado correctamente!"
            subTitle="Vamos a revisar su caso. Puede hacer un seguimiento del estado del mismo desde su dashboard principal."
            extra={[
              <Button type="primary" key="console" onClick={() => navigate('/')}>
                Volver
              </Button>,
            ]}
          />
        </Card>
      ) : (
        <>
          <Card style={{ maxWidth: '600px', margin: '0 auto 20px' }}>
            <Typography>
              <Title>Inscripción</Title>
              <Paragraph>
                A través de este formulario, podrás presentar tus propuestas y tener la oportunidad de ser seleccionado para los Intercorp Marketing Awards 2023.
              </Paragraph>
              <Paragraph>
                Por favor, asegúrate de proporcionar información clara y detallada sobre tu propuesta para que la misma sea evaluada con claridad y tranparencia por nuestro equipo de profesionales.
              </Paragraph>
            </Typography>
            <Alert
              message={
                <strong>
                  Fechas de Implementación
                </strong>
              }
              description="Los casos pueden ser presentados desde el 14 de febrero de 2023 hasta el 14 de marzo de 2023."
              type="info"
              showIcon
            />
          </Card>
          <Card style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Form
              style={{ width: '100%' }}
              layout="vertical"
              form={form}
              {...formItemLayout}
              onFinish={onFinish}
              initialValues={{
                categories: categoria,
                images: post?.images
              }}
              requiredMark={false}
            >
              <Form.Item
                style={{ width: '100%' }}
                name="categories"
                label="Categorías"
                hasFeedback
                rules={[{ required: true, message: 'Please select your category!' }]}
              >
                <Select placeholder="Selecione su categoria"
                  style={{ width: '100%' }}
                  disabled
                >
                  {
                    CATEGORIES.map(({ id, name }) => (
                      <Option key={id} value={id}>{name}</Option>
                    ))
                  }
                </Select>
              </Form.Item>

              <BrandSelect />
              <Alert
                showIcon
                icon={<BsPencilSquare />}
                style={{
                  marginBottom: '20px'
                }}
                message={
                  <strong>
                    Acción / Campaña / Idea
                  </strong>
                }
                description={
                  <li>
                    Explicar cómo fue el contexto en el que se desarrolló el caso y cuál fue el objetivo de negocio planteado,
                    cuál fue el insight o la data de investigación interna o externa que haya servido para desarrollar la acción/campaña o idea.
                    Explicar cómo responde al objetivo del negocio. Cuál fue la solución y cómo fue implementada.
                  </li>
                }
                type="info"
              />
              <Form.Item name="description" rules={[{ required: true, message: 'Por favor debe rellenar este campo.' }]}>
                <TextArea
                  rows={4}
                  showCount
                  minLength={100}
                  maxLength={1000}
                  style={{ height: 230, marginBottom: 24 }}
                  placeholder='Escriba aquí su acción, campaña o idea...'
                />
              </Form.Item>

              <Form.Item label='Duración'>
                <Input.Group compact>
                  <Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" type='number' />
                  <Input
                    className="site-input-split"
                    style={{
                      width: 30,
                      borderLeft: 0,
                      borderRight: 0,
                      pointerEvents: 'none',
                    }}
                    placeholder="~"
                    disabled
                  />
                  <Input
                    className="site-input-right"
                    style={{
                      width: 100,
                      textAlign: 'center',
                    }}
                    placeholder="Maximum"
                  />
                </Input.Group>

              </Form.Item>

              <Form.Item label='Core Target'>
                <Input type='text' />
              </Form.Item>

              <Alert
                showIcon
                icon={<BsPencilSquare />}
                style={{
                  marginBottom: '20px'
                }}
                message={
                  <strong>
                    Resultados
                  </strong>
                }
                description="Desarrollar en máximo 300 palabras los resultados que demuestran el éxito del caso detallando las fuentes de cada uno de los puntos listados. Está permitido agregar gráficos que evidencien el impacto."
                type="info"
              />
              <Form.Item name='result' rules={[{ required: true, message: 'Por favor debe rellenar este campo.' }]}>
                <TextArea
                  rows={4}
                  showCount
                  minLength={50}
                  maxLength={300}
                  style={{ height: 120, marginBottom: 24 }}
                  placeholder='Escriba aquí sus resultados...'
                />
              </Form.Item>


              <Form.Item
                name="images"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="Max. 4 imagenes. Formato: .jpg, .png, .gif."
              >
                <Alert
                  showIcon
                  icon={<BiUpload />}
                  style={{
                    marginBottom: '20px'
                  }}
                  message={
                    <strong>
                      Material de Soporte
                    </strong>
                  }
                  description={`Por favor incorporar material gráfico y/o audiovisual que visualice la acción, campaña o idea.`}
                  type="info"
                />
                <UploadImage form={form} />
              </Form.Item>

              <Form.Item
                name="videos"
                label="Videos"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="Max. 2 videos. Formato: .mp4, .avi, .mpeg-4."
              >
                <UploadVideo form={form} />
              </Form.Item>

              <Row gutter={[12, 12]}>
                <Col xs={24} md={4}>
                  <Button block htmlType="button" onClick={() => navigate('/')}>
                    Volver
                  </Button>
                </Col>
                <Col xs={24} md={{ span: 8, offset: 4 }}>
                  <Button block htmlType="button" loading={loading} onClick={handelUpdatePost} >
                    Guardar
                  </Button>
                </Col>
                <Col xs={24} md={8}>
                  <Button block type='primary' htmlType="submit" >
                    Enviar
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card >
        </>
      )}
      <AlertModal
        post={post}
        openModal={openModal}
        setPosted={setPosted}
        setOpenModal={setOpenModal}
        formValues={form.getFieldsValue()}
      />
    </>
  )
}