import { Collapse, Typography } from 'antd';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;


export const CategoriesCollapse = () => {
  return (
    <>
      <AiOutlineInfoCircle color='grey' size={32} />
      <Title style={{ margin: '8px 0 20px' }} level={4}>
        Información sobre Categorías
      </Title>
      <Collapse>
        <Panel header="Performance Marketing" key="1">
          <Paragraph>
            En esta categoría entran campañas de lead , paid search , pais social, que hayan demostrado incremento en conversiones, prospects , tráfico , y/o descargas de aplicaciones manteniendo o disminuyendo el CPA vs el período de comparación.
          </Paragraph>
          <Paragraph>
            <strong>Ejemplos:</strong> Implementación de lower funnel, uso de data con modelos de propensión, etc.
          </Paragraph>
        </Panel>
        <Panel header="Marketing Promocional" key="2">
          <Paragraph>
            En esta categoría el beneficio adicional ofrecido debe ser un factor determinante en la generación de los resultados para impulsar la venta.
          </Paragraph>
          <Paragraph>
            Esta categoría incluye aquellas iniciativas que aprovechan temporadas especiales (verano, otoño, back to school), días festivos (navidad, fiestas patrias) y eventos (cyberwow) donde se conecta la oferta en un contexto determinado con el público objetivo
          </Paragraph>
        </Panel>
        <Panel header="Estrategias de Crecimiento" key="3">
          <Paragraph>
            Esta categoría incluye aquellas iniciativas de lanzamientos, revitalización de marca, nuevos servicios, canales de venta, cambios de posicionamiento, y cualquier innovación que haya traído crecimiento exponencial para la marca y para el negocio.
          </Paragraph>
          <Paragraph>
            Se valorarán campañas y estrategias impulsadas por datos cualitativos y cuantitativos, basados en insights de negocio o de consumidor.
          </Paragraph>
        </Panel>
        <Panel header="Creación de Contenido" key="4">
          <Paragraph>
            Esta categoría destaca aquellas campañas o acciones que buscan conectar con el consumidor a través de la creación de contenidos con el objetivo de informar o entretener a los posibles clientes de una marca.
          </Paragraph>
          <Paragraph>
            Esta categoría incluye a creadores de contenido/ influencers que se transformen en embajadores de la marca que impulsan ventas
          </Paragraph>
        </Panel>
        <Panel header="Branding" key="5">
          <Paragraph>
            Esta categoría reconoce aquellas campañas o acciones que generaron impacto en la salud de marcas.
          </Paragraph>
        </Panel>
        <Panel header="Impacto Positivo" key="6">
          <Paragraph>
            El objetivo de esta categoría es premiar aquellos casos que demuestren generar impacto positivo en materia de sustentabilidad, inclusión y/o diversidad.
          </Paragraph>
          <Paragraph>
            Se valorará el impacto que estas acciones generen en la salud de la marca.
          </Paragraph>
        </Panel>
      </Collapse>
    </>
  )
}
