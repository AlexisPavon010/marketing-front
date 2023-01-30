import { useState } from "react";
import { Modal } from "antd";
import { useSelector } from "react-redux";

import { createPost } from "../../api";
import { updatePost } from "../../api/Post";


export const AlertModal = ({ openModal, setOpenModal, setPosted, formValues, post }: any) => {
  const { uid, email, displayName, photoURL, } = useSelector((state: any) => state.auth)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleOk = () => {
    setConfirmLoading(true);
    if (!post._id) {
      createPost({ ...formValues, uid, published: true, email, displayName, photoURL, })
        .then(() => {
          setPosted(true)
          setOpenModal(false)
        })
        .catch((error) => console.log(error))
        .finally(() => setConfirmLoading(false))
      return
    }

    updatePost(post._id, { ...formValues, published: true })
      .then(() => {
        setPosted(true)
        setOpenModal(false)
      })
      .catch((error) => console.log(error))
      .finally(() => setConfirmLoading(false))
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpenModal(false);
  };

  return (
    <Modal
      title="Title"
      open={openModal}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <p>¿Estas seguro de que quieres confirmar tu Propuesta?</p>
    </Modal>
  )
}