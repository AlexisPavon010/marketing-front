import { Row, Col, Avatar, Layout, Dropdown } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';

import styles from './styles.module.scss'
import { startLogout } from '../../store/auth';

const { Header } = Layout;

export const Navbar = () => {
  const { username, photoURL, email } = useSelector((state: any) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
          <img onClick={() => navigate('/')} className={styles.header__logo} src="/assets/logo-v3.png" alt="" />
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
