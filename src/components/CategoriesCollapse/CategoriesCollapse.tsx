import { Collapse, Typography } from 'antd';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';

import styles from './styles.module.scss'

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;


export const CategoriesCollapse = () => {
  const { role } = useSelector((state: any) => state.auth)
  const text = ' Si tienes 1 ó 2 métricas, ya es suficiente. No dejes de participar.'

  return (
    <>
      <AiOutlineInfoCircle color='grey' size={32} />
      <Title className={styles.categories__title} level={4}>
        Información sobre Categorías
      </Title>
      <Collapse>
        <Panel header={<strong>Branding / Desarrollo de Valor de Marca</strong>} key="5">
          <Paragraph>
            Esta categoría reconoce aquellas campañas o acciones que generaron impacto en la salud de marcas.
          </Paragraph>
          <Paragraph>
            <strong>Métricas: </strong>
            {`A modo de referencia a continuación se detallan como ejemplo métricas posibles a citar para validar los resultados de impacto. Son sólo referenciales. No es obligatorio contar con toda esa información y pueden sumarse otras de acuerdo a los KPI´s y a las fuentes de información con las que cuente cada marca. ${role === 'user' ? text : ''}`}
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Período de comparación vs baseline: mismo mes del año anterior ó mes anterior.
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Cambios en la pirámide marcaria: (awareness, consideración, experiencia, preferencia, fidelidad).
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Resultados investigaciones cuali/cuanti a consumidores.
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Resultados de Post tests, evolución atributos de marcas.
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Métricas redes sociales: like, share, sentiment, engagement, brand lift.
            </li>
          </Paragraph>
        </Panel>
        <Panel header={<strong>Estrategia de Crecimiento</strong>} key="3">
          <Paragraph>
            Esta categoría incluye aquellas iniciativas de lanzamientos, revitalización de marca, nuevos servicios, canales de venta, cambios de posicionamiento, y cualquier innovación que haya traído crecimiento exponencial  para la marca y para el negocio.
          </Paragraph>
          <Paragraph>
            Se valorarán campañas y estrategias impulsadas por datos cualitativos y cuantitativos, basados en insights de negocio o de consumidor.
          </Paragraph>
          <Paragraph>
            <strong>Métricas: </strong>
            {`A modo de referencia a continuación se detallan como ejemplo métricas posibles a citar para validar los resultados de impacto. Son sólo referenciales. No es obligatorio contar con toda esa información y pueden sumarse otras de acuerdo a los KPI´s y a las fuentes de información con las que cuente cada marca. ${role === 'user' ? text : ''}`}
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Período de comparación vs baseline: mismo mes del año anterior ó mes anterior.
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Incremento de ventas (ventas web /offline), en valores ($$) y transacciones.
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Cambios en la Pirámide marcaria: awareness, consideración, experiencia, preferencia, fidelidad.
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Resultados investigaciones cuali/cuanti a consumidores.
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Resultados de Post tests, evolución atributos de marcas.
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Métricas redes sociales: share, sentiment, engagement, brand lift.
            </li>
          </Paragraph>
        </Panel>
        <Panel header={<strong>Performance Marketing</strong>} key="1">
          <Paragraph>
            En esta categoría entran campañas de lead, paid search, paid social, que hayan demostrado incremento en conversiones, prospects, tráfico, y/o descargas de aplicaciones  manteniendo o disminuyendo el CPA vs el período de comparación.
          </Paragraph>
          <Paragraph>
            <strong>Ejemplos:</strong> Implementación de lower funnel, uso de data con modelos de propensión, etc.
          </Paragraph>
          <Paragraph>
            <strong>Métricas: </strong>
            A modo de referencia a continuación se detallan como ejemplo métricas posibles a citar para validar los resultados de impacto. Son sólo referenciales. No es obligatorio contar con toda esa información y pueden sumarse otras de acuerdo a los KPI ́s  y a las fuentes de información con las que cuente cada marca.
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Conversiones incrementales, ratio de conversión, leads, prospects, descargas de aplicaciones, tráfico, CPA , ROAS (Return On Advertising Spending = Ventas/inversión)
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Período de comparación vs baseline: mismo mes del año anterior ó mes anterior.
            </li>
          </Paragraph>
        </Panel>
        <Panel header={<strong>Marketing Promocional</strong>} key="2">
          <Paragraph>
            En esta categoría el beneficio adicional ofrecido debe ser un factor determinante en la generación de los resultados para impulsar la venta.
            Esta categoría incluye aquellas iniciativas que aprovechan temporadas especiales (verano, otoño, back to school),  días festivos (navidad, fiestas patrias)  y eventos (cyberwow) donde se conecta la oferta en un contexto determinado con el público objetivo.
          </Paragraph>
          <Paragraph>
            <strong>Métricas: </strong>
            {`A modo de referencia a continuación se detallan como ejemplo métricas posibles a citar para validar los resultados de impacto. Son sólo referenciales. No es obligatorio contar con toda esa información y pueden sumarse otras de acuerdo a los KPI´s y a las fuentes de información con las que cuente cada marca. ${role === 'user' ? text : ''}`}
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              KPI´s (ejemplo Cyberwow/ Hot sale).
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Período de comparación: vs plan /vs evento anterior/ vs promedio semana anterior o misma semana mes anterior.
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Ventas (en s/. y cantidad de pedidos).
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Ticket promedio.
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Visitas (tráfico).
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Tiempo en la página y bounce rate, páginas vistas.
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Tasa de conversión (pedidos/visitas).
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Clientes nuevos.
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Clientes activos en tiempo real.
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              ROAS ( Return On Advertising Spending = Ventas/inversión en el evento).
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              CAC ( Costo de adquisición de cliente = Inversión en marketing/cantidad de pedidos).
            </li>
          </Paragraph>
        </Panel>
        <Panel header={<strong>Uso de Influencers / Creadores de Contenido</strong>} key="4">
          <Paragraph>
            Esta categoría destaca aquellas campañas o acciones  que buscan conectar con el consumidor a través de la creación de contenidos con el objetivo de informar o entretener a los posibles clientes de una marca.
            Incluye a creadores de contenido/ influencers que se transformen en embajadores de la marca que impulsan ventas o desarrollo de marca.
          </Paragraph>
          <Paragraph>
            <strong>Métricas: </strong>
            A modo de referencia a continuación se detallan como ejemplo métricas posibles a citar para validar los resultados de impacto. Son sólo referenciales. No es obligatorio contar con toda esa información y pueden sumarse otras de acuerdo a los KPI´s y a las fuentes de información con las que cuente cada marca.
          </Paragraph>
          <Paragraph>
            La comparación se realizará vs el promedio de campañas de la marca.
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Alcance, vistas al 100%,
            </li>
            <li className={styles.list_item}>
              Conversiones , tasa de conversión
            </li>
            <li className={styles.list_item}>
              CTR
            </li>
            <li className={styles.list_item}>
              CPM (costo/impresiones)
            </li>
            <li className={styles.list_item}>
              Métricas redes sociales: share, sentiment, engagement, brand lift, search lift.
            </li>
          </Paragraph>
        </Panel>
        {/* <Panel header={<strong>Impacto Positivo</strong>} key="6">
          <Paragraph>
            El objetivo de esta categoría es premiar aquellos casos que demuestren generar impacto positivo en materia de sustentabilidad, inclusión y/o diversidad.
          </Paragraph>
          <Paragraph>
            Se valorará el impacto que estas acciones generen en la salud de la marca.
          </Paragraph>
          <Paragraph>
            <strong>Métricas ejemplo: </strong>
            A modo de referencia a continuación se detallan como ejemplo  métricas posibles a citar para validar los resultados de impacto. Son sólo referenciales. No es obligatorio contar con toda esa información y pueden sumarse otras de acuerdo a los KPI´s  y a las fuentes de información con las que cuente cada marca.
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Período de comparación vs Baseline: mismo mes del año anterior ó mes anterior.
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Post Test: Recuerdo espontáneo, conocimiento de marca, lealtad de marca.
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Sentiment a través de plataformas de social listening, engagement, brand lift.
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Evolución asociación a los atributos: sustentable, inclusiva, apoyo a la diversidad, etc.
            </li>
          </Paragraph>
        </Panel>
        <Panel header={<strong>Uso de First Party Data</strong>} key="7">
          <Paragraph>
            Esta categoría reconoce aquellas campañas/acciones/ideas que hayan realizado un buen uso de los datos propios (website, mobile app, social media pages, email) para tomar decisiones de marketing informadas.
          </Paragraph>
          <Paragraph>
            Incluye uso de data para: personalización de mensajes y contenidos, optimización de segmentación de clientes, desarrollo de mejoras de productos, retención de clientes, venta cruzada y venta adicional
          </Paragraph>
          <Paragraph>
            <strong>Métricas: </strong>
            A modo de referencia a continuación se detallan como ejemplo métricas posibles a citar para validar los resultados de impacto. Son sólo referenciales. No es obligatorio contar con toda esa información y pueden sumarse otras de acuerdo a los KPI ́s y a las fuentes de información con las que cuente cada marca. 
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Período de comparación vs baseline: mismo mes del año anterior ó mes anterior.
            </li>
          </Paragraph>
          <Paragraph>
            <li className={styles.list_item}>
              Tráfico WEB, Páginas vistas, Tiempo en la web, Bounce rate, Conversion rate.
            </li>
          </Paragraph>
        </Panel> */}
      </Collapse>
    </>
  )
}
