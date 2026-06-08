import { useState, useEffect, useRef } from 'react'
import { useLang } from '../../context/LangContext'
import styles from './WhatsAppButton.module.css'

const WA_NUMBER = '13053361521'

export default function WhatsAppButton() {
  const { lang } = useLang()
  const isEs = lang === 'es'
  
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  // Separamos la 'etiqueta' visual del 'mensaje' real que se envía
  const options = isEs ? [
    {
      label: "Quiero cotizar un traslado",
      message: "¡Hola GoMiami Transfers! Me gustaría cotizar un traslado, por favor. ¿Me podrían brindar más información sobre los precios y vehículos?"
    },
    {
      label: "Consultar disponibilidad",
      message: "¡Hola equipo de GoMiami! Quiero consultar la disponibilidad de su flota para una fecha específica. ¿Me pueden ayudar con eso?"
    },
    {
      label: "Tengo una pregunta general",
      message: "¡Hola GoMiami Transfers! Tengo una consulta sobre sus servicios de transporte ejecutivo. ¿Me podrían asesorar?"
    }
  ] : [
    {
      label: "I want to request a quote",
      message: "Hello GoMiami Transfers! I would like to request a quote for a transfer, please. Could you provide me with more info about pricing and vehicles?"
    },
    {
      label: "Check availability",
      message: "Hello GoMiami team! I would like to check the availability of your fleet for a specific date. Can you help me with this?"
    },
    {
      label: "I have a general question",
      message: "Hello GoMiami Transfers! I have a general question regarding your executive transportation services. Could you assist me?"
    }
  ]

  const headerText = isEs ? '¿En qué podemos ayudarte?' : 'How can we help you?'

  // Cerrar el menú si el usuario hace clic afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSend = (msg) => {
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
    setIsOpen(false)
  }

  return (
    <div className={styles.wrapper} ref={menuRef}>
      
      {/* ── Menú Desplegable ── */}
      <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
        <div className={styles.menuHeader}>
          {headerText}
        </div>
        <div className={styles.options}>
          {options.map((opt, i) => (
            <button 
              key={i} 
              className={styles.optionBtn}
              onClick={() => handleSend(opt.message)}
            >
              <span>{opt.label}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* ── Botón Principal ── */}
      <button 
        className={`${styles.waBtn} ${isOpen ? styles.waBtnActive : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="WhatsApp Contact"
      >
        {!isOpen && <span className={styles.pulse} />}
        
        {/* Ícono de Cruz si está abierto, Ícono de WA si está cerrado */}
        {isOpen ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        )}
      </button>

    </div>
  )
}