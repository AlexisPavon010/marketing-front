import { Row, Col, Button, Avatar } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { MdNotificationsActive } from 'react-icons/md'
import { CgMenu } from 'react-icons/cg'
import { Header } from 'antd/es/layout/layout';
import { startLogout } from '../../store/auth';
import ts from 'typescript';


interface NavbarProps {
  openMenu: () => any;
}

export const Navbar = ({ openMenu }: NavbarProps) => {
  const { displayName, photoURL, email } = useSelector((state: any) => state.auth)
  const dispatch = useDispatch()

  console.log(email)

  const handleLogout = () => {
    // @ts-ignore
    dispatch(startLogout())
  }


  return (
    <Header>
      <div className="header__wrapper">
        <Row align="middle" gutter={16}>
          <Col lg={0}>
            <Button className="header__menu" type="link" onClick={openMenu} icon={<CgMenu size={24} color="#525F7F" />} />
          </Col>
          <Col className="ant-col-xs" lg={0}>
            {/* <img alt='picker' src={IMAGES.logo.iso} width={29} /> */}
          </Col>
          <Col flex={1}>
          </Col>
          <Col>
            <div className="avatar">
              <MdNotificationsActive size={16} color="#3F4D70" />
            </div>
          </Col>
          <Col md={{ span: 'auto' }}>
            <Avatar size='large' onClick={handleLogout} src={photoURL ? photoURL : ''} alt={displayName} >
              {displayName ? displayName?.charAt(0).toUpperCase() : email?.charAt(0).toUpperCase()}
            </Avatar>
          </Col>
        </Row>
      </div>
    </Header>
  )
}
