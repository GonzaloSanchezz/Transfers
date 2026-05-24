import { useLang } from '../../context/LangContext'
import styles from './Services.module.css'

export default function Services() {
  const { t } = useLang()

  return (
    <section className={styles.section} id="services">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.tag}>{t.services.tag}</span>
          <h2 className={styles.title}>
            {t.services.title.split('\n').map((l, i) => <span key={i}>{l}</span>)}
          </h2>
        </div>

        <div className={styles.grid}>
          {t.services.items.map((item, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardIconWrap}>{item.icon}</div>
              <div className={styles.cardRule} />
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
              <a href="#quoter" className={styles.cardLink}>
                Book Now
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}