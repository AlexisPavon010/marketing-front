import { Card, Typography } from 'antd'
import { useSelector } from 'react-redux'

import styles from './home.module.scss'
import { CategoriesCard } from '../../components/Categories'
import { CategoriesCollapse } from '../../components/CategoriesCollapse';
import { UserForm } from '../../components/UserForm'
import { StepsComponent } from '../../components/Steps'
import { JuryCollapse } from '../../components/JuryCollapse'
import { ProgressComponent } from '../../components/ProgressComponent'
import { JuryForm } from '../../components/JuryForm'
import { HomeComponent } from '../../components/HomeComponent'
import { JuryComponent } from '../../components/JuryComponent'

const { Title, Paragraph } = Typography;

export const Home = () => {
  const { role } = useSelector((state: any) => state.auth)

  return (
    <>
      <Card className={styles.hero}>
        {role === 'jury' ? (
          <JuryComponent />
        ) : (
          <HomeComponent />
        )}
      </Card>
      <Card className={styles.card__categories}>
        <StepsComponent />
      </Card>
      <Card className={styles.card__categories}>
        <CategoriesCollapse />
      </Card>
      {
        role === 'jury' && (
          <>
            <Card className={styles.card__categories}>
              <ProgressComponent />
            </Card>
            <Card className={styles.card__categories}>
              <JuryCollapse />
            </Card>
          </>
        )
      }
      {
        role !== 'jury' && (
          <>
            <Card className={styles.card__categories}>
              <Typography>
                <Title className={styles.card__categories_title} level={4}>
                  Seleccione la categoría a postular
                </Title>
                <Paragraph>
                  Recuerda que puedes inscribir tu caso en múltiples categoría completando un formulario para cada una.
                </Paragraph>
                <Paragraph>
                  Puedes presentar más de una caso por categoría.
                </Paragraph>
                <Paragraph>
                  <ul>
                    <li>
                      <a target='_blank' href="/Bases_y_Condiciones_IMA_2023.pdf">Bases y Condiciones.</a>
                    </li>
                  </ul>
                </Paragraph>
              </Typography>
            </Card>
            <Card className={styles.card__categories}>
              <CategoriesCard />
            </Card>
          </>
        )
      }
      <Card>
        {role === 'jury' ? (
          <JuryForm />
        ) : (
          <UserForm />
        )}
      </Card>
    </>
  )
}