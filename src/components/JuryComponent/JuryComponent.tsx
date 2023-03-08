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
          En la sección “Cuestionario de Juzgamiento” encontrarás las 5 preguntas para puntuar el caso. Te pedimos que asignes un puntaje a cada pregunta del formulario de acuerdo al criterio preestablecido:
        </Paragraph>
        <Paragraph>
          1: Muy insatisfactorio; 2: Insatisfactorio; 3: Neutral; 4: Satisfactorio; 5: Muy satisfactorio.
        </Paragraph>
        <Paragraph>
          Las preguntas a puntuar son:
        </Paragraph>
        <Paragraph>
          1 - ¿La Acción / Campaña / Idea responde al objetivo de negocio planteado?
        </Paragraph>
        <Paragraph>
          2 - ¿La Acción / Campaña / Idea es adecuada para el público objetivo? se basa en una motivación, necesidad, tendencia?
        </Paragraph>
        <Paragraph>
          3 - ¿La Acción / Campaña / Idea es novedosa o es una acción/campaña/idea que habitualmente se implementa? (para casos de Performance Marketing: ¿utiliza una herramienta nueva?)
        </Paragraph>
        <Paragraph>
          4 - ¿La Acción / Campaña / Idea es diferente a lo que hace la competencia? (Para casos de performance marketing: ¿utiliza nuevas plataformas o herramientas?)
        </Paragraph>
        <Paragraph>
          5 - ¿La Acción / Campaña / Idea presenta resultados de alto impacto en el negocio y/o en la marca?
        </Paragraph>
      </Typography>
    </>
  )
}
