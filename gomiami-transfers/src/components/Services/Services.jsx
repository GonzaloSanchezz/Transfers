import { useLang } from '../../context/LangContext'
import styles from './Services.module.css'

const ICONS = [
  // ... (Tus mismos SVGs intactos aquí) ...
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">...</svg>,
  // Asegúrate de mantener la constante ICONS igual
]

const NUMS = ['01', '02', '03', '04', '05', '06', '07']

const ARROW = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M1.5 6h9M7 2.5l3.5 3.5L7 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

function Card({ item, icon, num, bookNow }) {
  return (
    <div className={styles.card}>
      <span className={styles.num}>{num}</span>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.cardTitle}>{item.title}</h3>
      <p className={styles.cardDesc}>{item.desc}</p>
      <a href="#quoter" className={styles.cardLink}>
        {bookNow} {ARROW}
      </a>
    </div>
  )
}

export default function Services() {
  const { t } = useLang()
  const items = t.services.items

  return (
    <section className={styles.section} id="services">
      <div className={styles.inner}>

        <div className={styles.header}>
          <span className={styles.tag}>{t.services.tag}</span>
          <h2 className={styles.title}>
            {t.services.title.split('\n').map((l, i) => <span key={i}>{l}</span>)}
          </h2>
        </div>

        {/* Unificamos todo en un solo Grid */}
        <div className={styles.servicesGrid}>
          {items.map((item, i) => (
            <Card 
              key={i} 
              item={item} 
              icon={ICONS[i]} 
              num={NUMS[i]} 
              bookNow={t.services.bookNow} 
            />
          ))}
        </div>

      </div>
    </section>
  )
}