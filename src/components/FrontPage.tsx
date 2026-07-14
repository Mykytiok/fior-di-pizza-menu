import { pizzas } from '../data/menuData'
import { PAGE, COLORS, rule, PriceHeader, PizzaItem, SectionHeading } from './MenuParts'

const frontCategories = ['Classiche', 'Di Mare', 'Vegetariane e Formaggi']

export default function FrontPage() {
  return (
    <div style={PAGE}>
      {/* ── Header ── */}
      <header style={{ textAlign: 'center', paddingBottom: 12, borderBottom: `1.5px solid ${COLORS.ink}`, marginBottom: 14 }}>
        <div style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: "'Barlow Condensed'", fontWeight: 600, color: COLORS.terra, marginBottom: 6 }}>
          dal 1974 · Novara
        </div>
        <div style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 52, fontWeight: 900, letterSpacing: '-0.01em', lineHeight: 0.9, color: COLORS.ink }}>
          Pizzeria
        </div>
        <div style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 52, fontWeight: 400, fontStyle: 'italic', letterSpacing: '0.02em', lineHeight: 1, color: COLORS.terra }}>
          Fior Di Pizza
        </div>
        <div style={{ marginTop: 8, fontSize: 8.5, letterSpacing: '0.28em', textTransform: 'uppercase', color: COLORS.inkMid, fontFamily: "'Barlow Condensed'", fontWeight: 400 }}>
          Viale Giulio Cesare 112 · Novara · Tel. 0321403318
        </div>
      </header>

      {/* ── Price column headers ── */}
      <PriceHeader />
      {rule()}


      <div style={{ columnCount: 3, columnGap: '20px', flex: 1, width: '100%' }}>
        {frontCategories.map(category => {
          const categoryPizzas = pizzas.filter(p => p.category === category);
          if (categoryPizzas.length === 0) return null;

          return (
            <div key={category} style={{ marginBottom: 14 }}>
              <div style={{ breakAfter: 'avoid', pageBreakAfter: 'avoid' }}>
                <SectionHeading>{category}</SectionHeading>
              </div>
              {categoryPizzas.map(p => (
                <div key={p.id} style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <PizzaItem {...p} />
                </div>
              ))}
            </div>
          )
        })}
      </div>

      {/* ── Footer ── */}
      <div style={{ borderTop: `0.5px solid ${COLORS.inkLight}`, marginTop: 6, paddingTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 7, color: COLORS.inkLight, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Barlow Condensed'", whiteSpace: 'nowrap' }}>
          Prezzi in euro
        </span>
        <span style={{ fontSize: 7, color: COLORS.terra, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Barlow Condensed'", fontStyle: 'italic', whiteSpace: 'nowrap' }}>
          Pagina 1 / 2 — vedi retro per bevande e dolci
        </span>
        <span style={{ fontSize: 7, color: COLORS.inkLight, letterSpacing: '0.03em', fontFamily: "'Barlow Condensed'", whiteSpace: 'nowrap', textAlign: 'right' }}>
          Gli allergeni sono disponibili su richiesta al personale di sala. IVA inclusa nei prezzi esposti.
        </span>
      </div>
    </div>
  )
}