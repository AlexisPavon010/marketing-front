import { Row, Col, Input, Button, Card, Form, Typography, Result } from "antd"
import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"

import { recoveryPassword } from "../../api/auth";
import styles from './styles.module.scss'

const { Title, Text } = Typography;

export const RecoveryPassword = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigation = useNavigate()


  const handleLogin = (values: any) => {
    setLoading(true)
    recoveryPassword(values)
      .then(({ data }) => {
        setLoading(false)
        setSuccess(true)
      })
      .catch((error) => {
        console.log(error)
        const message = Array.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message
        setErrorMessage(message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (success) {
    return (
      <Result
        status="success"
        title="¡Solicitud realizada con éxito!"
        subTitle="Por favor, revise su correo electrónico para continuar con el proceso de restablecimiento de contraseña."
        extra={[
          <Button type="primary" key="console" onClick={() => navigation('/login')}>
            Volver
          </Button>,
        ]}
      />
    )
  }

  return (
    <Row className={styles.login}>
      <Col span={12} xs={24} md={12}>
        <div className={styles.login__container}>
          <div className={styles.login__card}>
            <div className={styles.login__card_header}>
              <div className={styles.login__logo_container}>
                <img className={styles.login__logo_mobile} src="/assets/logo-v3.png" alt="" />
              </div>
              <Title className={styles.login__card_text} level={4} >
                Recuperar Contraseña
              </Title>
            </div>
            <div>
              {errorMessage && (
                <p className={styles.login__error}>{errorMessage}</p>
              )}
            </div>
            <div className={styles.login__form}>
              <Form
                name="normal_login"
                className={styles.login_form}
                onFinish={handleLogin}
              >
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: 'Por favor ingrese su correo.' }]}
                >
                  <Input
                    size="large"
                    type="email"
                    placeholder="Correo"
                    prefix={<AiOutlineMail />}
                  />
                </Form.Item>
                <Button
                  htmlType="submit"
                  size="large"
                  block
                  type="primary"
                  loading={loading}
                >
                  Recuperar
                </Button>
              </Form>
              <div>
                <div className={styles.login__footer}>
                  {`¿Ya tienes una cuenta?`}
                  <Link to="/login">Ingresar</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
      <Col span={12} xs={0} md={12}>
        <Card className={styles.login__right}>
          <img className={styles.login__img} src="/assets/login_portada.png" />
          <Title style={{ color: '#ff4256' }} className={styles.login__title} level={2} >
            Premiando la efectividad
          </Title>
        </Card>
      </Col>
    </Row >
  )
}
