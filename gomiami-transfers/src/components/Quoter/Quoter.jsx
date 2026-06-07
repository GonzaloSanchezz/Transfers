import { useState } from 'react'
import styles from './Quoter.module.css'

const VEHICLES = [
  'Cadillac Escalade 2025',
  'Chevrolet Tahoe 2025',
  'VW Atlas 2025',
  'Mercedes-Benz Sprinter 2025',
  'Ford Transit 2025',
  'GMC Yukon 2025',
]

const WA_NUMBER = '13053361521'

const STEPS = ['Ruta', 'Vehículo', 'Horario y pasajeros', 'Tus datos', 'Confirmar']

const INITIAL_FORM = {
  from: '',
  to: '',
  vehicle: '',
  date: '',
  time: '',
  passengers: 1,
  name: '',
  phone: '',
  notes: '',
}

export default function Quoter() {
  const [step, setStep]       = useState(1)
  const [form, setForm]       = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  const totalSteps = STEPS.length

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handlePax = (delta) => {
    setForm(prev => {
      const next = prev.passengers + delta
      if (next < 1 || next > 15) return prev
      return { ...prev, passengers: next }
    })
  }

  const isStepValid = () => {
    switch (step) {
      case 1: return form.from.trim() !== '' && form.to.trim() !== ''
      case 2: return form.vehicle !== ''
      case 3: return form.date !== '' && form.time !== ''
      case 4: return form.name.trim() !== '' && form.phone.trim() !== ''
      default: return true
    }
  }

  const handleNext = () => setStep(s => Math.min(s + 1, totalSteps))
  const handlePrev = () => setStep(s => Math.max(s - 1, 1))

  const handleSubmit = () => {
    const msg = [
      `🚗 *GoMiami Transfers – Reserva VIP*`,
      ``,
      `👤 *Cliente:* ${form.name}`,
      `📞 *Teléfono:* ${form.phone}`,
      `📍 *Origen:* ${form.from}`,
      `🏁 *Destino:* ${form.to}`,
      `🚙 *Vehículo:* ${form.vehicle}`,
      `📅 *Fecha:* ${form.date}`,
      `⏰ *Hora:* ${form.time}`,
      `👥 *Pasajeros:* ${form.passengers}`,
      form.notes ? `📝 *Notas:* ${form.notes}` : null,
      ``,
      `_Solicito confirmar disponibilidad._`,
    ].filter(line => line !== null).join('\n')

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setStep(1)
      setForm(INITIAL_FORM)
    }, 4000)
  }

  return (
    <section className={styles.section} id="quoter">
      <div className={styles.inner}>

        {/* ── Left panel ── */}
        <div className={styles.left}>
          <h2 className={styles.title}>Cotizá tu traslado</h2>
          <div className={styles.contactStack}>
            <a href="tel:+13053361521" className={styles.contactItem}>
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

        {/* ── Wizard ── */}
        <div className={styles.right}>
          <div className={styles.wizardContainer}>
            <div className={styles.wizardGlow} />

            {/* Progress */}
            <div className={styles.progressHeader}>
              <div className={styles.stepInfo}>
                <span className={styles.stepNum}>0{step}</span>
                <span className={styles.stepTotal}>/ 0{totalSteps}</span>
                <span className={styles.stepTitle}>{STEPS[step - 1]}</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${(step / totalSteps) * 100}%` }} />
              </div>
            </div>

            {/* Step content */}
            <div className={styles.stepContent} key={step}>

              {/* Step 1 — Ruta */}
              {step === 1 && (
                <div className={styles.stepWrapper}>
                  <div className={styles.fieldGroup}>
                    <div className={styles.routeLine}>
                      <div className={styles.routeDot} />
                      <div className={styles.routeLineDash} />
                      <div className={styles.routePin} />
                    </div>
                    <div className={styles.routeInputs}>
                      <div className={styles.field}>
                        <label>Origen</label>
                        <input
                          name="from"
                          value={form.from}
                          onChange={handleChange}
                          placeholder="Ej. Miami International Airport"
                          autoFocus
                        />
                      </div>
                      <div className={styles.field}>
                        <label>Destino</label>
                        <input
                          name="to"
                          value={form.to}
                          onChange={handleChange}
                          placeholder="Ej. South Beach, Hotel, Puerto..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 — Vehículo */}
              {step === 2 && (
                <div className={styles.stepWrapper}>
                  <div className={styles.vehicleGrid}>
                    {VEHICLES.map(v => (
                      <div
                        key={v}
                        className={`${styles.vehicleCard} ${form.vehicle === v ? styles.vehicleActive : ''}`}
                        onClick={() => setForm(prev => ({ ...prev, vehicle: v }))}
                      >
                        <div className={styles.vehicleRadio}>
                          {form.vehicle === v && <div className={styles.vehicleRadioDot} />}
                        </div>
                        <div className={styles.vehicleCardBody}>
                          <div className={styles.vehicleName}>{v}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3 — Horario y pasajeros */}
              {step === 3 && (
                <div className={styles.stepWrapper}>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>Fecha</label>
                      <input type="date" name="date" value={form.date} onChange={handleChange} autoFocus />
                    </div>
                    <div className={styles.field}>
                      <label>Hora</label>
                      <input type="time" name="time" value={form.time} onChange={handleChange} />
                    </div>
                  </div>
                  <div className={styles.field} style={{ marginTop: '1.5rem' }}>
                    <label>Pasajeros</label>
                    <div className={styles.paxControl}>
                      <button className={styles.paxBtn} onClick={() => handlePax(-1)} disabled={form.passengers <= 1}>-</button>
                      <div className={styles.paxDisplay}>
                        <span className={styles.paxNumber}>{form.passengers}</span>
                        <span className={styles.paxIcon}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
                          </svg>
                        </span>
                      </div>
                      <button className={styles.paxBtn} onClick={() => handlePax(1)} disabled={form.passengers >= 15}>+</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4 — Datos */}
              {step === 4 && (
                <div className={styles.stepWrapper}>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>Nombre</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" autoFocus />
                    </div>
                    <div className={styles.field}>
                      <label>Teléfono</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (305) 000-0000" />
                    </div>
                  </div>
                  <div className={styles.field} style={{ marginTop: '1.5rem' }}>
                    <label>Notas (opcional)</label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Nro. de vuelo, sillas de bebé, equipaje extra..."
                    />
                  </div>
                </div>
              )}

              {/* Step 5 — Confirmar */}
              {step === 5 && (
                <div className={styles.stepWrapper}>
                  <div className={styles.ticket}>
                    <div className={styles.ticketPattern} />
                    <div className={styles.ticketHeader}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                      <h3>Resumen del viaje</h3>
                    </div>
                    <div className={styles.ticketBody}>
                      {[
                        ['Origen',      form.from],
                        ['Destino',     form.to],
                        ['Vehículo',    form.vehicle],
                        ['Horario',     `${form.date} · ${form.time}`],
                        ['Pasajeros',   `${form.passengers} pax`],
                        ['Cliente',     `${form.name} · ${form.phone}`],
                        form.notes ? ['Notas', form.notes] : null,
                      ].filter(Boolean).map(([label, val]) => (
                        <div key={label} className={styles.ticketItem}>
                          <span>{label}</span>
                          <p>{val}</p>
                        </div>
                      ))}
                    </div>
                    <div className={styles.ticketFooter}>
                      <span>Cliente: </span>{form.name} ({form.phone})
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className={styles.wizardNav}>
              {step > 1
                ? <button className={styles.btnPrev} onClick={handlePrev}>← Atrás</button>
                : <div />
              }
              {step < totalSteps ? (
                <button
                  className={styles.btnNext}
                  onClick={handleNext}
                  disabled={!isStepValid()}
                >
                  Siguiente →
                </button>
              ) : (
                <button
                  className={`${styles.submitBtn} ${submitted ? styles.submitted : ''}`}
                  onClick={handleSubmit}
                  disabled={submitted}
                >
                  {submitted ? '✓ ¡Enviado!' : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M18 2L9 11M18 2L12 18l-3-7-7-3 16-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Enviar por WhatsApp
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