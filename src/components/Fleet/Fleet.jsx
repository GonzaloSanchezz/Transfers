import { useLang } from '../../context/LangContext'
import styles from './Fleet.module.css'

import escaladeImg from '../../assets/escalade.jpg'
import tahoeImg    from '../../assets/tahoe.jpg'
import atlasImg    from '../../assets/atlas.jpg'
import sprinterImg from '../../assets/sprinter.jpg'
import transitImg  from '../../assets/transit.jpg'
import yukonImg    from '../../assets/yukon.jpg'

export default function Fleet() {
  const { t, lang } = useLang()
  const isEs = lang === 'es'

  const selectVehicle = (name) => {
    document.getElementById('quoter')?.scrollIntoView({ behavior: 'smooth' })
    window.dispatchEvent(new CustomEvent('vehicleSelected', { detail: name }))
  }

  const vehicles = [
    { 
      id:'escalade', name:'Cadillac Escalade', year:'2025', pax:7, luggage:6, img: escaladeImg,
      tag: isEs ? 'SUV Ejecutivo' : 'Executive SUV', 
      features: isEs 
        ? ['Pantalla OLED Curva 38"', 'Audio AKG 19 Parlantes', 'Asientos Capitán de Cuero', 'Conducción Super Cruise'] 
        : ['38" Curved OLED Display', '19-Speaker AKG Audio', 'Premium Leather Captains', 'Super Cruise Autonomous'] 
    },
    { 
      id:'tahoe', name:'Chevrolet Tahoe', year:'2025', pax:7, luggage:6, img: tahoeImg,
      tag: isEs ? 'SUV Premium' : 'Premium SUV',
      features: isEs 
        ? ['Suspensión Magnetic Ride', 'Climatizador Tri-zona', 'Pantalla Trasera Media', 'Chevy Safety Assist'] 
        : ['Magnetic Ride Suspension', 'Tri-Zone Climate Control', 'Rear Seat Media System', 'Chevy Safety Assist'] 
    },
    { 
      id:'atlas', name:'VW Atlas', year:'2025', pax:7, luggage:4, img: atlasImg,
      tag: isEs ? 'SUV de Lujo' : 'Luxury SUV',
      features: isEs 
        ? ['Asistencia IQ.DRIVE', 'Climatronic de 3 Zonas', 'Techo Panorámico', 'Tapizado V-Tex Premium'] 
        : ['IQ.DRIVE Assist', '3-Zone Climatronic', 'Panoramic Power Sunroof', 'V-Tex Premium Seating'] 
    },
    { 
      id:'sprinter', name:'Mercedes-Benz Sprinter', year:'2025', pax:14, luggage:12, img: sprinterImg,
      tag: isEs ? 'Van Ejecutiva' : 'Executive Van',
      features: isEs 
        ? ['Configuración Techo Alto', 'AC Trasero Alto Rendimiento', 'Puerta Deslizante Eléctrica', 'Luz Ambiental LED'] 
        : ['High-Roof Configuration', 'Heavy-Duty Rear AC', 'Power Sliding Door', 'LED Ambient Lighting'] 
    },
    { 
      id:'transit', name:'Ford Transit', year:'2025', pax:15, luggage:12, img: transitImg,
      tag: isEs ? 'Van de Grupo' : 'Group Van',
      features: isEs 
        ? ['Infoentretenimiento SYNC 4', 'Pasillo Central Amplio', 'Ford Co-Pilot360', 'Asientos Reclinables'] 
        : ['SYNC 4 Infotainment', 'Spacious Center Aisle', 'Ford Co-Pilot360', 'Individual Reclining Seats'] 
    },
    { 
      id:'yukon', name:'GMC Yukon', year:'2025', pax:7, luggage:6, img: yukonImg,
      tag: isEs ? 'SUV Ejecutivo' : 'Executive SUV',
      features: isEs 
        ? ['Suspensión Neumática', 'Audio Premium Bose', 'Lujo Estilo Denali', 'Cancelación de Ruido'] 
        : ['Air Ride Suspension', 'Bose Premium Audio', 'Denali-Style Luxury', 'Active Noise Cancellation'] 
    },
  ]

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

        <div className={styles.gridWrapper}>
          <div className={styles.grid}>
            {vehicles.map(v => (
              <div key={v.id} className={styles.card}>
                <div className={styles.cardHead}>
                  <span className={styles.cardBadge}>{v.tag}</span>
                  <span className={styles.cardYear}>{v.year}</span>
                </div>

                <div className={styles.visual}>
                  <img src={v.img} alt={v.name} className={styles.vehicleImg} draggable={false} loading="lazy" />
                  <div className={styles.visualGlow} />
                </div>

                <div className={styles.cardContent}>
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
              </div>
            ))}
          </div>
          
          {/* Indicador de Swipe mejorado para Mobile */}
          <div className={styles.swipeHintWrapper}>
            <div className={styles.swipeHint}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
              {isEs ? 'Deslizá para ver la flota' : 'Swipe to explore fleet'}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}