import { Modal, Typography } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

import { deletedPost } from "../../api";

const { Paragraph } = Typography

export const DeletedModal = ({ openModal, setOpenModal, getData }: any) => {
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleOk = () => {
    setConfirmLoading(true);
    console.log(openModal)
    if (!openModal.id) return
    deletedPost(openModal.id)
      .then(({ data }) => {
        toast.success('Postulación eliminada con exito!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "light",
        });
        getData()
        setOpenModal({ visible: false, id: null })
      })
      .catch((error) => {
        toast.error('Opps! Ocurrio un error', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "light",
        });
        console.log(error)
      })
      .finally(() => setConfirmLoading(false))
  }

  const handleCancel = () => {
    setOpenModal({ visible: false, id: null });
  };

  return (
    <Modal
      title="¿Estás seguro que desea eliminar el caso?"
      open={openModal.visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText='Borrar Caso'
      cancelText='Cancelar'
    >
      <p>
        Una vez eliminado no se podrá recuperar el contenido. Ante cualquier duda o error en la eliminación consulte al soporte de Intercorp Marketing Awards.
      </p>
      <Typography>
        <Paragraph>
          ¡Gracias por considerarnos!
        </Paragraph>
      </Typography>
    </Modal >
  )
}