import { Col, Card, Row } from "antd"
import { Link } from "react-router-dom"

import { CATEGORIES } from "../../constans"

export const CategoriesCard = () => {
  return (
    <Row gutter={[42, 32]}>
      {
        CATEGORIES.map(({ id, name, color, icon }) => (
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
                {icon}
                <h1 style={{ marginTop: 0 }}>{name}</h1>
              </Card>
            </Link>
          </Col>
        ))
      }
    </Row>
  )
}
