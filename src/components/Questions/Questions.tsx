import { Card, Form, Button, Steps, Result, } from "antd"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IPost } from "../../interfaces/Post";
import { QuestionModal } from "../Modals";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { Step5 } from "./Step5";

const { Step } = Steps;

interface QuestionsProps {
  id: string;
  post: IPost;
}

export const Questions = ({ id, post }: QuestionsProps) => {
  const [openModal, setOpenModal] = useState({ visible: false, notaFinal: 0 })
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
      title: 'Pregunta 5',
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

    form.validateFields().then(() => {
      setOpenModal({
        visible: true,
        notaFinal
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
              key="console"
            >
              Volver
            </Button>,
          ]}
        />
      </Card>
    )
  }

  return (
    <Card style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)' }}>

      {post.scored ? (
        <Result
          status="success"
          title="El caso ha sido puntuado correctamente"
          subTitle="Puede ver sus casos evaluados en el dashboard principal"
          extra={[
            <Button
              onClick={() => navigate('/')}
              type="primary"
              key="console"
            >
              Volver
            </Button>,
          ]}
        />
      ) : (
        <>
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
              <Button style={{ margin: '8px 0' }} type="primary" onClick={handleSubmit}>
                Enviar
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={prev}>
                Volver
              </Button>
            )}
          </div>
        </>
      )}
      <QuestionModal
        id={id}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setPublished={setPublished}
      />
    </Card >
  )
}
