import { Button, Card, Checkbox, Col, Form, Input, Row, Typography } from "antd"
import { useSelector, useDispatch } from 'react-redux'
import { BiLockAlt, BiUser } from 'react-icons/bi';
import { BsFacebook, BsMicrosoft } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { startFacebookSignIn, startGoogleSignIn, startLoginWithEmailPassword, startMicrosoftSignIn } from "../store/auth/thunks";


const { Text, Title } = Typography;

export const Login = () => {
  const { status } = useSelector((state: any) => state.auth)
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
    <Row>
      <Col span={12} xs={24} md={12}>
        <div className="login__container">
          <div className="login__card">
            <div className="login__card_header">
              <Title className="login__card_text" level={4} >
                Register with
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
              <p className="divider">or</p>
            </div>
            <div className="login__form">
              <Form
                name="normal_login"
                className="login-form"
                onFinish={handleLogin}
              >
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                  <Input
                    size="large"
                    type="email"
                    placeholder="Username"
                    prefix={<BiUser className="site-form-item-icon" />}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                  <Input
                    size="large"
                    type="password"
                    placeholder="Password"
                    prefix={<BiLockAlt className="site-form-item-icon" />}
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <a className="login-form-forgot" href="">
                    Forgot password
                  </a>
                </Form.Item>

                <Form.Item>
                  <Button
                    htmlType="submit"
                    size="large"
                    block
                    type="primary"
                    loading={status === 'checking'}
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Col>
      <Col span={12} xs={0} md={12}>
        <Card style={{
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
          background: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))',
          color: 'rgb(52, 71, 103)',
          borderRadius: '0.75rem',
          overflow: 'hidden',
        }}>
          <img src="https://demos.creative-tim.com/soft-ui-dashboard-pro-react/static/media/chat.3259bb6fd08a875331ed.png" style={{
            width: '100%',
            maxWidth: '31.25rem',
            opacity: '1',
            background: 'transparent',
            color: 'rgb(52, 71, 103)',
          }} />
          <Title className="login__title" level={2} >
            "Attention is the new currency"
          </Title>
          <Text className="login__text">
            The more effortless the writing looks, the more effort the writer actually put into the process.
          </Text>
        </Card>
      </Col>
    </Row >
  )
}
