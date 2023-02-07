import { Layout } from 'antd';

import styles from './styles.module.scss'
import { Navbar } from './Navbar';

interface Props {
  children: JSX.Element | JSX.Element[]
}

const { Content } = Layout;

export const LayoutComponent = ({ children }: Props) => {
  return (
    <>
      <Layout className={styles.layout}>
        <Layout style={{ width: '100%' }}>
          <Navbar />
          <Content className={styles.main_content}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
