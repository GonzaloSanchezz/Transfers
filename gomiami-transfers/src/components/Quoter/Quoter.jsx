import { useState, useEffect } from 'react'
import { useLang } from '../../context/LangContext'
import styles from './Quoter.module.css'

const vehiclesList = [
  'Cadillac Escalade 2025',
  'Chevrolet Tahoe 2025',
  'VW Atlas 2025',
  'Mercedes-Benz Sprinter 2025',
  'Ford Transit 2025',
  'GMC Yukon 2025',
]

const WA_NUMBER = '13053361521'

const getStepTitle = (step, lang) => {
  const isEs = lang === 'es'
  switch (step) {
    case 1: return isEs ? 'Ruta y Destino' : 'Route & Destination'
    case 2: return isEs ? 'Horarios y Pasajeros' : 'Schedule & Passengers'
    case 3: return isEs ? 'Selección de Vehículo' : 'Vehicle Selection'
    case 4: return isEs ? 'Datos del Pasajero' : 'Client Details'
    case 5: return isEs ? 'Revisión y Confirmación' : 'Review & Confirm'
    default: return ''
  }
}

export default function Quoter() {
  const { t, lang } = useLang()
  const [form, setForm] = useState({
    from: '', to: '', date: '', time: '',
    passengers: 1, vehicle: '', name: '', phone: '', notes: ''
  })
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const totalSteps = 5

  // Escuchar cuando eligen un vehículo desde la sección "Flota"
  useEffect(() => {
    const handler = (e) => {
      setForm(prev => ({ ...prev, vehicle: e.detail }))
      setStep(3) // Salta automáticamente al paso del vehículo
    }
    window.addEventListener('vehicleSelected', handler)
    return () => window.removeEventListener('vehicleSelected', handler)
  }, [])

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePax = (delta) => {
    setForm(prev => {
      const newVal = prev.passengers + delta
      if (newVal < 1 || newVal > 15) return prev
      return { ...prev, passengers: newVal }
    })
  }

  const handleNext = () => setStep(s => Math.min(s + 1, totalSteps))
  const handlePrev = () => setStep(s => Math.max(s - 1, 1))

  // Validación dinámica por paso
  const isStepValid = () => {
    switch (step) {
      case 1: return form.from.trim() !== '' && form.to.trim() !== ''
      case 2: return form.date !== '' && form.time !== ''
      case 3: return form.vehicle !== ''
      case 4: return form.name.trim() !== '' && form.phone.trim() !== ''
      default: return true
    }
  }

  const handleSubmit = () => {
    const isEs = lang === 'es'
    const msg = isEs
      ? `🚗 *GoMiami Transfers – Reserva VIP*\n\n👤 *Cliente:* ${form.name}\n📞 *Teléfono:* ${form.phone}\n📍 *Recogida:* ${form.from}\n🏁 *Destino:* ${form.to}\n📅 *Fecha:* ${form.date}\n⏰ *Hora:* ${form.time}\n👥 *Pasajeros:* ${form.passengers}\n🚙 *Vehículo:* ${form.vehicle}\n📝 *Notas:* ${form.notes || 'Ninguna'}\n\n_Solicito confirmar disponibilidad._`
      : `🚗 *GoMiami Transfers – VIP Booking*\n\n👤 *Client:* ${form.name}\n📞 *Phone:* ${form.phone}\n📍 *Pickup:* ${form.from}\n🏁 *Drop-off:* ${form.to}\n📅 *Date:* ${form.date}\n⏰ *Time:* ${form.time}\n👥 *Passengers:* ${form.passengers}\n🚙 *Vehicle:* ${form.vehicle}\n📝 *Notes:* ${form.notes || 'None'}\n\n_Please confirm availability._`

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
    setSubmitted(true)
    
    // Resetear form tras enviar
    setTimeout(() => {
      setSubmitted(false)
      setStep(1)
      setForm({ from: '', to: '', date: '', time: '', passengers: 1, vehicle: '', name: '', phone: '', notes: '' })
    }, 4000)
  }

  return (
    <section className={styles.section} id="quoter">
      <div className={styles.inner}>
        
        {/* --- LADO IZQUIERDO: Info y Contacto --- */}
        <div className={styles.left}>
          <span className={styles.tag}>{t.quoter.tag}</span>
          <h2 className={styles.title}>
            {t.quoter.title.split('\n').map((l, i) => (
              <span key={i} className={i === 1 ? styles.titleAccent : ''}>{l}</span>
            ))}
          </h2>
          <div className={styles.divider} />
          
          <div className={styles.contactStack}>
            <a href={`tel:+13053361521`} className={styles.contactItem}>
              <div className={styles.contactIconBox}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 2h3l1.5 4-2 1.5a11 11 0 005 5L12 10.5l4 1.5v3a2 2 0 01-2 2A15 15 0 011 4a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.contactMeta}>
                <span className={styles.contactLabel}>Call / WhatsApp</span>
                <span className={styles.contactValue}>+1 (305) 336-1521</span>
              </div>
            </a>
            <a href="mailto:info@gomiamitransfers.com" className={styles.contactItem}>
              <div className={styles.contactIconBox}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M2 6l7 5 7-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </div>
              <div className={styles.contactMeta}>
                <span className={styles.contactLabel}>Email</span>
                <span className={styles.contactValue}>info@gomiamitransfers.com</span>
              </div>
            </a>
          </div>
        </div>

        {/* --- LADO DERECHO: Formulario Multi-paso (Wizard) --- */}
        <div className={styles.right}>
          <div className={styles.wizardContainer}>
            <div className={styles.wizardGlow} />

            {/* Cabecera del Progreso */}
            <div className={styles.progressHeader}>
              <div className={styles.stepInfo}>
                <span className={styles.stepNum}>0{step}</span>
                <span className={styles.stepTotal}>/ 0{totalSteps}</span>
                <span className={styles.stepTitle}>{getStepTitle(step, lang)}</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${(step / totalSteps) * 100}%` }} />
              </div>
            </div>

            {/* Contenido Dinámico de los Pasos */}
            <div className={styles.stepContent} key={step}>
              
              {/* PASO 1: Rutas */}
              {step === 1 && (
                <div className={styles.stepWrapper}>
                   <div className={styles.fieldGroup}>
                     <div className={styles.routeLine}>
                        <div className={styles.routeDot}></div>
                        <div className={styles.routeLineDash}></div>
                        <div className={styles.routePin}></div>
                     </div>
                     <div className={styles.routeInputs}>
                       <div className={styles.field}>
                         <label>{t.quoter.from}</label>
                         <input name="from" value={form.from} onChange={handleChange} placeholder={t.quoter.fromPlaceholder} autoFocus />
                       </div>
                       <div className={styles.field}>
                         <label>{t.quoter.to}</label>
                         <input name="to" value={form.to} onChange={handleChange} placeholder={t.quoter.toPlaceholder} />
                       </div>
                     </div>
                   </div>
                </div>
              )}

              {/* PASO 2: Horarios y Pasajeros */}
              {step === 2 && (
                <div className={styles.stepWrapper}>
                   <div className={styles.row}>
                     <div className={styles.field}>
                       <label>{t.quoter.date}</label>
                       <input type="date" name="date" value={form.date} onChange={handleChange} autoFocus />
                     </div>
                     <div className={styles.field}>
                       <label>{t.quoter.time}</label>
                       <input type="time" name="time" value={form.time} onChange={handleChange} />
                     </div>
                   </div>
                   <div className={styles.field} style={{ marginTop: '1.5rem' }}>
                     <label>{t.quoter.passengers}</label>
                     <div className={styles.paxControl}>
                       <button className={styles.paxBtn} onClick={() => handlePax(-1)} disabled={form.passengers <= 1}>-</button>
                       <div className={styles.paxDisplay}>
                         <span className={styles.paxNumber}>{form.passengers}</span>
                         <span className={styles.paxIcon}>
                           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                         </span>
                       </div>
                       <button className={styles.paxBtn} onClick={() => handlePax(1)} disabled={form.passengers >= 15}>+</button>
                     </div>
                   </div>
                </div>
              )}

              {/* PASO 3: Selección de Vehículo */}
              {step === 3 && (
                <div className={styles.stepWrapper}>
                   <div className={styles.vehicleGrid}>
                     {vehiclesList.map(v => (
                       <div 
                         key={v}
                         className={`${styles.vehicleCard} ${form.vehicle === v ? styles.vehicleActive : ''}`}
                         onClick={() => setForm({...form, vehicle: v})}
                       >
                         <div className={styles.vehicleRadio}>
                           {form.vehicle === v && <div className={styles.vehicleRadioDot} />}
                         </div>
                         <div className={styles.vehicleName}>{v}</div>
                       </div>
                     ))}
                   </div>
                </div>
              )}

              {/* PASO 4: Detalles del Cliente */}
              {step === 4 && (
                <div className={styles.stepWrapper}>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>{t.quoter.name}</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="Ej. John Doe" autoFocus />
                    </div>
                    <div className={styles.field}>
                      <label>{t.quoter.phone}</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (305) 000-0000" />
                    </div>
                  </div>
                  <div className={styles.field} style={{ marginTop: '1.5rem' }}>
                    <label>{t.quoter.notes}</label>
                    <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder={lang === 'es' ? 'Vuelo, sillas de bebé...' : 'Flight number, baby seats...'} />
                  </div>
                </div>
              )}

              {/* PASO 5: Ticket de Revisión */}
              {step === 5 && (
                <div className={styles.stepWrapper}>
                   <div className={styles.ticket}>
                     <div className={styles.ticketPattern} />
                     <div className={styles.ticketHeader}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        <h3>{lang === 'es' ? 'Resumen del Viaje' : 'Transfer Summary'}</h3>
                     </div>
                     <div className={styles.ticketBody}>
                        <div className={styles.ticketItem}>
                          <span>{lang === 'es' ? 'Ruta' : 'Route'}</span>
                          <p>{form.from} <br/><strong style={{color: 'var(--gold)'}}>↓</strong><br/> {form.to}</p>
                        </div>
                        <div className={styles.ticketItem}>
                          <span>{lang === 'es' ? 'Vehículo' : 'Vehicle'}</span>
                          <p>{form.vehicle}</p>
                        </div>
                        <div className={styles.ticketItem}>
                          <span>{lang === 'es' ? 'Horario' : 'Schedule'}</span>
                          <p>{form.date} • {form.time}</p>
                        </div>
                        <div className={styles.ticketItem}>
                          <span>{lang === 'es' ? 'Pasajeros' : 'Passengers'}</span>
                          <p>{form.passengers} Pax</p>
                        </div>
                     </div>
                     <div className={styles.ticketFooter}>
                         <span>{lang === 'es' ? 'Cliente' : 'Client'}: </span> 
                         {form.name} ({form.phone})
                     </div>
                   </div>
                </div>
              )}
            </div>

            {/* Navegación Inferior */}
            <div className={styles.wizardNav}>
               {step > 1 ? (
                 <button className={styles.btnPrev} onClick={handlePrev}>
                    {lang === 'es' ? '← Atrás' : '← Back'}
                 </button>
               ) : <div />} 
               
               {step < totalSteps ? (
                 <button 
                   className={styles.btnNext} 
                   onClick={handleNext} 
                   disabled={!isStepValid()}
                 >
                    {lang === 'es' ? 'Siguiente' : 'Next Step'} <span>→</span>
                 </button>
               ) : (
                 <button 
                   className={`${styles.submitBtn} ${submitted ? styles.submitted : ''}`} 
                   onClick={handleSubmit}
                 >
                   {submitted ? (lang === 'es' ? '✓ ¡Enviado!' : '✓ Sent!') : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M18 2L9 11M18 2L12 18l-3-7-7-3 16-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {t.quoter.submit}
                    </>
                  )}
                 </button>
               )}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}