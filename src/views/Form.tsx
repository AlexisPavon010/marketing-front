import { Button, Card, Col, Form, Result, Row, Select, Spin, Input } from 'antd'
import { useEffect, useState } from 'react';
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
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" key="console" onClick={() => navigate('/')}>
            Go Console
          </Button>
        ]}
      />
    </Card>
  )

  return (
    <Card style={{ maxWidth: '600px', margin: '0 auto' }}>

      {post?.categories === categoria && post?.published === true ? (
        <Result
          status="success"
          title="Successfully Purchased Cloud Server ECS!"
          subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          extra={[
            <Button type="primary" key="console" onClick={() => navigate('/')}>
              Go Console
            </Button>,
          ]}
        />
      ) : (
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
            <Select placeholder="Please select a country"
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

          <Form.Item label="Descripcion" name="description" rules={[{ required: true, message: 'Please insert a description!' }]}>
            <TextArea
              rows={4}
              minLength={100}
              maxLength={1000}
            />
          </Form.Item>

          <Form.Item
            name="images"
            label="Images"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="long"
          >
            <UploadImage form={form} />
          </Form.Item>

          <Form.Item
            name="videos"
            label="Videos"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="long"
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
      )}
      <AlertModal
        post={post}
        openModal={openModal}
        setPosted={setPosted}
        setOpenModal={setOpenModal}
        formValues={form.getFieldsValue()}
      />
    </Card >
  )
}