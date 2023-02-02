import { Col, Drawer, Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { useState } from 'react';
import { Navbar } from './Navbar';
import { SideMenu } from './SideMenu';

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const LayoutComponent = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const openMenu = () => setIsMenuOpen(true)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      <Layout style={{ minHeight: '100vh', flexDirection: 'row' }}>
        <Drawer
          placement="left"
          closable={false}
          onClose={closeMenu}
          open={isMenuOpen}
          width={250}
          bodyStyle={{
            padding: 0,
            position: 'fixed'
          }}
        >
          <div style={{ padding: 16, background: 'rgba(255, 255, 255, 0.2)', borderBottom: '1px solid rgba(5, 5, 5, 0.06)' }} >
            <img className='side__logo' src="/assets/logo-v3.png" alt="" />
          </div>
          <SideMenu closeMenu={closeMenu} />
        </Drawer>
        <Layout>
          <Navbar openMenu={openMenu} />
          <Content className="main-content" style={{
            maxWidth: '1280px',
            width: '100%',
            margin: '0 auto'
          }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
