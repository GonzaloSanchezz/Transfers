import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import styles from './Fleet.module.css'

import escaladeImg from '../../assets/escalade.jpg'
import tahoeImg    from '../../assets/tahoe.jpg'
import atlasImg    from '../../assets/atlas.jpg'
import sprinterImg from '../../assets/sprinter.jpg'
import transitImg  from '../../assets/transit.jpg'
import yukonImg    from '../../assets/yukon.jpg'

const vehicles = [
  { id:'escalade', name:'Cadillac Escalade', year:'2025', pax:7,  luggage:6,  tag:'Executive SUV', img: escaladeImg, features:['Quilted Leather Interior','Privacy Partition Glass','Dual-Zone Climate Control','USB-C & Wireless Charging'] },
  { id:'tahoe',    name:'Chevrolet Tahoe',   year:'2025', pax:7,  luggage:5,  tag:'Premium SUV',   img: tahoeImg,    features:['3-Row Premium Seating','Bose Premium Audio','Mobile WiFi Hotspot','Rear Seat Entertainment'] },
  { id:'atlas',    name:'VW Atlas',           year:'2025', pax:7,  luggage:4,  tag:'Luxury SUV',    img: atlasImg,    features:['Panoramic Sunroof','3-Row Seating','USB-C Charging Ports','Digital Cockpit Display'] },
  { id:'sprinter', name:'Mercedes-Benz Sprinter', year:'2025', pax:14, luggage:12, tag:'Executive Van', img: sprinterImg, features:['Executive Club Seating','Mood Ambient Lighting','Large Cargo Bay','Step-Assist Entry'] },
  { id:'transit',  name:'Ford Transit',       year:'2025', pax:15, luggage:14, tag:'Group Van',     img: transitImg,  features:['High-Roof Configuration','Dual Climate Zones','Fleet GPS Tracking','PA Announcement System'] },
  { id:'yukon',    name:'GMC Yukon',           year:'2025', pax:8,  luggage:6,  tag:'Executive SUV', img: yukonImg,    features:['Captain Chair Seating','Soft-Close Rear Doors','Bose 14-Speaker Audio','Night Vision Assist'] },
]

export default function Fleet() {
  const { t } = useLang()

  const selectVehicle = (name) => {
    document.getElementById('quoter')?.scrollIntoView({ behavior: 'smooth' })
    window.dispatchEvent(new CustomEvent('vehicleSelected', { detail: name }))
  }

  return (
    <section className={styles.section} id="fleet">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.tag}>{t.fleet.tag}</span>
          <h2 className={styles.title}>
            {t.fleet.title.split('\n').map((l, i) => (
              <span key={i} className={i === 1 ? styles.titleAccent : ''}>{l}</span>
            ))}
          </h2>
          <p className={styles.subtitle}>{t.fleet.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {vehicles.map(v => (
            <div key={v.id} className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.cardBadge}>{v.tag}</span>
                <span className={styles.cardYear}>{v.year}</span>
              </div>

              <div className={styles.visual}>
                <img
                  src={v.img}
                  alt={v.name}
                  className={styles.vehicleImg}
                  draggable={false}
                />
                <div className={styles.visualGlow} />
              </div>

              <h3 className={styles.cardName}>{v.name}</h3>

              <div className={styles.cardSpecs}>
                <div className={styles.spec}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M6.5 1a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM1 12a5.5 5.5 0 0111 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  {v.pax} {t.fleet.pax}
                </div>
                <span className={styles.specSep} />
                <div className={styles.spec}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <rect x="2" y="3" width="9" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M4.5 3V2a1 1 0 012 0v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  {v.luggage} {t.fleet.luggage}
                </div>
              </div>

              <ul className={styles.features}>
                {v.features.map((f, i) => (
                  <li key={i}><span className={styles.featureDot} />{f}</li>
                ))}
              </ul>

              <button className={styles.selectBtn} onClick={() => selectVehicle(v.name)}>
                <span>{t.fleet.select}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}