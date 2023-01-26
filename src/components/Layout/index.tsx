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
        <Sider className="sider" width={250} theme={'light'} >
          <SideMenu />
        </Sider>
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
          <SideMenu closeMenu={closeMenu} />
        </Drawer>
        <Layout>
          <Navbar openMenu={openMenu} />
          <Content className="main-content">
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
