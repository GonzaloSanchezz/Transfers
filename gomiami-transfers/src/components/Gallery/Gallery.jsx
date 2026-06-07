import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import styles from './Gallery.module.css'

import interiorVipImg  from '../../assets/gallery-interior-vip.jpg'
import nightTransferImg from '../../assets/gallery-night-transfer.jpg'
import airportPickupImg from '../../assets/gallery-airport-pickup.jpg'
import portTransferImg  from '../../assets/gallery-port-transfer.jpg'
import orlandoRouteImg from '../../assets/gallery-orlando-route.jpg'

const items = [
  { id: 1, label: 'Interior VIP',   aspect: 'wide',   img: interiorVipImg  },
  { id: 2, label: 'Night Transfer', aspect: 'tall',   img: nightTransferImg },
  { id: 3, label: 'Airport Pickup', aspect: 'normal', img: airportPickupImg },
  { id: 4, label: 'Port Transfer',  aspect: 'normal', img: portTransferImg },
  { id: 5, label: 'Orlando Route',  aspect: 'wide',   img: orlandoRouteImg },
]

function GalleryItem({ item }) {
  const [active, setActive] = useState(false)
  return (
    <div
      className={`${styles.item} ${styles[item.aspect]}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <img
        src={item.img}
        alt={item.label}
        className={styles.itemPhoto}
        draggable={false}
        loading="lazy"
      />
      <div className={styles.itemBase} />
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
      </div>
    </section>
  )
}