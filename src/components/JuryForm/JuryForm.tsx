import { Card, Col, Input, Row, Select, Space, Table as AntTable, Tag, Tooltip, Form, Typography, Badge } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineInfoCircle } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { CATEGORIES, STATUSES } from "../../constans";
import { BASE_URL } from "../../api/Post";
import axios from "axios";
import { IPost } from "../../interfaces/Post";

const { Search } = Input;
const { Title, Paragraph } = Typography;

interface DataType {
  _id: string
  published: boolean;
  categories: string;
  brand: string;
  createdAt: string;
  juryScore: number;
  adminScore: number;
  status: 'approved' | 'decline' | 'rejected' | 'pending';
}

export const JuryForm = () => {
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [post, setPost] = useState([])
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

  useEffect(() => {
    setLoading(true)
    const url = `${BASE_URL}/api/posts?status=approved&juryScore=desc`
    axios.get(url)
      .then(({ data }) => {
        setPost(data.posts.filter((post: IPost) => post.scored === true))
        setCount(data.metadata.total)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [skip, limit, brand, category])

  const columns: ColumnsType<DataType> = [
    {
      title: 'Categoría Evaluada',
      dataIndex: 'categories',
      key: 'categories',
      render: (text) => {

        return (
          // @ts-ignore 
          <p>{CATEGORIES.find(({ id }) => id === text)?.name}</p>
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
      render: (date: string) => {
        return <div>{moment(date).format('DD/MM/YYYY, h:mm:ss a')}</div>
      }
    },
    {
      width: 160,
      title: 'Puntuacion Jurado',
      dataIndex: 'juryScore',
      key: 'juryScore',
      align: 'center',
      render: (value: number) => {
        const total = value.toFixed(2)
        return (
          <Badge color='#1677ff' count={total} overflowCount={999} showZero />
        )
      }
    },
    {
      align: 'center',
      title: 'Estado',
      key: 'status',
      dataIndex: 'status',
      render: (_, record) => {
        let color = STATUSES.find((item) => item.id === record.status)?.color
        let text = STATUSES.find((item) => item.id === record.status)?.name
        if (!record.published) {
          color = 'yellow';
          text = 'Guardado';
        }
        else if (record.status === 'approved') {
          color = 'green';
        }
        return (
          <Tag color={color} key={record.status}>
            {text?.toUpperCase()}
          </Tag>
        )
      }
    },
    // {
    //   title: 'Acción',
    //   key: 'action',
    //   render: (_, record) => {
    //     return (
    //       <Space size="large">
    //         <Tooltip placement="top" title={'Juzgar'}>
    //           <AiOutlineEye onClick={() => navigate(`/categories/published/${record._id}`)} size={16} />
    //         </Tooltip >
    //       </Space >
    //     )
    //   }
    // },
  ];

  return (
    <>
      <AiOutlineInfoCircle color='grey' size={32} />
      <Typography>
        <Title style={{ margin: '0 0 20px 0' }} level={4}>
          Casos Evaluados
        </Title>
        <Paragraph>
          A continuación puedes ver el detalle de los casos ya evaluados. Puedes volver a puntuar los casos las veces que lo consideres necesario. Quedará guardada la última versión que realices.
        </Paragraph>
      </Typography>
      <Card style={{ marginBottom: 20 }}>
        <Form
          style={{ width: '100%' }}
          layout='vertical'
        >
          <Row gutter={[16, 16]} >
            <Col xs={24} md={8} lg={8}>
              <Form.Item name='category' label='Categorias'>
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
              <Form.Item name='brand' label='Marca'>

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
              <Form.Item name='search' label='Buscar'>
                <Search placeholder="Buscar" style={{ width: '100%' }} />
              </Form.Item>
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
          scroll={{ x: 900, }}
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
            onClick: event => {
              navigate(`/categories/published/${record._id}`)
            }
          })}
        />
      </Card>
    </>
  )
}