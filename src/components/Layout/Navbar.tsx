import { Row, Col, Button, Avatar, Layout, Dropdown } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import type { MenuProps } from 'antd';
import { CgMenu } from 'react-icons/cg'

import { startLogout } from '../../store/auth';
import { useLocation } from 'react-router-dom';

interface NavbarProps {
  openMenu: () => any;
}

const { Header } = Layout;

export const Navbar = ({ openMenu }: NavbarProps) => {
  const { displayName, photoURL, email } = useSelector((state: any) => state.auth)
  const dispatch = useDispatch()
  const location = useLocation()

  const handleLogout = () => {
    // @ts-ignore
    dispatch(startLogout())
  }

  const items: MenuProps['items'] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: 'Cerrar Sesión',
      key: '3',
      onClick: handleLogout
    },
  ];

  return (
    <Header style={{ background: 'white' }}>
      <div className="header__wrapper">
        <Row align="middle" gutter={16}>
          <Col lg={0} >
            <Button
              style={{
                display: 'flex'
              }}
              className="header__menu" type="link" onClick={openMenu} icon={<CgMenu size={24} color="#525F7F" />} />
          </Col>
          {location.pathname === '/' && (
            <img className='home__logo' style={{ height: '30px' }} src="/assets/logo-v3.png" alt="" />
          )}
          <Col flex={1}>
          </Col>
          <Col md={{ span: 'auto' }}>
            <Dropdown menu={{ items }} trigger={['click']}>
              <Avatar size='large' src={photoURL ? photoURL : null} alt={displayName} >
                {displayName ? displayName?.charAt(0).toUpperCase() : email?.charAt(0).toUpperCase()}
              </Avatar>
            </Dropdown>
          </Col>
        </Row>
      </div>
    </Header>
  )
}
