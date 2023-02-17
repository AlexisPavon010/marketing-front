import { Card, Typography } from 'antd'
import { AiOutlineUser } from 'react-icons/ai'
import { useSelector } from 'react-redux'

import styles from './home.module.scss'
import { CategoriesCard } from '../../components/Categories'
import { CategoriesCollapse } from '../../components/CategoriesCollapse';
import { UserForm } from '../../components/UserForm'
import { StepsComponent } from '../../components/Steps'

const { Title, Paragraph } = Typography;

export const Home = () => {
  const { username, email } = useSelector((state: any) => state.auth)

  return (
    <>
      <Card className={styles.hero}>
        <Typography>
          <Title className={styles.hero__title} >
            <AiOutlineUser /> ¡Bienvenido/a  {username ? username : email}!
          </Title>
          <Title className={styles.hero__subtitle}>
            Intercorp Marketing Awards 2023
          </Title >
          <Paragraph>
            Un premio que busca destacar a través de diferentes categorías de participación, a las acciones/campañas /ideas de marketing de las marcas de Intercorp que demuestran el mayor impacto en el cumplimiento de los objetivos de negocio.
          </Paragraph>
          <Paragraph>
            En este documento van a encontrar los detalles de las categorías, algunos consejos para la presentación de casos, plazos de inscripción y todos los criterios de evaluación que es importante saber y tener en cuenta a la hora de aplicar.
          </Paragraph>
          <Paragraph>
            Estamos orgullosos de lanzar por primera vez en Intercorp un premio de estas características.
          </Paragraph>
          <Paragraph>
            ¡Buena suerte con tus inscripciones!
          </Paragraph>
        </Typography>
      </Card>
      <Card className={styles.card__categories}>
        <StepsComponent />
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
            Recuerda que puedes inscribir tu caso en múltiples categoría completando un formulario para cada una.
          </Paragraph>
          <Paragraph>
            Puedes presentar más de una caso por categoría.
          </Paragraph>
          <Paragraph>
            <ul>
              <li>
                <a target='_blank' href="Bases_y_Condiciones_y_Guia_de_inscripcion_IMA_2023.pdf">Guía de Inscripción, Bases y Condiciones.</a>
              </li>
            </ul>
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