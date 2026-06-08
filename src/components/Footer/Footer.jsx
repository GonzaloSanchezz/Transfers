import { useLang } from '../../context/LangContext'
import styles from './Footer.module.css'

export default function Footer() {
  const { t, lang } = useLang()
  const isEs = lang === 'es'

  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.topGold} />

      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoGo}>Go</span>
            <span className={styles.logoMiami}>Miami</span>
            <span className={styles.logoSep} />
            <span className={styles.logoSub}>Transfers</span>
          </div>
          <p className={styles.tagline}>{t.footer.tagline}</p>
          <a href="https://wa.me/13053361521" target="_blank" rel="noreferrer" className={styles.waLink}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM5.5 5.5a2.5 2.5 0 005 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            WhatsApp
          </a>
        </div>

        <div className={styles.col}>
          <h4>{t.nav.services}</h4>
          <ul>
            {t.services.items.slice(0,6).map(s => (
              <li key={s.title}><a href="#services">{s.title}</a></li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h4>{t.nav.fleet}</h4>
          <ul>
            {['Cadillac Escalade','Chevrolet Tahoe','GMC Yukon','Mercedes Sprinter','Ford Transit','VW Atlas'].map(v => (
              <li key={v}><a href="#fleet">{v}</a></li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h4>{t.footer.social}</h4>
          <div className={styles.socials}>
            {[{ l:'Instagram', icon:'IG', href:'#' }, { l:'Facebook', icon:'FB', href:'#' }, { l:'TikTok', icon:'TT', href:'#' }].map(s => (
              <a key={s.l} href={s.href} className={styles.socialLink} target="_blank" rel="noreferrer">
                <span className={styles.socialPill}>{s.icon}</span>
                {s.l}
              </a>
            ))}
          </div>
          <div className={styles.phoneLink}>
            <a href="tel:+13053361521">{t.footer.phone}</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} GoMiami Transfers — {t.footer.rights}</p>
        <div className={styles.bottomRight}>
          <span>Miami, FL</span>
          <span className={styles.bottomDot} />
          <span>{isEs ? 'Transporte Ejecutivo' : 'Executive Transportation'}</span>
        </div>
      </div>
    </footer>
  )
}