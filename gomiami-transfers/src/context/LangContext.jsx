import { createContext, useContext, useState } from 'react'

const LangContext = createContext()

export const translations = {
  en: {
    nav: {
      services: 'Services',
      fleet: 'Fleet',
      gallery: 'Gallery',
      quote: 'Get a Quote',
      contact: 'Contact',
    },
    hero: {
      tag: 'Miami\'s Premier Executive Transport',
      title: 'Arrive in\nAbsolute',
      titleAccent: 'Luxury.',
      subtitle: 'Private transfers, executive fleets & VIP experiences across Miami, Orlando and beyond.',
      cta: 'Book Your Transfer',
      ctaSub: 'View Our Fleet',
    },
    // Agregá estas keys a tu archivo de traducciones (ej: es.js / en.js)
// Las keys nuevas respecto a la versión anterior están marcadas con // NEW

  services: {
    tag: 'Nuestros Servicios',
    title: 'Lo que\nofrece­mos',
    bookNow: 'Reservar',
    items: [
      {
        title: 'Puerto – Hotel',
        desc: 'Lo buscamos directamente en el Puerto de Miami y lo llevamos a su hotel sin escalas ni demoras.',
      },
      {
        title: 'Aeropuerto – Hotel',
        desc: 'Traslados desde el MIA o FLL a cualquier hotel de Miami. Conductor esperando a su llegada.',
      },
      {
        title: 'Miami – Orlando',
        desc: 'Viaje interestatal en vehículos ejecutivos. Cómodo, directo y sin necesidad de alquilar auto.',
      },
      {
        title: 'Key West',
        desc: 'Recorra el Overseas Highway sin preocupaciones. Disfrute el paisaje mientras nosotros manejamos.',
      },
      {
        title: 'Tour de Compras',
        desc: 'Sawgrass Mills, Dolphin Mall, Aventura y más. Le llevamos a los mejores centros comerciales.',
      },
      {
        title: 'Traslados a Estadios',
        desc: 'Hard Rock Stadium, Kaseya Center y más. Llegue y regrese sin el estrés del tráfico ni estacionamiento.',
      },
      {
        title: 'Traslados Nocturnos',
        desc: 'Servicio disponible las 24 horas. Ideal para vuelos tardíos, eventos nocturnos o llegadas de madrugada.',
      },
    ],
  },
    fleet: {
      tag: 'Our Fleet',
      title: 'Every Vehicle.\nBlack. 2025.',
      subtitle: 'All vehicles are 2025 models, meticulously maintained and finished in executive black.',
      pax: 'passengers',
      luggage: 'bags',
      select: 'Select This Vehicle',
    },
    gallery: {
      tag: 'Experience',
      title: 'The GoMiami\nDifference',
    },
    quoter: {
      tag: 'Instant Quote',
      title: 'Plan Your\nTransfer',
      from: 'Pickup Location',
      to: 'Destination',
      date: 'Date',
      time: 'Time',
      passengers: 'Passengers',
      vehicle: 'Vehicle',
      name: 'Your Name',
      phone: 'Phone / WhatsApp',
      notes: 'Special requests (optional)',
      submit: 'Send via WhatsApp',
      selectVehicle: 'Select a vehicle',
      fromPlaceholder: 'e.g. Miami Int\'l Airport',
      toPlaceholder: 'e.g. Brickell, Miami',
    },
    footer: {
      tagline: 'Executive Transportation. Redefined.',
      rights: 'All rights reserved.',
      phone: '+1 (305) 336-1521',
      email: 'info@gomiamitransfers.com',
      social: 'Follow Us',
    },
  },

  es: {
    nav: {
      services: 'Servicios',
      fleet: 'Flota',
      gallery: 'Galería',
      quote: 'Cotizar',
      contact: 'Contacto',
    },
    hero: {
      tag: 'Transporte Ejecutivo Premium en Miami',
      title: 'Viaja con\nAbsoluto',
      titleAccent: 'Lujo.',
      subtitle: 'Traslados privados, flota ejecutiva y experiencias VIP en Miami, Orlando y más allá.',
      cta: 'Reserva tu Traslado',
      ctaSub: 'Ver Nuestra Flota',
    },
    services: {
      tag: 'Lo que Ofrecemos',
      title: 'Diseñado para\nCada Viaje',
      bookNow: 'Reservar',
      items: [
        { title: 'Aeropuerto → Hotel', desc: 'Recogida en MIA y FLL. Tu chofer espera en llegadas con tu nombre en pantalla.' },
        { title: 'Hotel → Aeropuerto', desc: 'Salidas puntuales. Monitoreamos tu vuelo para que nunca pierdas una conexión.' },
        { title: 'Miami → Orlando',    desc: 'Traslados interurbanos de lujo en total comodidad. Relájate mientras nosotros manejamos.' },
        { title: 'Casinos',            desc: 'Viajes privados a Hard Rock, Seminole y más. Discreto, confiable, a tu horario.' },
        { title: 'Puerto de Miami',    desc: 'Traslados a terminales de cruceros con asistencia de equipaje. Empieza tu viaje bien.' },
        { title: 'Grupos y Eventos',   desc: 'Eventos corporativos, bodas y chárters grupales. Coordinamos cada vehículo y detalle.' },
      ],
    },
    fleet: {
      tag: 'Nuestra Flota',
      title: 'Cada Vehículo.\nNegro. 2025.',
      subtitle: 'Todos los vehículos son modelos 2025, impecablemente mantenidos y en negro ejecutivo.',
      pax: 'pasajeros',
      luggage: 'maletas',
      select: 'Seleccionar',
    },
    gallery: {
      tag: 'Experiencia',
      title: 'La Diferencia\nGoMiami',
    },
    quoter: {
      tag: 'Cotización Instantánea',
      title: 'Planifica tu\nTraslado',
      from: 'Punto de Recogida',
      to: 'Destino',
      date: 'Fecha',
      time: 'Hora',
      passengers: 'Pasajeros',
      vehicle: 'Vehículo',
      name: 'Tu Nombre',
      phone: 'Teléfono / WhatsApp',
      notes: 'Solicitudes especiales (opcional)',
      submit: 'Enviar por WhatsApp',
      selectVehicle: 'Seleccionar vehículo',
      fromPlaceholder: 'Ej. Aeropuerto Int\'l de Miami',
      toPlaceholder: 'Ej. Brickell, Miami',
    },
    footer: {
      tagline: 'Transporte Ejecutivo. Redefinido.',
      rights: 'Todos los derechos reservados.',
      phone: '+1 (305) 336-1521',
      email: 'info@gomiamitransfers.com',
      social: 'Síguenos',
    },
  },
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = translations[lang]
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)