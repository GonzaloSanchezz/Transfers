import { useState, useEffect } from 'react'
import { useLang } from '../../context/LangContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Detectar scroll para el navbar transparente
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloquear el scroll de la página cuando el menú está abierto en mobile
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  const links = [
    { href: '#services', label: t.nav.services },
    { href: '#fleet', label: t.nav.fleet },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#quoter', label: t.nav.quote },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.navMenuOpen : ''}`}>
      <a href="#" className={styles.logo} onClick={() => setMenuOpen(false)}>
        <span className={styles.logoGo}>Go</span>
        <span className={styles.logoMiami}>Miami</span>
        <span className={styles.logoSep} />
        <span className={styles.logoTransfers}>Transfers</span>
      </a>

      {/* Overlay oscuro para cerrar al hacer click fuera en mobile */}
      <div 
        className={`${styles.menuOverlay} ${menuOpen ? styles.menuOverlayOpen : ''}`} 
        onClick={() => setMenuOpen(false)} 
      />

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
          onClick={() => {
            setLang(lang === 'en' ? 'es' : 'en');
            setMenuOpen(false); // Opcional: Cierra el menú si cambian idioma
          }}
        >
          {lang === 'en' ? 'ES' : 'EN'}
        </button>
        
        <a href="#quoter" className={styles.ctaBtn}>
          <span>{t.nav.quote}</span>
        </a>

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