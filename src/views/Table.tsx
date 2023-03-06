import { Badge, Button, Card, Col, Form, Input, Row, Select, Space, Table as AntTable, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { BsEye, BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { getPosts } from '../api/Post';
import { DeletedModal } from '../components/Modals';
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
  onCell: () => any
}


export const Table = () => {
  const [post, setPost] = useState([])
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [loading, setLoading] = useState(true)
  const [skip, setSkip] = useState(1)
  const [limit, setLimit] = useState(10)
  const [count, setCount] = useState(0)
  const [openModal, setOpenModal] = useState<{ visible: boolean; id: string | null }>({ visible: false, id: null })
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

  const handleDeleted = (id: string) => {
    console.log(id)
    setOpenModal({ visible: true, id: id })
  }

  useEffect(() => {
    getData()
  }, [skip, limit, category, brand])



  const columns: ColumnsType<DataType> = [
    {
      width: 180,
      title: 'Usuario',
      dataIndex: 'username',
      key: 'username'
    },
    {
      width: 200,
      title: 'Correo',
      dataIndex: 'email',
      key: 'email'
    },
    {
      width: 200,
      ellipsis: true,
      align: 'center',
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
    // {
    //   width: 200,
    //   title: 'Marca',
    //   dataIndex: 'brand',
    //   key: 'brand',
    //   align: 'center'
    // },
    {
      width: 190,
      align: 'center',
      title: 'Fecha',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => {
        return <div>{moment(date).format('DD/MM/YYYY, h:mm:ss a')}</div>
      }
    },
    {
      width: 60,
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
      width: 160,
      title: 'Puntuacion Jurado',
      dataIndex: 'juryScore',
      key: 'juryScore',
      align: 'center',
      render: (value) => {
        const total = value.toFixed(2)
        return (
          <Badge color='#1677ff' overflowCount={999} count={total} showZero />
        )
      }
    },
    // {
    //   width: 200,
    //   title: 'Valoración',
    //   dataIndex: 'adminScore',
    //   key: 'score',
    //   align: 'center',
    //   render: (value) => (
    //     <Rate disabled defaultValue={value} />
    //   )
    // },
    // {
    //   title: 'Acción',
    //   key: 'action',
    //   align: 'center',
    //   // onCell: (record, event) => {
    //   //   // event.preventDefault();
    //   // },
    //   render: (_, record) => (
    //     <Space size="large">
    //       <Tooltip placement="top" title='Ver'>
    //         <BsEye
    //           onClick={() => navigate(`/dashboard/categories/published/${record._id}`)}
    //           size={16}
    //         />
    //       </Tooltip>
    //       <Tooltip placement="top" title='Eliminar'>
    //         <BsTrash
    //           onClick={() => handleDeleted(record._id)}
    //           size={16}
    //           color='red'
    //         />
    //       </Tooltip>
    //     </Space>
    //   ),
    // },
  ];


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
                        { label: 'Interbank', value: 'Interbank' },
                        { label: 'Interseguro', value: 'Interseguro' },
                        { label: 'Inteligo', value: 'Inteligo' },
                        { label: 'Express Net', value: 'Express Net' },
                        { label: 'Izipay', value: 'Izipay' },
                      ],
                    },
                    {
                      label: 'Retail',
                      options: [
                        { label: 'Plaza Vea', value: 'Plaza Vea' },
                        { label: 'Makro', value: 'Makro' },
                        { label: 'Mass', value: 'Mass' },
                        { label: 'Vivanda', value: 'Vivanda' },
                        { label: 'Real Plaza', value: 'Real Plaza' },
                        { label: 'Oechsle', value: 'Oechsle' },
                        { label: 'Agora', value: 'Agora' },
                        { label: 'Promart', value: 'Promart' },
                        { label: 'Financiera Oh', value: 'Financiera Oh' },
                      ],
                    },
                    {
                      label: 'Salud',
                      options: [
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
          scroll={{ x: 900 }}
          rowKey='_id'
          loading={loading}
          rowClassName='table-row'
          pagination={{
            locale: {
              items_per_page: 'x pág.',
            },
            total: count,
            current: skip,
            pageSize: limit,
            onChange: onPageChange,
            onShowSizeChange: onPageSizeChange,
            showSizeChanger: true
          }}
          onRow={(record, rowIndex) => ({
            onClick: (event) => {
              navigate(`/dashboard/categories/published/${record._id}`)
            }
          })}
        />
      </Card>
    </>
  )
}