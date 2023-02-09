import styles from './styles.module.scss'

export const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__text}>Intercorp Marketing Awards 2023</div>
        <div>Powered by Essence Marketing Partner</div>
      </div>
    </section>
  )
}