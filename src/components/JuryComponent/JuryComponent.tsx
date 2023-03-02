import { Typography } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";

import styles from './styles.module.scss'

const { Title, Paragraph } = Typography;

export const JuryComponent = () => {
  const { username, email } = useSelector((state: any) => state.auth)

  return (
    <>
      <Typography>
        <Title className={styles.hero__title} >
          <AiOutlineUser /> {`¡Bienvenido/a  ${username ? username : email}! al Jurado`}
        </Title>
        <Title className={styles.hero__subtitle}>
          Intercorp Marketing Awards 2023
        </Title >
        <Paragraph>
          Un premio que busca destacar a través de diferentes categorías de participación, a las acciones/campañas /ideas de marketing de las marcas de Intercorp que demuestran el mayor impacto en el cumplimiento de los objetivos de negocio.
        </Paragraph>
        <Paragraph>
          Como jurado tendrás como misión evaluar los casos postulados.
        </Paragraph>
        <Paragraph>
          ¡Muchas gracias por participar de esta experiencia!
        </Paragraph>
      </Typography>
    </>
  )
}
