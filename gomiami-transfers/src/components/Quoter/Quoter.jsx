import { useState, useCallback, useRef } from 'react'
import styles from './Quoter.module.css'
import { FLORIDA_LOCATIONS } from './locations' // Asegurate de importar la base de datos

const VEHICLE_RATES = {
  'Cadillac Escalade 2025':      { ratePerKm: 3.5, base: 60 },
  'Chevrolet Tahoe 2025':        { ratePerKm: 3.0, base: 55 },
  'VW Atlas 2025':               { ratePerKm: 2.8, base: 50 },
  'Mercedes-Benz Sprinter 2025': { ratePerKm: 3.8, base: 70 },
  'Ford Transit 2025':           { ratePerKm: 2.5, base: 45 },
  'GMC Yukon 2025':              { ratePerKm: 3.2, base: 58 },
}

const vehiclesList = Object.keys(VEHICLE_RATES)
const WA_NUMBER    = '13053361521'

const STEP_TITLES = {
  es: ['Ruta y destino', 'Horarios y pasajeros', 'Selección de vehículo', 'Datos del pasajero', 'Revisión y confirmación'],
  en: ['Route & Destination', 'Schedule & Passengers', 'Vehicle Selection', 'Client Details', 'Review & Confirm'],
}

// ─── Utilidades Generales y Búsqueda Tolerante a Errores ──────────────────────

function placeIcon(type) {
  if (type === 'airport') return '✈️'
  if (type === 'port') return '🛳️'
  if (type === 'stadium') return '🏟️'
  if (type === 'hotel') return '🏨'
  if (type === 'shopping') return '🛍️'
  if (type === 'business') return '🏢'
  if (type === 'beach') return '🏖️'
  if (type === 'park') return '🌳'
  return '📍'
}

// Quita acentos, tildes y pasa todo a minúsculas
function normalizeText(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Algoritmo de Levenshtein: calcula diferencia entre dos palabras
function getEditDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // Borrado
        matrix[i][j - 1] + 1,      // Inserción
        matrix[i - 1][j - 1] + cost // Sustitución
      );
    }
  }
  return matrix[a.length][b.length];
}

