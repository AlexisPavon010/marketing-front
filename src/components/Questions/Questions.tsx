import { Card, Form, Button, Steps, Result, message, Typography, } from "antd"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePost } from "../../api/Post";

import { IPost } from "../../interfaces/Post";
import { QuestionModal } from "../Modals";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { Step5 } from "./Step5";

const { Step } = Steps;
const { Title, Paragraph } = Typography;

interface QuestionsProps {
  id: string;
  post: IPost;
}

export const Questions = ({ id, post }: QuestionsProps) => {
  const [loading, setLoading] = useState(false)
  const [published, setPublished] = useState(false)
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});
  const navigate = useNavigate()

  const steps = [
    {
      title: 'Pregunta 1',
      content: (
        <Form form={form} layout="vertical">
          <Step1 />
        </Form>
      ),
    },
    {
      title: 'Pregunta 2',
      content: (
        <Form form={form} layout="vertical">
          <Step2 />
        </Form>
      ),
    },
    {
      title: 'Pregunta 3',
      content: (
        <Form form={form} layout="vertical">
          <Step3 />
        </Form>
      ),
    },
    {
      title: 'Pregunta 4',
      content: (
        <Form form={form} layout="vertical">
          <Step4 />
        </Form>
      ),
    },
    {
      title: 'Resultados',
      content: (
        <Form form={form} layout="vertical">
          <Step5 />
        </Form>
      ),
    },
  ];

  const next = () => {
    setFormValues({ ...formValues, ...form.getFieldsValue() })

    form.validateFields().then(() => {
      setCurrent(current + 1);
    });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = () => {
    const { pregunta1, pregunta2, pregunta3, pregunta4 } = formValues;
    const { pregunta5 } = form.getFieldsValue()

    var puntajeTotal = pregunta1 + pregunta2 + pregunta3 + pregunta4;

    var puntajePonderado1 = (puntajeTotal / 20) * 0.4;

    var puntajePonderado2 = (pregunta5 / 5) * 0.6;

    var notaFinal = (puntajePonderado1 + puntajePonderado2) * 100;

    console.log(Math.round(notaFinal))

    form.validateFields().then(() => {
      setLoading(true)
      updatePost(id, {
        juryScore: Math.round(notaFinal),
        scored: true
      })
        .then(({ data }) => {
          message.success(`El score final es de ${Math.round(notaFinal)} pts.`)
          setPublished(true)
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
        })
        .finally(() => {
          setLoading(false)
        })
    })

  };

  if (published) {
    return (
      <Card style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)' }}>
        <Result
          status="success"
          title="El caso ha sido puntuado correctamente"
          subTitle="Puede ver sus casos evaluados en el dashboard principal"
          extra={[
            <Button
              onClick={() => navigate('/')}
              type="primary"
            >
              Menú Principal
            </Button>,
            <Button onClick={() => setPublished(false)} >Volver a Evaluar</Button>,
          ]}
        />
      </Card>
    )
  }

  return (
    <Card style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)' }}>
      <Typography style={{ marginBottom: '20px' }}>
        <Title level={4}>
          CUESTIONARIO DE JUZGAMIENTO
        </Title>
        <Paragraph>
          A continuación encontrarás las 5 preguntas para puntuar el caso.  Te pedimos que asignes un puntaje a cada pregunta del formulario de acuerdo al criterio preestablecido:
        </Paragraph>
        <Paragraph>
          1: Muy insatisfactorio; 2: Insatisfactorio; 3: Neutral; 4: Satisfactorio; 5: Muy satisfactorio.
        </Paragraph>
        <Paragraph>
          La puntuación final será automática y resultará de la media ponderada de las respuestas.
        </Paragraph>
        <Paragraph>
          Muchas gracias por tu participación
        </Paragraph>
      </Typography>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button style={{ margin: '8px 0' }} type="primary" onClick={next}>
            Siguiente
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            loading={loading}
            style={{ margin: '8px 0' }}
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={prev}>
            Volver
          </Button>
        )}
      </div>
    </Card >
  )
}
