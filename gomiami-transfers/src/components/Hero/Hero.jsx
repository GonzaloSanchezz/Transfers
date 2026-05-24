import { useLang } from '../../context/LangContext'
import styles from './Hero.module.css'

export default function Hero() {
  const { t } = useLang()

  return (
    <section className={styles.hero} id="home">
      <div className={styles.bg}>
        <div className={styles.bgBase} />
        <div className={styles.bgGlow} />
        <div className={styles.bgGrid} />
        <div className={styles.bgDots} />
        <div className={styles.bgOrnament} />
      </div>

      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLine} />
          {t.hero.tag}
          <span className={styles.eyebrowLine} />
        </div>

        <h1 className={styles.headline}>
          <span className={styles.headlineRow}>
            <span className={styles.headlineRowInner}>{t.hero.title.split('\n')[0]}</span>
          </span>
          <span className={styles.headlineRow}>
            <span className={styles.headlineRowInner}>{t.hero.title.split('\n')[1]}</span>
          </span>
          <span className={styles.headlineAccent}>{t.hero.titleAccent}</span>
        </h1>

        <p className={styles.lead}>{t.hero.subtitle}</p>

        <div className={styles.actions}>
          <a href="#quoter" className={styles.primaryBtn}>
            <span>{t.hero.cta}</span>
          </a>
          <a href="#fleet" className={styles.secondaryBtn}>
            {t.hero.ctaSub}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <div className={styles.stats}>
          {[
            { num: '500+', label: 'Monthly Trips' },
            { num: '8',    label: 'Vehicle Models' },
            { num: '24/7', label: 'Available' },
            { num: '5★',   label: 'Rating' },
          ].map(s => (
            <div key={s.num} className={styles.stat}>
              <span className={styles.statNum}>{s.num}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.scrollCue}>
        <div className={styles.scrollCueLine} />
      </div>
    </section>
  )
}