// Fórmula de Haversine para distancia en línea recta
function calcHaversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radio de la tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Calcula distancia y tiempo estimado offline
function calcLocalDistance(from, to) {
  const straightDistance = calcHaversine(from.lat, from.lng, to.lat, to.lng);
  
  // Multiplicamos x 1.3 para simular la grilla de calles reales
  const drivingDistanceKm = straightDistance * 1.3; 
  
  // Estimamos una velocidad promedio urbana/ruta de 50 km/h
  const totalMinutes = Math.round((drivingDistanceKm / 50) * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;

  return {
    distanceKm: drivingDistanceKm,
    distanceText: `${drivingDistanceKm.toFixed(1)} km`,
    durationText: h > 0 ? `${h}h ${m}min` : `${totalMinutes} min`,
  }
}

// ─── Input con Autocompletado "Fuzzy" (Tolerante a errores) ───────────────────
function PlaceInput({ label, name, value, coords, onSelect, placeholder }) {
  const [query, setQuery] = useState(value || '')
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  const handleChange = (e) => {
    const q = e.target.value
    setQuery(q)
    onSelect(null, null) 
    
    if (q.trim().length < 2) {
      setSuggestions([])
      setOpen(false)
      return
    }

    const normalizedQuery = normalizeText(q);
    const queryWords = normalizedQuery.split(' ').filter(Boolean);

    const hits = FLORIDA_LOCATIONS.map(loc => {
      const locText = normalizeText(loc.name + " " + (loc.tags || ""));
      const locWords = locText.split(' ');
      
      let score = 0;
      let isMatch = true;

      for (const qWord of queryWords) {
        if (locText.includes(qWord)) {
          score += 10;
        } else {
          let wordFoundWithTypo = false;
          
          for (const lWord of locWords) {
            // Permitimos hasta 2 letras de error para palabras de más de 4 letras
            const maxErrors = qWord.length > 4 ? 2 : 1;
            
            if (getEditDistance(qWord, lWord) <= maxErrors) {
              score += 5;
              wordFoundWithTypo = true;
              break;
            }
          }

          if (!wordFoundWithTypo) {
            isMatch = false;
            break;
          }
        }
      }

      return { ...loc, score, isMatch };
    })
    .filter(loc => loc.isMatch)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6) 
    .map(d => ({
      label: d.name,
      lat: d.lat,
      lng: d.lng,
      icon: placeIcon(d.type),
    }))

    setSuggestions(hits)
    setOpen(hits.length > 0)
  }

  const handleSelect = (s) => {
    setQuery(s.label)
    setSuggestions([])
    setOpen(false)
    onSelect(s.label, { lat: s.lat, lng: s.lng })
  }

  const handleBlur = (e) => {
    if (!wrapRef.current?.contains(e.relatedTarget)) {
      setTimeout(() => setOpen(false), 150)
    }
  }

  return (
    <div className={styles.field} ref={wrapRef} onBlur={handleBlur}>
      <label>{label}</label>
      <div className={styles.autocompleteWrapper}>
        <input
          name={name}
          value={query}
          onChange={handleChange}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
        />
        {open && suggestions.length > 0 && (
          <ul className={styles.suggestions}>
            {suggestions.map((s, i) => (
              <li
                key={i}
                className={styles.suggestionItem}
                onMouseDown={() => handleSelect(s)}
              >
                <span className={styles.suggestionIcon}>{s.icon}</span>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {coords && (
        <span className={styles.confirmedBadge}>✓ Ubicación confirmada</span>
      )}
    </div>
  )
}

// ─── Componente Principal ─────────────────────────────────────────────────────
export default function Quoter() {
  const lang = 'es'
  const isEs = lang === 'es'

  const [step, setStep] = useState(1)
  const totalSteps = 5

  const [form, setForm] = useState({
    fromLabel: '', fromCoords: null,
    toLabel:   '', toCoords:   null,
    date: '', time: '', passengers: 1,
    vehicle: '', name: '', phone: '', notes: '',
  })

  const [routeInfo, setRouteInfo] = useState(null)
  const [routeError, setRouteError] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const calcPrice = useCallback((vehicle) => {
    if (!routeInfo || !vehicle) return null
    const r = VEHICLE_RATES[vehicle]
    return Math.round(r.base + routeInfo.distanceKm * r.ratePerKm)
  }, [routeInfo])

  const handleSelectFrom = (label, coords) => {
    setForm(prev => ({ ...prev, fromLabel: label ?? prev.fromLabel, fromCoords: coords }))
    setRouteInfo(null); setRouteError(null)
  }

  const handleSelectTo = (label, coords) => {
    setForm(prev => ({ ...prev, toLabel: label ?? prev.toLabel, toCoords: coords }))
    setRouteInfo(null); setRouteError(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handlePax = (delta) => {
    setForm(prev => {
      const v = prev.passengers + delta
      if (v < 1 || v > 15) return prev
      return { ...prev, passengers: v }
    })
  }

  const handleFetchRoute = () => {
    if (!form.fromCoords || !form.toCoords) return
    setRouteError(null)
    
    if (form.fromLabel === form.toLabel) {
      setRouteError(isEs ? 'El origen y destino no pueden ser iguales.' : 'Origin and destination cannot be the same.')
      return
    }

    try {
      const info = calcLocalDistance(form.fromCoords, form.toCoords)
      setRouteInfo(info)
    } catch (err) {
      setRouteError('Error al calcular la distancia.')
    }
  }

  const canCalc = !!form.fromCoords && !!form.toCoords

  const isStepValid = () => {
    switch (step) {
      case 1: return !!routeInfo
      case 2: return !!form.date && !!form.time
      case 3: return !!form.vehicle
      case 4: return form.name.trim() !== '' && form.phone.trim() !== ''
      default: return true
    }
  }

  const handleNext = () => {
    if (step === 1 && !routeInfo) { handleFetchRoute(); return }
    setStep(s => Math.min(s + 1, totalSteps))
  }

  const handlePrev = () => setStep(s => Math.max(s - 1, 1))

  const handleSubmit = () => {
    const price     = calcPrice(form.vehicle)
    const distInfo  = routeInfo  ? `📏 Distancia: ${routeInfo.distanceText} · ${routeInfo.durationText}\n` : ''
    const priceInfo = price != null ? `💰 Precio estimado: $${price} USD\n` : ''
    const msg = `🚗 *GoMiami Transfers – Reserva VIP*\n\n👤 *Cliente:* ${form.name}\n📞 *Teléfono:* ${form.phone}\n📍 *Origen:* ${form.fromLabel}\n🏁 *Destino:* ${form.toLabel}\n${distInfo}${priceInfo}📅 *Fecha:* ${form.date}\n⏰ *Hora:* ${form.time}\n👥 *Pasajeros:* ${form.passengers}\n🚙 *Vehículo:* ${form.vehicle}\n📝 *Notas:* ${form.notes || 'Ninguna'}\n\n_Solicito confirmar disponibilidad._`

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false); setStep(1)
      setForm({ fromLabel:'', fromCoords:null, toLabel:'', toCoords:null, date:'', time:'', passengers:1, vehicle:'', name:'', phone:'', notes:'' })
      setRouteInfo(null); setRouteError(null)
    }, 4000)
  }

  const stepTitle = STEP_TITLES[lang][step - 1]
  const price     = calcPrice(form.vehicle)

  const nextLabel = () => {
    if (step === 1 && !routeInfo) {
      return isEs ? 'Calcular ruta →' : 'Calculate route →'
    }
    return isEs ? 'Siguiente →' : 'Next →'
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
                <span className={styles.stepTitle}>{stepTitle}</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${(step / totalSteps) * 100}%` }} />
              </div>
            </div>

            {/* Steps */}
            <div className={styles.stepContent} key={step}>

              {/* Step 1 — Route */}
              {step === 1 && (
                <div className={styles.stepWrapper}>
                  <div className={styles.fieldGroup}>
                    <div className={styles.routeLine}>
                      <div className={styles.routeDot} />
                      <div className={styles.routeLineDash} />
                      <div className={styles.routePin} />
                    </div>
                    <div className={styles.routeInputs}>
                      <PlaceInput
                        label={isEs ? 'Origen' : 'Pickup'}
                        name="from"
                        value={form.fromLabel}
                        coords={form.fromCoords}
                        onSelect={handleSelectFrom}
                        placeholder={isEs ? 'Ej. Miami Airport...' : 'E.g. Miami Airport...'}
                      />
                      <PlaceInput
                        label={isEs ? 'Destino' : 'Drop-off'}
                        name="to"
                        value={form.toLabel}
                        coords={form.toCoords}
                        onSelect={handleSelectTo}
                        placeholder={isEs ? 'Ej. South Beach...' : 'E.g. South Beach...'}
                      />
                    </div>
                  </div>

                  {routeError && (
                    <div className={styles.priceError} style={{ marginTop: '1.5rem' }}>{routeError}</div>
                  )}
                  
                  {routeInfo && (
                    <div className={styles.priceEstimateBox}>
                      <div className={styles.priceResult}>
                        <div className={styles.priceRouteStats}>
                          <div className={styles.priceStat}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                            </svg>
                            {routeInfo.durationText}
                          </div>
                          <div className={styles.priceDot} />
                          <div className={styles.priceStat}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 12h18M3 6h18M3 18h18"/>
                            </svg>
                            {routeInfo.distanceText}
                          </div>
                        </div>
                        <div className={styles.priceFigure}>
                          <span className={styles.priceFrom}>{isEs ? 'Desde' : 'From'}</span>
                          <span className={styles.priceAmount}>${calcPrice('Ford Transit 2025')}</span>
                          <span className={styles.priceCurrency}>USD</span>
                        </div>
                        <p className={styles.priceNote}>
                          {isEs ? 'Precio final según vehículo seleccionado' : 'Final price depends on selected vehicle'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2 — Schedule */}
              {step === 2 && (
                <div className={styles.stepWrapper}>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>{isEs ? 'Fecha' : 'Date'}</label>
                      <input type="date" name="date" value={form.date} onChange={handleChange} autoFocus />
                    </div>
                    <div className={styles.field}>
                      <label>{isEs ? 'Hora' : 'Time'}</label>
                      <input type="time" name="time" value={form.time} onChange={handleChange} />
                    </div>
                  </div>
                  <div className={styles.field} style={{ marginTop: '1.5rem' }}>
                    <label>{isEs ? 'Pasajeros' : 'Passengers'}</label>
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

              {/* Step 3 — Vehicle */}
              {step === 3 && (
                <div className={styles.stepWrapper}>
                  <div className={styles.vehicleGrid}>
                    {vehiclesList.map(v => (
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
                          {calcPrice(v) != null && (
                            <div className={styles.vehiclePrice}>${calcPrice(v)} USD</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4 — Client */}
              {step === 4 && (
                <div className={styles.stepWrapper}>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>{isEs ? 'Nombre' : 'Name'}</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" autoFocus />
                    </div>
                    <div className={styles.field}>
                      <label>{isEs ? 'Teléfono' : 'Phone'}</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (305) 000-0000" />
                    </div>
                  </div>
                  <div className={styles.field} style={{ marginTop: '1.5rem' }}>
                    <label>{isEs ? 'Notas (opcional)' : 'Notes (optional)'}</label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={3}
                      placeholder={isEs ? 'Nro. de vuelo, sillas de bebé...' : 'Flight number, baby seats...'}
                    />
                  </div>
                </div>
              )}

              {/* Step 5 — Review */}
              {step === 5 && (
                <div className={styles.stepWrapper}>
                  <div className={styles.ticket}>
                    <div className={styles.ticketPattern} />
                    <div className={styles.ticketHeader}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                      <h3>{isEs ? 'Resumen del viaje' : 'Transfer Summary'}</h3>
                    </div>
                    <div className={styles.ticketBody}>
                      {[
                        [isEs ? 'Origen'     : 'Pickup',     form.fromLabel],
                        [isEs ? 'Destino'    : 'Drop-off',   form.toLabel],
                        routeInfo ? [isEs ? 'Distancia' : 'Distance', `${routeInfo.distanceText} · ${routeInfo.durationText}`] : null,
                        [isEs ? 'Vehículo'   : 'Vehicle',    form.vehicle],
                        [isEs ? 'Horario'    : 'Schedule',   `${form.date} · ${form.time}`],
                        [isEs ? 'Pasajeros'  : 'Passengers', `${form.passengers} pax`],
                        [isEs ? 'Cliente'    : 'Client',     `${form.name} · ${form.phone}`],
                        form.notes ? [isEs ? 'Notas' : 'Notes', form.notes] : null,
                      ].filter(Boolean).map(([label, val]) => (
                        <div key={label} className={styles.ticketItem}>
                          <span>{label}</span>
                          <p>{val}</p>
                        </div>
                      ))}
                    </div>
                    {price != null && (
                      <div className={styles.ticketPrice}>
                        <span className={styles.ticketPriceLabel}>{isEs ? 'Precio estimado' : 'Estimated price'}</span>
                        <span className={styles.ticketPriceAmount}>${price} <small>USD</small></span>
                      </div>
                    )}
                    <div className={styles.ticketFooter}>
                      <span>{isEs ? 'Cliente' : 'Client'}: </span>{form.name} ({form.phone})
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className={styles.wizardNav}>
              {step > 1
                ? <button className={styles.btnPrev} onClick={handlePrev}>{isEs ? '← Atrás' : '← Back'}</button>
                : <div />
              }
              {step < totalSteps ? (
                <button
                  className={styles.btnNext}
                  onClick={handleNext}
                  disabled={step === 1 ? (!canCalc && !routeInfo) : !isStepValid()}
                >
                  {nextLabel()}
                </button>
              ) : (
                <button
                  className={`${styles.submitBtn} ${submitted ? styles.submitted : ''}`}
                  onClick={handleSubmit}
                  disabled={submitted}
                >
                  {submitted ? (isEs ? '✓ ¡Enviado!' : '✓ Sent!') : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M18 2L9 11M18 2L12 18l-3-7-7-3 16-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {isEs ? 'Enviar por WhatsApp' : 'Send via WhatsApp'}
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