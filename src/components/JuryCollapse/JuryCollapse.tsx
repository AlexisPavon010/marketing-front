import { Badge, Col, Collapse, Row, Space, Table, Tag, Tooltip, Typography } from "antd"
import { AiOutlineEye, AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { BsPencil } from "react-icons/bs";
import moment from "moment";

import styles from './styles.module.scss'
import { CATEGORIES, STATUSES } from "../../constans";
import { BASE_URL, getPosts } from "../../api/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { IPost } from "../../interfaces/Post";

const { Title } = Typography;
const { Panel } = Collapse;

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

export const JuryCollapse = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [branding, set_branding] = useState([])
  const [impacto_positivo, set_impacto_positivo] = useState([])
  const [marketing_promocional, set_marketing_promocional] = useState([])
  const [performance_marketing, set_performance_marketing] = useState([])
  const [creacion_de_contenido, set_creacion_de_contenido] = useState([])
  const [estrategia_de_crecimiento, set_estrategia_de_crecimiento] = useState([])

  const navigate = useNavigate()



  const fetchData = async () => {
    setIsLoading(true)
    try {
      const url = `${BASE_URL}/api/posts?status=approved`
      const { data } = await axios.get(url)
      console.log(data)
      set_branding(data.posts.filter((post: IPost) => post.categories === 'branding'))
      set_estrategia_de_crecimiento(data.posts.filter((post: IPost) => post.categories === 'estrategia-de-crecimiento'))
      set_performance_marketing(data.posts.filter((post: IPost) => post.categories === 'performance-marketing'))
      set_marketing_promocional(data.posts.filter((post: IPost) => post.categories === 'marketing-promocional'))
      set_creacion_de_contenido(data.posts.filter((post: IPost) => post.categories === 'creacion-de-contenido'))
    } catch (error) {
      console.log(error)
      alert('Hubo un error al hacer el fetch al server')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


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
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => {
        if (!record.published) {
          return (
            <Space size="large">
              <Tooltip placement="top" title={'Editar'}>
                <BsPencil onClick={() => navigate(`/update-categories/${record._id}`)} size={16} />
              </Tooltip>
            </Space>
          )
        }
        return (
          <Space size="large">
            <Tooltip placement="top" title={'Ver'}>
              <AiOutlineEye onClick={() => navigate(`/categories/published/${record._id}`)} size={16} />
            </Tooltip >
          </Space >
        )
      }
    },
  ];

  return (
    <>
      <AiOutlineInfoCircle color='grey' size={32} />
      <Title className={styles.title} level={4}>
        Casos para Juzgamiento
      </Title>
      <br />
      <Collapse accordion>
        <Panel className={styles.panel} key={1} header={
          <Row>
            <Col>
              <strong>Branding / Desarrollo de Valor de Marca</strong>
            </Col>
            <Col flex={1}></Col>
            <Col>
              <Badge color='#1677ff' count={branding.length} showZero />
            </Col>
          </Row>
        } >
          <Table columns={columns} dataSource={branding} rowKey='_id' />
        </Panel>
        <Panel className={styles.panel} key={2} header={
          <Row>
            <Col>
              <strong>Estrategia de Crecimiento</strong>
            </Col>
            <Col flex={1}></Col>
            <Col>
              <Badge color='#1677ff' count={estrategia_de_crecimiento.length} showZero />
            </Col>
          </Row>
        } >
          <Table columns={columns} dataSource={estrategia_de_crecimiento} rowKey='_id' />
        </Panel>
        <Panel className={styles.panel} key={3} header={
          <Row>
            <Col>
              <strong>Performance Marketing</strong>
            </Col>
            <Col flex={1}></Col>
            <Col>
              <Badge color='#1677ff' count={performance_marketing.length} showZero />
            </Col>
          </Row>
        } >
          <Table columns={columns} dataSource={performance_marketing} rowKey='_id' />
        </Panel>
        <Panel className={styles.panel} key={4} header={
          <Row>
            <Col>
              <strong>Marketing Promocional</strong>
            </Col>
            <Col flex={1}></Col>
            <Col>
              <Badge color='#1677ff' count={marketing_promocional.length} showZero />
            </Col>
          </Row>
        } >
          <Table columns={columns} dataSource={marketing_promocional} rowKey='_id' />
        </Panel>
        <Panel className={styles.panel} key={5} header={
          <Row>
            <Col>
              <strong>Uso de Influencers / Creadores de Contenido</strong>
            </Col>
            <Col flex={1}></Col>
            <Col>
              <Badge color='#1677ff' count={marketing_promocional.length} showZero />
            </Col>
          </Row>
        } >
          <Table columns={columns} dataSource={creacion_de_contenido} rowKey='_id' />
        </Panel>
      </Collapse >
    </>
  )
}