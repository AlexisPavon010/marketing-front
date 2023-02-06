import { Card, Typography } from 'antd'
import { AiOutlineUser } from 'react-icons/ai'
import { useSelector } from 'react-redux'

import styles from './home.module.scss'
import { CategoriesCard } from '../../components/Categories'
import { CategoriesCollapse } from '../../components/CategoriesCollapse';
import { UserForm } from '../../components/UserForm'

const { Title, Paragraph } = Typography;

export const Home = () => {
  const { displayName, email } = useSelector((state: any) => state.auth)

  return (
    <>
      <Card className={styles.hero}>
        <Typography>
          <Title className={styles.hero__title} >
            <AiOutlineUser /> ¡Bienvenido  {displayName ? displayName : email}!
          </Title>
          <Title className={styles.hero__subtitle}>
            Intercorp Marketing Awards 2023
          </Title >
          <Paragraph>
            ¡Bienvenido a Intercorp Marketing Awards! Aquí podrás postular tu caso de marketing más innovador y efectivo. Te invitamos a que lo presentes con todo detalle para que sea evaluado por nuestro jurado de expertos en el campo.
          </Paragraph>
          <Paragraph>
            Nuestro proceso de evaluación consta de dos instancias de votación. En la primera, un grupo de expertos evaluará los casos y seleccionará a los finalistas. En la segunda, un jurado compuesto por líderes del sector decidirá quién gana el premio a la excelencia en marketing.
          </Paragraph>
        </Typography>
      </Card>
      <Card className={styles.card__categories}>
        <CategoriesCollapse />
      </Card>
      <Card className={styles.card__categories}>
        <Typography>
          <Title className={styles.card__categories_title} level={4}>
            Seleccione la categoría a postular
          </Title>
          <Paragraph>
            Para ayudarte a clasificar tu propuesta, te pedimos que selecciones una o más de las siguientes categorías, solo se puede postular un caso por categoría.
          </Paragraph>
        </Typography>
      </Card>
      <Card className={styles.card__categories}>
        <CategoriesCard />
      </Card>
      <Card>
        <UserForm />
      </Card>
    </>
  )
}