import { Alert, Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import { BiLockAlt, BiUser } from 'react-icons/bi';
import { AiOutlineMail } from "react-icons/ai";
import { useState } from 'react';

import { startLoginWithEmailPassword, startCreatingUserWithEmailPassword } from "../../store/auth";
import styles from './login.module.scss'

const { Text, Title, Paragraph } = Typography;

export const Login = () => {
  const { status, errorMessage } = useSelector((state: any) => state.auth)
  const [isRegister, setIsRegister] = useState(false)
  const dispatch = useDispatch()

  const handleLogin = ({ email, password }: { email: string, password: string }) => {
    // @ts-ignore 
    dispatch(startLoginWithEmailPassword({ email, password }))
  }

  return (
    <Row className={styles.login}>
      <Col span={12} xs={24} md={12}>
        <div className={styles.login__container}>
          <div className={styles.login__card}>
            <div className={styles.login__card_header}>
              <Title className={styles.login__card_text} level={4} >
                {isRegister ? 'Registro de Nuevo Usuario' : 'Ingresar con'}
              </Title>
              {isRegister ? (
                <Alert
                  style={{ background: '#e7e9ed' }}
                  closable
                  message="Importante"
                  description="Por favor utilize soloamente casilla de correo profesional para el registro en Intercorp Marketing Awards 2023."
                  type="info"
                  showIcon
                />
              ) : null}
            </div>
            <div>
              <img src="" alt="" />
            </div>
            <div className={styles.login__form}>
              {isRegister ? (
                <RegisterComponent />
              ) : (
                <>
                  {errorMessage && (
                    <div className={styles.login__error}>
                      <Text style={{ textAlign: 'center' }} type="danger">El usuario no existe o las credenciales son invalidas!</Text>
                    </div>
                  )}
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
                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: 'Por favor ingrese su contraseña.' }]}
                    >
                      <Input
                        size="large"
                        type="password"
                        placeholder="Contraseña"
                        prefix={<BiLockAlt />}
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        htmlType="submit"
                        size="large"
                        block
                        type="primary"
                        loading={status === 'checking'}
                      >
                        Ingresar
                      </Button>
                    </Form.Item>
                  </Form>
                </>
              )}
              <div>
                {isRegister ? (
                  <div className={styles.login__footer}>
                    {`¿Ya tienes una cuenta?`}
                    <a href="#" onClick={() => setIsRegister(false)} >Ingresar</a>
                  </div>
                ) : (
                  <div className={styles.login__footer}>
                    {`¿No tienes una cuenta?`}
                    <a href="#" onClick={() => setIsRegister(true)} >Registrarse</a>
                  </div>
                )}
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
          <Text className={styles.login__text}>
            The more effortless the writing looks, the more effort the writer actually put into the process.
          </Text>
        </Card>
      </Col>
    </Row >
  )
}

const RegisterComponent = () => {
  const { status } = useSelector((state: any) => state.auth)
  const dispatch = useDispatch()

  const handleRegister = (values: any) => {
    // @ts-ignore 
    dispatch(startCreatingUserWithEmailPassword(values))
  }

  return (
    <Form
      name="normal_login"
      className="login-form"
      onFinish={handleRegister}
    >
      <Form.Item
        name="displayName"
        rules={[{ required: true, message: 'Por favor ingrese su usuario.' }]}
      >
        <Input
          size="large"
          type="text"
          placeholder="Nombre de Usuario"
          prefix={<BiUser />}
        />
      </Form.Item>
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
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Por favor ingrese su contraseña.' }]}
      >
        <Input
          size="large"
          type="password"
          placeholder="Contraseña"
          prefix={<BiLockAlt />}
        />
      </Form.Item>

      <Form.Item>
        <Button
          htmlType="submit"
          size="large"
          block
          type="primary"
          loading={status === 'checking'}
        >
          Registrarse
        </Button>
      </Form.Item>
    </Form >
  )
}