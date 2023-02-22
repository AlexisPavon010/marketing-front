import { useState } from "react";
import { Modal, Typography } from "antd";
import { useSelector } from "react-redux";

import { createPost } from "../../api";
import { updatePost } from "../../api/Post";
import { sendPostulation } from "../../api/emails";

const { Paragraph } = Typography

export const AlertModal = ({ openModal, setOpenModal, setPosted, formValues, post }: any) => {
  const { uid, email, username, photoURL, } = useSelector((state: any) => state.auth)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleOk = () => {
    setConfirmLoading(true);
    if (!post?._id) {
      createPost({ ...formValues, uid, published: true, email, username, photoURL, })
        .then(() => {
          sendPostulation(email)
          setPosted(true)
          setOpenModal(false)
        })
        .catch((error) => console.log(error))
        .finally(() => setConfirmLoading(false))
      return
    }

    updatePost(post._id, { ...formValues, published: true })
      .then(() => {
        sendPostulation(email)
        setPosted(true)
        setOpenModal(false)
      })
      .catch((error) => console.log(error))
      .finally(() => setConfirmLoading(false))
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <Modal
      title="¿Estás seguro que desea presentar el caso?"
      open={openModal}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText='Postular ahora'
      cancelText='No lo he decidido aún'
    >
      <p>
        Una vez aceptado no se podrá eliminar ni cambiar el contenido. Ante cualquier duda o error en la presentación consulte al soporte de Intercorp Marketing Awards 2023 en
        <span> </span>
        <a href="mailto:info@intercorpmarketingawards.com">info@intercorpmarketingawards.com</a>
        <span> </span>
        o comunicarse al
        <br />
        +51 9 42 020 546
      </p>
      <Typography>
        <Paragraph>
          ¡Gracias por considerarnos!
        </Paragraph>
      </Typography>
    </Modal >
  )
}