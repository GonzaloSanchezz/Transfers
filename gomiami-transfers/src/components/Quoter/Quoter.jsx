 
import { useState, useEffect } from 'react'
import { useLang } from '../../context/LangContext'
import styles from './Quoter.module.css'

const vehicles = [
  'Cadillac Escalade 2025',
  'Chevrolet Tahoe 2025',
  'VW Atlas 2025',
  'Mercedes-Benz Sprinter 2025',
  'Ford Transit 2025',
  'GMC Yukon 2025',
]

const WA_NUMBER = '13053361521'

export default function Quoter() {
  const { t, lang } = useLang()
  const [form, setForm] = useState({
    from: '', to: '', date: '', time: '',
    passengers: '1', vehicle: '', name: '', phone: '', notes: ''
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      setForm(prev => ({ ...prev, vehicle: e.detail }))
    }
    window.addEventListener('vehicleSelected', handler)
    return () => window.removeEventListener('vehicleSelected', handler)
  }, [])

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = () => {
    const isEs = lang === 'es'
    const msg = isEs
      ? `🚗 *GoMiami Transfers – Solicitud de Traslado*\n\n` +
        `👤 *Nombre:* ${form.name}\n` +
        `📍 *Origen:* ${form.from}\n` +
        `🏁 *Destino:* ${form.to}\n` +
        `📅 *Fecha:* ${form.date}\n` +
        `⏰ *Hora:* ${form.time}\n` +
        `👥 *Pasajeros:* ${form.passengers}\n` +
        `🚙 *Vehículo:* ${form.vehicle || 'Por asignar'}\n` +
        `📞 *Teléfono:* ${form.phone}\n` +
        (form.notes ? `📝 *Notas:* ${form.notes}\n` : '') +
        `\n_Por favor confirma disponibilidad._`
      : `🚗 *GoMiami Transfers – Transfer Request*\n\n` +
        `👤 *Name:* ${form.name}\n` +
        `📍 *From:* ${form.from}\n` +
        `🏁 *To:* ${form.to}\n` +
        `📅 *Date:* ${form.date}\n` +
        `⏰ *Time:* ${form.time}\n` +
        `👥 *Passengers:* ${form.passengers}\n` +
        `🚙 *Vehicle:* ${form.vehicle || 'To be assigned'}\n` +
        `📞 *Phone:* ${form.phone}\n` +
        (form.notes ? `📝 *Notes:* ${form.notes}\n` : '') +
        `\n_Please confirm availability._`

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  const isValid = form.from && form.to && form.date && form.time && form.name && form.phone

  return (
    <section className={styles.section} id="quoter">
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.tag}>{t.quoter.tag}</span>
          <h2 className={styles.title}>
            {t.quoter.title.split('\n').map((l, i) => (
              <span key={i} className={i === 1 ? styles.titleAccent : ''}>{l}</span>
            ))}
          </h2>
          <div className={styles.divider} />
          <div className={styles.contact}>
            <a href={`tel:+13053361521`} className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 2h3l1.5 4-2 1.5a11 11 0 005 5L12 10.5l4 1.5v3a2 2 0 01-2 2A15 15 0 011 4a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <span className={styles.contactLabel}>Call / WhatsApp</span>
                <span className={styles.contactValue}>+1 (305) 336-1521</span>
              </div>
            </a>
            <a href="mailto:info@gomiamitransfers.com" className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M2 6l7 5 7-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <span className={styles.contactLabel}>Email</span>
                <span className={styles.contactValue}>info@gomiamitransfers.com</span>
              </div>
            </a>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.form}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>{t.quoter.from}</label>
                <input name="from" value={form.from} onChange={handleChange} placeholder={t.quoter.fromPlaceholder} />
              </div>
              <div className={styles.field}>
                <label>{t.quoter.to}</label>
                <input name="to" value={form.to} onChange={handleChange} placeholder={t.quoter.toPlaceholder} />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>{t.quoter.date}</label>
                <input name="date" type="date" value={form.date} onChange={handleChange} />
              </div>
              <div className={styles.field}>
                <label>{t.quoter.time}</label>
                <input name="time" type="time" value={form.time} onChange={handleChange} />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>{t.quoter.passengers}</label>
                <select name="passengers" value={form.passengers} onChange={handleChange}>
                  {Array.from({length: 15}, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label>{t.quoter.vehicle}</label>
                <select name="vehicle" value={form.vehicle} onChange={handleChange}>
                  <option value="">{t.quoter.selectVehicle}</option>
                  {vehicles.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>{t.quoter.name}</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="John Smith" />
              </div>
              <div className={styles.field}>
                <label>{t.quoter.phone}</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (305) 000-0000" />
              </div>
            </div>
            <div className={styles.field}>
              <label>{t.quoter.notes}</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="e.g. Baby seat needed, extra luggage..." />
            </div>

            <button
              className={`${styles.submitBtn} ${submitted ? styles.submitted : ''}`}
              onClick={handleSubmit}
              disabled={!isValid}
            >
              {submitted ? '✓ Sent!' : (
                <>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M18 2L9 11M18 2L12 18l-3-7-7-3 16-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t.quoter.submit}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}