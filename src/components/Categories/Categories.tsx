import { Col, Card, Row } from "antd"
import { Link } from "react-router-dom"

import styles from './styles.module.scss'
import { CATEGORIES } from "../../constans"

export const CategoriesCard = () => {
  return (
    <Row gutter={[42, 32]}>
      {
        CATEGORIES.map(({ id, name, color, icon }) => (
          <Col key={id} xs={24} md={8} >
            <Link to={`/categories/${id}`}>
              <Card className={styles.card__categories}>
                {icon}
                <h1 className={styles.card__categories_title} >{name}</h1>
              </Card>
            </Link>
          </Col>
        ))
      }
    </Row>
  )
}
