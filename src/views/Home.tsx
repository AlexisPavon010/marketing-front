import { Card, Col, Row, Space } from 'antd'
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../constans'
import { Table } from './Table'


export const Home = () => {
  return (
    <Card>
      <Row gutter={[42, 32]}>
        {
          CATEGORIES.map(({ id, name, color }) => (
            <Col key={id} xs={24} md={8} >
              <Link to={`/categories/${id}`}>
                <Card
                  style={{
                    cursor: 'pointer',
                    textAlign: 'center',
                    border: 'none',
                    color: 'white',
                    background: color,
                    boxShadow: '0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(76 175 80 / 40%)'
                  }}
                >
                  <h1>{name}</h1>
                </Card>
              </Link>
            </Col>
          ))
        }
        <Col>
          <Table />
        </Col>
      </Row>
    </Card>
  )
}
