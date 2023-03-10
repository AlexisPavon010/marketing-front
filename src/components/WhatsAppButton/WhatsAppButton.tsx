import { Button } from "antd"
import { BsChatSquareDotsFill } from "react-icons/bs"

import styles from './styles.module.scss'

export const WhatsAppButton = () => {
  return (
    <Button
      className={styles.btn_whatsapp}
      onClick={() => window.open('https://api.whatsapp.com/send/?phone=5491123902334&type=phone_number&app_absent=0')}
      icon={< BsChatSquareDotsFill size={24} />}
      type="primary"
      size="large"
      shape="circle"
    />
  )
}