import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import styles from './Services.module.css'

const NUMS = ['01', '02', '03', '04', '05', '06', '07']

const ARROW = (
  <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
    <path d="M1.5 6h9M7 2.5l3.5 3.5L7 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

function AccordionItem({ item, num, index, isOpen, onToggle }) {
  return (
    <li className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
      <div className={styles.itemInner}>
        <span className={styles.n}>{num}</span>
        <div className={styles.titleWrap}>
          <span className={styles.itemTitle}>{item.title}</span>
          <p className={styles.itemDesc}>{item.desc}</p>
        </div>
        <button
          className={styles.toggle}
          aria-label="Expand/Collapse"
          onClick={() => onToggle(index)}
        >
          <div className={styles.toggleLine} />
        </button>
      </div>
    </li>
  )
}

export default function Services() {
  const { t } = useLang()
  const items = t.services.items
  const [openIndex, setOpenIndex] = useState(null)

  const handleToggle = (index) => {
    setOpenIndex(prev => prev === index ? null : index)
  }

  return (
    <section className={styles.section} id="services">
      <div className={styles.inner}>

        <div className={styles.header}>
          <div className={styles.tag}>{t.services.tag}</div>
          <h2 className={styles.headline}>
            {t.services.title.split('\n').map((l, i) =>
              i === 1
                ? <em key={i}>{l}</em>
                : <span key={i}>{l}</span>
            )}
          </h2>
        </div>

        <div className={styles.divider} />

        <ul className={styles.list}>
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              num={NUMS[i]}
              index={i}
              isOpen={openIndex === i}
              onToggle={handleToggle}
            />
          ))}
        </ul>

        <div className={styles.ctaWrap}>
          <a href="#quoter" className={styles.ctaLink}>
            {t.services.bookNow} {ARROW}
          </a>
        </div>

      </div>

      <div className={styles.bgNum} aria-hidden="true">
        {openIndex !== null ? NUMS[openIndex] : NUMS[0]}
      </div>
    </section>
  )
}