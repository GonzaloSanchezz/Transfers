import { useRef } from 'react'
import { useLang } from '../../context/LangContext'
import styles from './Hero.module.css'

export default function Hero() {
  const { t, lang } = useLang()
  const isEs = lang === 'es'
  const heroRef = useRef(null)

  // Efecto de iluminación interactiva que sigue el cursor
  const handleMouseMove = (e) => {
    if (!heroRef.current) return
    const { left, top, width, height } = heroRef.current.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    heroRef.current.style.setProperty('--mouse-x', x)
    heroRef.current.style.setProperty('--mouse-y', y)
  }

  const stats = [
    { num: '500+', label: isEs ? 'Viajes Mensuales' : 'Monthly Trips' },
    { num: '8',    label: isEs ? 'Modelos de Vehículos' : 'Vehicle Models' },
    { num: '24/7', label: isEs ? 'Disponibilidad' : 'Available' },
    { num: '5★',   label: isEs ? 'Calificación' : 'Rating' },
  ]

  return (
    <section 
      className={styles.hero} 
      id="home" 
      ref={heroRef}
      onMouseMove={handleMouseMove}
    >
      {/* ── Fondo interactivo ── */}
      <div className={styles.bg}>
        <div className={styles.bgBase} />
        <div className={styles.bgInteractiveGlow} />
        <div className={styles.bgGrid} />
        <div className={styles.bgDots} />
        <div className={styles.bgOrnament} />
      </div>

      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLine} />
          <span className={styles.eyebrowText}>{t.hero.tag}</span>
          <span className={styles.eyebrowLine} />
        </div>

        <h1 className={styles.headline}>
          <span className={styles.headlineRow}>
            <span className={styles.headlineRowInner}>{t.hero.title.split('\n')[0]}</span>
          </span>
          <span className={styles.headlineRow}>
            <span className={styles.headlineRowInner}>{t.hero.title.split('\n')[1]}</span>
          </span>
          <span className={styles.headlineAccent} data-text={t.hero.titleAccent}>
            {t.hero.titleAccent}
          </span>
        </h1>

        <p className={styles.lead}>{t.hero.subtitle}</p>

        <div className={styles.actions}>
          <a href="#quoter" className={styles.primaryBtn}>
            <span className={styles.btnShimmer} />
            <span className={styles.btnText}>{t.hero.cta}</span>
          </a>
          <a href="#fleet" className={styles.secondaryBtn}>
            <span className={styles.secondaryBtnText}>{t.hero.ctaSub}</span>
            <div className={styles.secondaryBtnIcon}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </a>
        </div>

        {/* ── Tarjeta flotante Glassmorphism para stats ── */}
        <div className={styles.statsWrapper}>
          <div className={styles.statsGlow} />
          <div className={styles.stats}>
            {stats.map(s => (
              <div key={s.num} className={styles.stat}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.scrollCue}>
        <div className={styles.scrollCueLine} />
      </div>
    </section>
  )
}