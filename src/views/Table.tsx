import { Button, Card, Col, Form, Input, Rate, Row, Select, Space, Table as AntTable, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../api/Post';
import { CATEGORIES, STATUSES } from '../constans';

const { Search } = Input;

interface DataType {
  _id: string
  categorie: string;
  brand: string;
  createdAt: string;
  juryScore: number;
  adminScore: number;
  status: 'approved' | 'decline' | 'rejected' | 'pending';
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Usuario',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: 'Correo',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Categoría Postulada',
    dataIndex: 'categories',
    key: 'categories',
    render: (text) => {

      return (
        // @ts-ignore 
        <p>{CATEGORIES.find(({ id }) => id === text).name}</p>
      )
    }
  },
  {
    title: 'Marca',
    dataIndex: 'brand',
    key: 'brand',
    align: 'center'
  },
  {
    align: 'center',
    title: 'Fecha',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date) => {
      return <div>{moment(date).format('DD/MM/YYYY, h:mm:ss a')}</div>
    }
  },
  {
    align: 'center',
    title: 'Estado',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => {
      let color = STATUSES.find((item) => item.id === status)?.color
      let text = STATUSES.find((item) => item.id === status)?.name
      return (
        <Tag color={color} key={status}>
          {text!}
        </Tag>
      )
    }
  },
  {
    title: 'Puntuacion Jurado',
    dataIndex: 'juryScore',
    key: 'juryScore',
    align: 'center',
  },
  {
    title: 'Valoración',
    dataIndex: 'adminScore',
    key: 'score',
    align: 'center',
    render: (value) => (
      <Rate disabled defaultValue={value} />
    )
  },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <a>Aceptar</a>
  //       <a>Rechazar</a>
  //       <a>Denegar</a>
  //     </Space>
  //   ),
  // },
];

export const Table = () => {
  const [post, setPost] = useState([])
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [loading, setLoading] = useState(true)
  const [skip, setSkip] = useState(1)
  const [limit, setLimit] = useState(10)
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  const onPageChange = (page: any) => {
    setSkip(page)
  }

  const onPageSizeChange = (current: any, size: number) => {
    setLimit(size)
  }

  const getData = () => {
    setLoading(true)
    getPosts(limit, skip, category, brand)
      .then(({ data }) => {
        setPost(data.posts)
        setCount(data.metadata.total)
        console.log(data)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getData()
  }, [skip, limit, category, brand])


  return (
    <>
      <Card style={{ marginBottom: 20 }} >
        <Form
          style={{ width: '100%' }}
          layout='vertical'
        >
          <Row gutter={[16, 16]} >
            <Col xs={24} md={8} lg={8}>
              <Form.Item name='categories' label='Categorias'>
                <Select
                  allowClear
                  onChange={(value) => setCategory(value)}
                  placeholder='Categorias'
                  style={{ width: '100%' }}
                  options={CATEGORIES.map(({ name, id }) => ({ label: name, value: id }))}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8} lg={6} >
              <Form.Item name='brands' label='Marcas'>

                <Select
                  allowClear
                  onChange={(value) => setBrand(value)}
                  placeholder='Marcas'
                  style={{ width: '100%' }}
                  options={[
                    {
                      label: 'Financiera',
                      options: [
                        { label: 'Intercorp', value: 'Intercorp' },
                        { label: 'Interbank', value: 'Interbank' },
                        { label: 'Interseguro', value: 'Interseguro' },
                        { label: 'Interfondos', value: 'Interfondos' },
                        { label: 'Inteligo', value: 'Inteligo' },
                        { label: 'Express Net', value: 'Express Net' },
                        { label: 'Izipay', value: 'Izipay' },
                        { label: 'Tebca', value: 'Tebca' },
                      ],
                    },
                    {
                      label: 'Retail',
                      options: [
                        { label: 'Supermercados Peruanos', value: 'Supermercados Peruanos' },
                        { label: 'InRetail', value: 'InRetail' },
                        { label: 'Plaza Vea', value: 'Plaza Vea' },
                        { label: 'Makro', value: 'Makro' },
                        { label: 'Mass', value: 'Mass' },
                        { label: 'Vivanda', value: 'Vivanda' },
                        { label: 'Real Plaza', value: 'Real Plaza' },
                        { label: 'Oechsle', value: 'Oechsle' },
                        { label: 'Indigital', value: 'Indigital' },
                        { label: 'Agora', value: 'Agora' },
                        { label: 'Oslo Logistic', value: 'Oslo Logistic' },
                        { label: 'Promart', value: 'Promart' },
                        { label: 'Financiera Oh', value: 'Financiera Oh' },
                      ],
                    },
                    {
                      label: 'Salud',
                      options: [
                        { label: 'Farmacias Peruanas', value: 'Farmacias Peruanas' },
                        { label: 'Inkafarma', value: 'Inkafarma' },
                        { label: 'Mifarma', value: 'Mifarma' },
                        { label: 'Química Suiza', value: 'Química Suiza' },
                        { label: 'Clínica Aviva', value: 'Clínica Aviva' },
                      ],
                    },
                    {
                      label: 'Educación',
                      options: [
                        { label: 'Innova Schools', value: 'Innova Schools' },
                        { label: 'UTP', value: 'UTP' },
                        { label: 'Idat', value: 'Idat' },
                        { label: 'Its', value: 'Its' },
                        { label: 'Zegel', value: 'Zegel' },
                        { label: 'Perú Champs', value: 'Perú Champs' },
                        { label: 'Corriente Alterna', value: 'Corriente Alterna' },
                        { label: 'Colectivo 23', value: 'Colectivo 23' },

                      ],
                    },
                    // {
                    //   label: 'Otros',
                    //   options: brands.map(({ brandName }) => (
                    //     { label: brandName, value: brandName }
                    //   ))
                    // },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col flex={1}>
            </Col>
            <Col xs={24} md={6} >
              <Space direction='horizontal' align='center'>
                <Form.Item name='search' label='Buscar'>
                  <Search placeholder="Buscar" style={{ width: '100%' }} />
                </Form.Item>
                <Button
                  loading={loading}
                  onClick={() => getData()}
                  style={{ marginTop: '5px' }}
                  icon={<AiOutlineReload />}
                />
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card
        bodyStyle={{
          padding: 0
        }}
      >
        <AntTable
          columns={columns}
          dataSource={post}
          scroll={{ x: 1200 }}
          rowKey='_id'
          loading={loading}
          pagination={{
            locale: {
              items_per_page: 'x pag.',
            },
            total: count,
            current: skip,
            pageSize: limit,
            onChange: onPageChange,
            onShowSizeChange: onPageSizeChange,
            showSizeChanger: true
          }}
          onRow={(record, rowIndex) => ({
            onClick: event => {
              navigate(`/dashboard/categories/published/${record._id}`)
            }
          })}
        />
      </Card>
    </>
  )
}