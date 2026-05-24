import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import styles from './Fleet.module.css'

const vehicles = [
  { id:'escalade', name:'Cadillac Escalade', year:'2025', pax:7,  luggage:6,  tag:'Executive SUV', features:['Quilted Leather Interior','Privacy Partition Glass','Dual-Zone Climate Control','USB-C & Wireless Charging'] },
  { id:'tahoe',    name:'Chevrolet Tahoe',   year:'2025', pax:7,  luggage:5,  tag:'Premium SUV',   features:['3-Row Premium Seating','Bose Premium Audio','Mobile WiFi Hotspot','Rear Seat Entertainment'] },
  { id:'atlas',    name:'VW Atlas',           year:'2025', pax:7,  luggage:4,  tag:'Luxury SUV',    features:['Panoramic Sunroof','3-Row Seating','USB-C Charging Ports','Digital Cockpit Display'] },
  { id:'sprinter', name:'Mercedes-Benz Sprinter', year:'2025', pax:14, luggage:12, tag:'Executive Van',  features:['Executive Club Seating','Mood Ambient Lighting','Large Cargo Bay','Step-Assist Entry'] },
  { id:'transit',  name:'Ford Transit',       year:'2025', pax:15, luggage:14, tag:'Group Van',     features:['High-Roof Configuration','Dual Climate Zones','Fleet GPS Tracking','PA Announcement System'] },
  { id:'yukon',    name:'GMC Yukon',           year:'2025', pax:8,  luggage:6,  tag:'Executive SUV', features:['Captain Chair Seating','Soft-Close Rear Doors','Bose 14-Speaker Audio','Night Vision Assist'] },
]

function CarSVG({ id }) {
  const isVan = id === 'sprinter' || id === 'transit'
  if (isVan) return (
    <svg viewBox="0 0 300 130" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.carSvg}>
      <rect x="18" y="38" width="264" height="65" rx="5" fill="#111" stroke="rgba(191,162,101,0.28)" strokeWidth="1"/>
      <rect x="26" y="18" width="185" height="44" rx="5" fill="#0d0d0d" stroke="rgba(191,162,101,0.18)" strokeWidth="1"/>
      <rect x="36" y="24" width="65" height="28" rx="3" fill="rgba(191,162,101,0.06)"/>
      <rect x="115" y="24" width="84" height="28" rx="3" fill="rgba(191,162,101,0.06)"/>
      <circle cx="63"  cy="108" r="20" fill="#080808" stroke="rgba(191,162,101,0.38)" strokeWidth="1.5"/>
      <circle cx="63"  cy="108" r="10" fill="#0f0f0f" stroke="rgba(191,162,101,0.22)" strokeWidth="1"/>
      <circle cx="237" cy="108" r="20" fill="#080808" stroke="rgba(191,162,101,0.38)" strokeWidth="1.5"/>
      <circle cx="237" cy="108" r="10" fill="#0f0f0f" stroke="rgba(191,162,101,0.22)" strokeWidth="1"/>
      <rect x="20"  y="50" width="12" height="18" rx="2" fill="rgba(191,162,101,0.18)"/>
      <rect x="268" y="50" width="12" height="18" rx="2" fill="rgba(191,162,101,0.18)"/>
      <line x1="211" y1="38" x2="211" y2="103" stroke="rgba(191,162,101,0.1)" strokeWidth="1"/>
    </svg>
  )
  return (
    <svg viewBox="0 0 300 130" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.carSvg}>
      <path d="M28 88 L28 66 Q30 52 48 46 L92 28 Q114 18 155 18 L214 18 Q244 18 260 34 L272 58 L276 68 L276 88 Z" fill="#111" stroke="rgba(191,162,101,0.28)" strokeWidth="1"/>
      <path d="M95 26 L95 48 L250 48 L250 26 Q200 22 155 22 Q120 22 95 26Z" fill="rgba(191,162,101,0.06)"/>
      <ellipse cx="78"  cy="96" rx="25" ry="25" fill="#080808" stroke="rgba(191,162,101,0.38)" strokeWidth="1.5"/>
      <ellipse cx="78"  cy="96" rx="12" ry="12" fill="#0f0f0f" stroke="rgba(191,162,101,0.22)" strokeWidth="1"/>
      <ellipse cx="222" cy="96" rx="25" ry="25" fill="#080808" stroke="rgba(191,162,101,0.38)" strokeWidth="1.5"/>
      <ellipse cx="222" cy="96" rx="12" ry="12" fill="#0f0f0f" stroke="rgba(191,162,101,0.22)" strokeWidth="1"/>
      <path d="M258 60 L274 62 L277 74 L256 74 Z" fill="rgba(191,162,101,0.22)"/>
      <path d="M28 62 L15 65 L13 76 L30 76 Z" fill="rgba(191,162,101,0.22)"/>
      <line x1="157" y1="18" x2="157" y2="48" stroke="rgba(191,162,101,0.08)" strokeWidth="1"/>
    </svg>
  )
}

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
                <CarSVG id={v.id} />
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