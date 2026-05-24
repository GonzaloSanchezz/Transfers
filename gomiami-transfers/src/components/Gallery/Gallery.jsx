 
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import styles from './Gallery.module.css'

const items = [
  { id: 1, label: 'Interior VIP', aspect: 'wide', gradient: 'linear-gradient(135deg, #1a1410 0%, #2a2015 50%, #1a1008 100%)' },
  { id: 2, label: 'Night Transfer', aspect: 'tall', gradient: 'linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #080810 100%)' },
  { id: 3, label: 'Airport Pickup', aspect: 'normal', gradient: 'linear-gradient(135deg, #0f0f0a 0%, #1a1a10 50%, #0a0a08 100%)' },
  { id: 4, label: 'Fleet Line', aspect: 'normal', gradient: 'linear-gradient(135deg, #0a0f0a 0%, #101a10 50%, #080a08 100%)' },
  { id: 5, label: 'Orlando Route', aspect: 'wide', gradient: 'linear-gradient(135deg, #0f0a10 0%, #1a1020 50%, #0a0810 100%)' },
]

function GalleryItem({ item }) {
  const [active, setActive] = useState(false)
  return (
    <div
      className={`${styles.item} ${styles[item.aspect]}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className={styles.itemBg} style={{ background: item.gradient }}>
        <div className={styles.itemPattern} />
        <div className={styles.itemLines} />
      </div>
      <div className={`${styles.itemOverlay} ${active ? styles.itemOverlayActive : ''}`} />
      <div className={styles.itemLabel}>{item.label}</div>
      <div className={styles.itemCorner} />
    </div>
  )
}

export default function Gallery() {
  const { t } = useLang()

  return (
    <section className={styles.section} id="gallery">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.tag}>{t.gallery.tag}</span>
          <h2 className={styles.title}>
            {t.gallery.title.split('\n').map((l, i) => (
              <span key={i} className={i === 1 ? styles.titleAccent : ''}>{l}</span>
            ))}
          </h2>
        </div>
        <div className={styles.grid}>
          {items.map(item => <GalleryItem key={item.id} item={item} />)}
        </div>
        <p className={styles.note}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M8 7v5M8 5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Real vehicle photos coming soon — placeholder gallery shown above.
        </p>
      </div>
    </section>
  )
}