import { Row, Col, Input, Button, Card, Typography, Form } from "antd"
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { BiLockAlt } from "react-icons/bi"

import { resetPassword } from "../../api/auth"
import styles from './styles.module.scss'

const { Title, Text } = Typography;

export const ResetPassword = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [params] = useSearchParams()
  const token = params.get('token')

  const handleLogin = (values: any) => {
    setLoading(true)
    resetPassword({ ...values, token })
      .then(({ data }) => {
        setLoading(false)
        navigate('/login')
      })
      .catch((error) => {
        console.log(error.response.data)
        setErrorMessage(error.response.data.message[0])
      })
      .finally(() => {
        setLoading(false)
      })
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
            <div>
              <img src="" alt="" />
            </div>
            <div className={styles.login__form}>
              <Form
                name="normal_login"
                className={styles.login_form}
                onFinish={handleLogin}
              >
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Por favor ingrese su nueva contraseña.' }]}
                >
                  <Input
                    size="large"
                    type="password"
                    placeholder="Ingrese su nueva contraseña"
                    prefix={<BiLockAlt />}
                  />
                </Form.Item>
                <Button
                  htmlType="submit"
                  size="large"
                  block
                  type="primary"
                  loading={loading}
                >
                  Reestablecer Contraseña
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