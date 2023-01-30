import { Card, Space, Table as AntTable, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../api/Post';
import { CATEGORIES } from '../constans';

interface DataType {
  key: string;
  categorie: string;
  brand: string;
  date: string;
  score: number;
  status: 'approved' | 'decline' | 'rejected' | 'pending';
}

const columns: ColumnsType<any> = [
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
    title: 'Fecha',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (_, { date }) => {
      return <div>{moment(date).format('DD/MM/YYYY, h:mm:ss a')}</div>
    }
  },
  {
    title: 'Stado',
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
    dataIndex: 'score',
    key: 'score',
    align: 'center',
  },
  {
    title: 'Puntuacion Essence',
    dataIndex: 'score',
    key: 'score',
    align: 'center'
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
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()


  useEffect(() => {
    setLoading(true)
    getPosts()
      .then(({ data }) => {
        setPost(data)
        console.log(data)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [])


  return (
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
        onRow={(record, rowIndex) => ({
          onClick: event => {
            navigate(`/dashboard/categories/published/${record._id}`)
          }
        })}
      />
    </Card>
  )
}
