import { Row, Col, Button, Avatar, Layout } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { MdNotificationsActive } from 'react-icons/md'
import { CgMenu } from 'react-icons/cg'

import { startLogout } from '../../store/auth';

interface NavbarProps {
  openMenu: () => any;
}

const { Header } = Layout;

export const Navbar = ({ openMenu }: NavbarProps) => {
  const { displayName, photoURL, email } = useSelector((state: any) => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    // @ts-ignore
    dispatch(startLogout())
  }

  return (
    <Header style={{ background: 'white' }}>
      <div className="header__wrapper">
        <Row align="middle" gutter={16}>
          <Col lg={0} >
            <Button style={{
              display: 'flex'
            }} className="header__menu" type="link" onClick={openMenu} icon={<CgMenu size={24} color="#525F7F" />} />
          </Col>
          <Col flex={1}>
          </Col>
          <Col md={{ span: 'auto' }}>
            <Avatar size='large' onClick={handleLogout} src={photoURL ? photoURL : null} alt={displayName} >
              {displayName ? displayName?.charAt(0).toUpperCase() : email?.charAt(0).toUpperCase()}
            </Avatar>
          </Col>
        </Row>
      </div>
    </Header>
  )
}
