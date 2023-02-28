import { message, Modal, Typography } from 'antd'
import { useState } from 'react'

import { updatePost } from '../../api/Post';

const { Paragraph } = Typography

interface QuestionModalProps {
  id: string;
  openModal: { visible: boolean; notaFinal: number; };
  setPublished: (value: boolean) => void
  setOpenModal: ({ visible, notaFinal }: { visible: boolean; notaFinal: number; }) => void;
}


export const QuestionModal = ({ id, openModal, setOpenModal, setPublished }: QuestionModalProps) => {
  const [loading, setLoading] = useState(false)

  const handleOk = () => {
    updatePost(id, {
      juryScore: openModal.notaFinal,
      scored: true
    })
      .then(({ data }) => {
        message.success(`El score final es de ${openModal.notaFinal} pts.`)
        setPublished(true)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        handleCancel()
      })
      .finally(() => {
        setLoading(false)
        handleCancel()
      })
  }

  const handleCancel = () => {
    setOpenModal({
      visible: false,
      notaFinal: 0
    });
  };

  return (
    <Modal
      title="¿Estás seguro que desea evaluar este caso?"
      open={openModal.visible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={handleCancel}
      okText='Evaluar ahora'
      cancelText='No lo he decidido aún'
    >
      <p>
        Una vez evaluado no se podrá eliminar ni cambiar el contenido. Ante cualquier duda o error en la presentación consulte al soporte de Intercorp Marketing Awards 2023 en
        <span> </span>
        <a href="mailto:info@intercorpmarketingawards.com">info@intercorpmarketingawards.com</a>
        <span> </span>
        o comunicarse al
        <br />
        +54 9 11 2390 2334
      </p>
      <Typography>
        <Paragraph>
          ¡Gracias por considerarnos!
        </Paragraph>
      </Typography>
    </Modal >
  )
}