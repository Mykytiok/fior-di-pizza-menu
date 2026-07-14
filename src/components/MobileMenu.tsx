import { useState } from 'react'
import { pizzas, calzoni, drinks } from '../data/menuData'
import { COLORS } from './MenuParts'

const CATEGORIES = [
  { id: 'Classiche', label: 'Classiche' },
  { id: 'Di Mare', label: 'Di Mare' },
  { id: 'Vegetariane e Formaggi', label: 'Vegetariane' },
  { id: 'Le Speciali', label: 'Le Speciali' },
  { id: 'Calzoni', label: 'Calzoni' },
  { id: 'Bevande', label: 'Bevande' },
]

export default function MobileMenu() {
  const [activeTab, setActiveTab] = useState('Classiche')
  const filteredPizzas = pizzas.filter(p => p.category === activeTab)

  // ── ФІЛЬТРАЦІЯ: Прибираємо каву ТА вино з напоїв ──
  const filteredDrinks = drinks.filter(d => {
    const name = d.name.toLowerCase()
    return (
      !name.includes('caffè') && 
      !name.includes('caffe') &&
      !name.includes('espresso') &&
      !name.includes('vino')
    )
  })

  return (
    <div style={{
      background: COLORS.paper,
      minHeight: '100vh',
      color: COLORS.ink,
      fontFamily: "'Barlow Condensed', sans-serif",
      paddingBottom: 40,
    }}>
      {/* ── App Header ── */}
      <header style={{
        background: '#1a1510',
        color: COLORS.paper,
        padding: '20px 16px 16px',
        textAlign: 'center',
        borderBottom: `3px solid ${COLORS.terra}`,
      }}>
        <div style={{ fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: COLORS.terra, fontWeight: 600 }}>
          dal 1974 · Novara
        </div>
        <div style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 32, fontWeight: 900, lineHeight: 1, marginTop: 4 }}>
          Fior Di Pizza
        </div>
        <div style={{ fontSize: 11, color: '#a0988c', marginTop: 6, letterSpacing: '0.1em' }}>
          Viale Giulio Cesare 112 · Tel. 0321403318
        </div>
      </header>

      {/* ── Sticky Horizontal Category Bar ── */}
      <div style={{
        position: 'sticky',
        top: 0,
        background: COLORS.paper,
        borderBottom: `1px solid ${COLORS.rule}`,
        display: 'flex',
        overflowX: 'auto',
        padding: '10px 12px',
        gap: 8,
        zIndex: 10,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}>
        {CATEGORIES.map(cat => {
          const isActive = activeTab === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: 'none',
                background: isActive ? COLORS.terra : 'rgba(0,0,0,0.06)',
                color: isActive ? '#fff' : COLORS.ink,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* ── Menu Items Container ── */}
      <div style={{ padding: '16px 16px' }}>
        
        {/* Render Pizzas */}
        {filteredPizzas.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: 10, fontWeight: 700, color: COLORS.terra, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, paddingRight: 4 }}>
              <span style={{ width: 50, textAlign: 'right' }}>Norm.</span>
              <span style={{ width: 50, textAlign: 'right' }}>Maxi</span>
            </div>

            {filteredPizzas.map(p => (
              <div key={p.id} style={{
                paddingBottom: 12,
                marginBottom: 12,
                borderBottom: `0.5px solid ${COLORS.ruleFaint}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', color: COLORS.ink, letterSpacing: '0.02em', flex: 1, paddingRight: 8 }}>
                    {p.name}
                  </span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <span style={{ width: 50, textAlign: 'right', fontSize: 15, fontWeight: 600, color: COLORS.ink }}>
                      € {p.normale}
                    </span>
                    <span style={{ width: 50, textAlign: 'right', fontSize: 15, fontWeight: 600, color: p.maxi === '-' ? COLORS.inkLight : COLORS.terra }}>
                      {p.maxi === '-' ? '-' : `€ ${p.maxi}`}
                    </span>
                  </div>
                </div>
                {p.ingredients && (
                  <div style={{ fontSize: 12, color: COLORS.inkMid, lineHeight: 1.3, marginTop: 3 }}>
                    {p.ingredients}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Render Calzoni */}
        {activeTab === 'Calzoni' && (
          <div>
            {calzoni.map(c => (
              <div key={String(c.id)} style={{
                paddingBottom: 12,
                marginBottom: 12,
                borderBottom: `0.5px solid ${COLORS.ruleFaint}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', color: COLORS.ink, flex: 1 }}>
                    {c.name}
                  </span>
                  <span style={{ fontSize: 15, fontWeight: 600, color: COLORS.terra }}>
                    € {c.price}
                  </span>
                </div>
                {c.ingredients && (
                  <div style={{ fontSize: 12, color: COLORS.inkMid, lineHeight: 1.3, marginTop: 3 }}>
                    {c.ingredients}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Bevande' && (
          <div>
            {filteredDrinks.map((d, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 6, paddingBottom: 6, marginBottom: 8, borderBottom: `0.5px solid ${COLORS.ruleFaint}` }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.ink }}>
                  {d.name} {d.vol && <span style={{ fontSize: 11, color: COLORS.inkLight, fontWeight: 400 }}>({d.vol})</span>}
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.ink }}>€ {d.price}</span>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── Call to Action Footer ── */}
      <div style={{ padding: '20px 16px', textAlign: 'center', background: 'rgba(0,0,0,0.03)', marginTop: 20, borderTop: `1px solid ${COLORS.rule}` }}>
        <a
          href="tel:0321403318"
          style={{
            display: 'inline-block',
            background: COLORS.terra,
            color: '#fff',
            textDecoration: 'none',
            padding: '12px 28px',
            borderRadius: 30,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            boxShadow: '0 4px 12px rgba(139,42,26,0.3)',
          }}
        >
          📞 Chiama e Ordina: 0321 403318
        </a>
        <div style={{ fontSize: 11, color: COLORS.inkLight, marginTop: 12 }}>
           IVA inclusa nei prezzi
        </div>
      </div>
    </div>
  )
}