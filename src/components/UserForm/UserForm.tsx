import { Card, Col, Input, Row, Select, Space, Table as AntTable, Tag, Tooltip, Form } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState, useEffect } from 'react';
import { AiOutlineEye } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { useSelector } from "react-redux";
import moment from "moment";

import { getPostByUserId } from "../../api";
import { CATEGORIES } from "../../constans";

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
    render: (date: string) => {
      return <div>{moment(date).format('DD/MM/YYYY, h:mm:ss a')}</div>
    }
  },
  {
    align: 'center',
    title: 'Estado',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => {
      let color = status == 'decline' ? 'volcano' : 'geekblue';
      if (status === 'approved') {
        color = 'green';
      }
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
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
    title: 'Puntuacion Essence',
    dataIndex: 'adminScore',
    key: 'score',
    align: 'center'
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="large">
        <Tooltip placement="top" title={'Editar'}>
          <BsPencil size={16} />
        </Tooltip>
        <Tooltip placement="top" title={'Ver'}>
          <AiOutlineEye size={16} />
        </Tooltip>
      </Space>
    ),
  },
];

export const UserForm = () => {
  const { uid } = useSelector((state: any) => state.auth)
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [post, setPost] = useState([])
  const [loading, setLoading] = useState(true)
  const [skip, setSkip] = useState(1)
  const [limit, setLimit] = useState(10)
  const [count, setCount] = useState(0)

  const onPageChange = (page: any) => {
    setSkip(page)
  }

  const onPageSizeChange = (current: any, size: number) => {
    setLimit(size)
  }

  useEffect(() => {
    setLoading(true)
    getPostByUserId(uid, skip, limit, brand, category)
      .then(({ data }) => {
        setPost(data.posts)
        setCount(data.metadata.total)
        console.log(data)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [skip, limit, brand, category])


  return (
    <>
      <Card style={{ marginBottom: 20 }}>
        <Form
          style={{ width: '100%' }}
          layout='vertical'
        >
          <Row gutter={[16, 16]} >
            <Col xs={24} md={8} lg={8}>
              <Form.Item label='Categorias'>
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
              <Form.Item label='Marca'>

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
              <Form.Item label='Buscar'>
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
          // scroll={{ x: 1000 }}
          rowKey='_id'
          loading={loading}
          pagination={{
            total: count,
            current: skip,
            pageSize: limit,
            onChange: onPageChange,
            onShowSizeChange: onPageSizeChange,
            showSizeChanger: true
          }}
        // onRow={(record, rowIndex) => ({
        //   onClick: event => {
        //     navigate(`/dashboard/categories/published/${record._id}`)
        //   }
        // })}
        />
      </Card>
    </>
  )
}