import { Button } from "antd"
import { BsWhatsapp } from "react-icons/bs"

import styles from './styles.module.scss'

export const WhatsAppButton = () => {
  return (
    <Button
      className={styles.btn_whatsapp}
      onClick={() => window.open('https://api.whatsapp.com/send/?phone=541154742323&type=phone_number&app_absent=0')}
      icon={< BsWhatsapp size={24} />}
      type="primary"
      size="large"
      shape="circle"
    />
  )
}