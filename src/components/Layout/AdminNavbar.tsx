import { Row, Col, Button, Avatar, Layout, Dropdown } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { CgMenu } from 'react-icons/cg';
import type { MenuProps } from 'antd';

import styles from './styles.module.scss'
import { startLogout } from '../../store/auth';

interface NavbarProps {
  openMenu: () => any;
}

const { Header } = Layout;

export const AdminNavbar = ({ openMenu }: NavbarProps) => {
  const { username, photoURL, email } = useSelector((state: any) => state.auth)
  const dispatch = useDispatch()
  const location = useLocation()

  const handleLogout = () => {
    // @ts-ignore
    dispatch(startLogout())
  }

  const items: MenuProps['items'] = [
    {
      label: username,
      key: '0',
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
          <Col flex={1}>
          </Col>
          <Col md={{ span: 'auto' }}>
            <Dropdown menu={{ items }} trigger={['click']}>
              <Avatar size='large' src={photoURL ? photoURL : null} alt={username} >
                {username ? username?.charAt(0).toUpperCase() : email?.charAt(0).toUpperCase()}
              </Avatar>
            </Dropdown>
          </Col>
        </Row>
      </div>
    </Header>
  )
}
