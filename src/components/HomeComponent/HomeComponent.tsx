import { Typography } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";

import styles from './styles.module.scss'

const { Title, Paragraph } = Typography;

export const HomeComponent = () => {
  const { username, email, role } = useSelector((state: any) => state.auth)

  return (
    <>
      <Typography>
        <Title className={styles.hero__title} >
          <AiOutlineUser /> {role === 'jury' ? `¡Bienvenido/a  ${username ? username : email}! al Jurado` : `¡Bienvenido/a  ${username ? username : email}!`}
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
    </>
  )
}
