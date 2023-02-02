import { Alert, Button, Card, Checkbox, Col, Form, Input, Row, Typography } from "antd"
import { useSelector, useDispatch } from 'react-redux'
import { BiLockAlt, BiUser } from 'react-icons/bi';
import { BsFacebook, BsMicrosoft } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react'

import {
  startFacebookSignIn,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startMicrosoftSignIn,
  startCreatingUserWithEmailPassword
} from "../store/auth/thunks";
import { AiOutlineMail } from "react-icons/ai";


const { Text, Title } = Typography;

export const Login = () => {
  const { status, errorMessage } = useSelector((state: any) => state.auth)
  const [isRegister, setIsRegister] = useState(false)
  const dispatch = useDispatch()

  const handleLogin = ({ email, password }: { email: string, password: string }) => {
    // @ts-ignore 
    dispatch(startLoginWithEmailPassword({ email, password }))
  }

  const handleLoginWithGoogle = () => {
    // @ts-ignore 
    dispatch(startGoogleSignIn())
  }

  const handleLoginWithFacebook = () => {
    // @ts-ignore 
    dispatch(startFacebookSignIn())
  }

  const handleLoginWithMicrosoft = () => {
    // @ts-ignore 
    dispatch(startMicrosoftSignIn())
  }

  return (
    <Row style={{ background: 'linear-gradient(60deg, rgba(205,210,217,1) 0%, rgba(244,245,247,1) 100%)', }}>
      <Col span={12} xs={24} md={12}>
        <div className="login__container">
          <div className="login__card">
            <div className="login__card_header">
              <Title className="login__card_text" level={4} >
                {isRegister ? 'Registrarse con' : 'Ingresar con'}
              </Title>
            </div>
            <div className="login__card_socials">
              <div onClick={handleLoginWithFacebook} className="login__card_socials_facebook">
                <BsFacebook size={24} />
              </div>
              <div onClick={handleLoginWithMicrosoft} className="login__card_socials_microsoft">
                <BsMicrosoft size={24} />
              </div>
              <div onClick={handleLoginWithGoogle} className="login__card_socials_google">
                <FcGoogle size={24} />
              </div>
            </div>
            <div className="login__card_socials_divider">
              <p className="divider">o</p>
            </div>
            <div className="login__form">
              {isRegister ? (
                <RegisterComponent />
              ) : (
                <>
                  {errorMessage && (
                    <div className="login__error">
                      <Text style={{ textAlign: 'center' }} type="danger">Usuario o Contraseña Invalidos</Text>
                    </div>
                  )}
                  <Form
                    name="normal_login"
                    className="login-form"
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
                  <div className="login__footer">
                    {`¿Ya tienes una cuenta?`}
                    <a href="#" onClick={() => setIsRegister(false)} >Ingresar</a>
                  </div>
                ) : (
                  <div className="login__footer">
                    {`¿No tienes una cuenta?`}
                    <a href="#" onClick={() => setIsRegister(true)} >Registrase</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Col>
      <Col span={12} xs={0} md={12}>
        <Card style={{
          border: 'none',
          boxShadow: 'rgb(106 101 255 / 20%) 5px 7px 15px 0px inset',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: 'calc(100% - 2rem)',
          height: 'calc(100vh - 2rem)',
          position: 'relative',
          textAlign: 'center',
          margin: '16px',
          paddingLeft: '80px',
          paddingRight: '80px',
          opacity: '1',
          background: 'linear-gradient(60deg, rgba(205,210,217,1) 0%, rgba(244,245,247,1) 100%)',
          color: 'rgb(52, 71, 103)',
          borderRadius: '0.75rem',
          overflow: 'hidden',
        }}>
          <img src="/assets/login_portada.png" style={{
            width: '100%',
            maxWidth: '250px',
            opacity: '1',
            background: 'transparent',
            color: 'rgb(52, 71, 103)',
          }} />
          <Title style={{ color: '#ff4256' }} className="login__title" level={2} >
            Premiando la efectividad
          </Title>
          <Text className="login__text">
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