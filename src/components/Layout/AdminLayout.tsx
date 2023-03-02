import { Drawer, Layout } from 'antd';
import { useState } from 'react';

import styles from './styles.module.scss'
import { SideMenu } from './SideMenu';
import { AdminNavbar } from './AdminNavbar';
import { Footer } from '../Footer';

interface Props {
  children: JSX.Element | JSX.Element[]
}

const { Content, Sider } = Layout;

export const AdminLayout = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const openMenu = () => setIsMenuOpen(true)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      {/* <Layout className={styles.layout}>
        <Sider className="sider" width={250} theme={'light'} >
          <div className={styles.sider__header} >
            <img className={styles.sider__logo} src="/assets/logo-v3.png" alt="" />
          </div>
          <SideMenu />
        </Sider> */}
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
        <div className={styles.sider__header} >
          <img className={styles.sider__logo} src="/assets/logo-v3.png" alt="" />
        </div>
        <SideMenu closeMenu={closeMenu} />
      </Drawer>
      <Layout>
        <AdminNavbar openMenu={openMenu} />
        <Content className={styles.main_content_admin}>
          {children}
        </Content>
        <Footer />
      </Layout>
      {/* </Layout> */}
    </>
  )
}
