 
import { useState, useEffect } from 'react'
import { useLang } from '../../context/LangContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#services', label: t.nav.services },
    { href: '#fleet', label: t.nav.fleet },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#quoter', label: t.nav.quote },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#" className={styles.logo}>
        <span className={styles.logoGo}>Go</span>
        <span className={styles.logoMiami}>Miami</span>
        <span className={styles.logoTransfers}>Transfers</span>
      </a>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
          </li>
        ))}
      </ul>

      <div className={styles.right}>
        <button
          className={styles.langToggle}
          onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
        >
          {lang === 'en' ? 'ES' : 'EN'}
        </button>
        <a href="#quoter" className={styles.ctaBtn}>{t.nav.quote}</a>
        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}