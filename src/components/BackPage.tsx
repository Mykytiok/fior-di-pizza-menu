import { pizzas, calzoni, drinks } from '../data/menuData'
import { PAGE, COLORS, rule, PizzaItem, SectionHeading, CalzoneItem, DrinkRow } from './MenuParts'

export default function BackPage() {
  const specialiPizzas = pizzas.filter(p => p.category === 'Le Speciali');

  return (
    <div style={PAGE}>
      {/* ── Header ── */}
      <header style={{ textAlign: 'center', paddingBottom: 10, borderBottom: `1.5px solid ${COLORS.ink}`, marginBottom: 12 }}>
        <div style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 22, fontWeight: 400, fontStyle: 'italic', color: COLORS.terra, letterSpacing: '0.04em' }}>
          Pizzeria Fior Di Pizza
        </div>
        <div style={{ fontSize: 7.5, letterSpacing: '0.28em', textTransform: 'uppercase', color: COLORS.inkLight, fontFamily: "'Barlow Condensed'", marginTop: 3 }}>
          Bevande · Calzoni · Pizze Speciali
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 20px', flex: 1 }}>

        {/* Column 1: Pizze Speciali + Supplementi */}
        <div>
          <SectionHeading>Pizze Speciali</SectionHeading>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 3 }}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: 52, textAlign: 'right', fontSize: 7.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.terra, paddingRight: 6 }}>Normale</div>
              <div style={{ width: 42, textAlign: 'right', fontSize: 7.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.terra }}>Maxi</div>
            </div>
          </div>
          {rule()}
          {specialiPizzas.map(p => <PizzaItem key={p.id} {...p} />)}

          {/* Supplementi */}
          <div style={{ marginTop: 14 }}>
            <SectionHeading>Supplementi</SectionHeading>
            {rule()}
            {[
              { name: 'Doppia mozzarella', price: '1.50' },
              { name: 'Ingrediente extra', price: '1.00' },
              { name: 'Impasto senza glutine', price: '2.00' },
              { name: 'Impasto integrale', price: '1.00' },
              { name: 'Pane all\'aglio (2 pz)', price: '2.00' },
              { name: 'Coperto (per persona)', price: '1.50' },
            ].map(s => (
              <div key={s.name} style={{
                display: 'flex',
                alignItems: 'baseline',
                paddingTop: 3,
                paddingBottom: 3,
                borderBottom: `0.5px solid ${COLORS.ruleFaint}`,
              }}>
                <span style={{ flex: 1, fontSize: 9, fontFamily: "'Barlow Condensed'", textTransform: 'uppercase', letterSpacing: '0.03em', color: COLORS.ink }}>{s.name}</span>
                <span style={{ fontSize: 9, fontFamily: "'Barlow Condensed'", color: COLORS.inkMid }}>{s.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Calzoni + Bevande */}
        <div>
          {/* Calzoni al Forno */}
          <div>
            <SectionHeading>Calzoni al Forno</SectionHeading>
            {rule()}
            {calzoni.map(c => (
  <CalzoneItem 
    key={c.id} 
    {...c} 
    id={String(c.id)} // Примусово перетворюємо id в рядок (string)
  />
))}
            <div style={{ marginTop: 6, fontSize: 7, color: COLORS.inkLight, fontStyle: 'italic', fontFamily: "'Barlow Condensed'", lineHeight: 1.4 }}>
              Tutti i calzoni vengono serviti con pomodoro a parte. Disponibile anche fritto su richiesta (+€ 1.00).
            </div>
          </div>

          {/* Bevande */}
          <div style={{ marginTop: 14 }}>
            <SectionHeading>Bevande</SectionHeading>
            {rule()}
            <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.terra, marginBottom: 3, marginTop: 4, fontFamily: "'Barlow Condensed'" }}>
              Acque & Analcoliche
            </div>
            {drinks.slice(0, 6).map((d, i) => <DrinkRow key={i} {...d} />)}

            <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.terra, marginBottom: 3, marginTop: 10, fontFamily: "'Barlow Condensed'" }}>
              Birre
            </div>
            {drinks.slice(6, 9).map((d, i) => <DrinkRow key={i} {...d} />)}
          </div>
        </div>

        {/* Column 3: Orari + Info */}
        <div>
          {/* Orari */}
          <div>
            <SectionHeading>Orari</SectionHeading>
            {rule()}
            {[
              { days: 'Lunedì', hours: 'Chiuso' },
              { days: 'Mar — Dom', hours: '12:00 – 14:00 / 18:30 – 22:00' },
            ].map(o => (
              <div key={o.days} style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: 3,
                paddingBottom: 3,
                borderBottom: `0.5px solid ${COLORS.ruleFaint}`,
              }}>
                <span style={{ fontSize: 8.5, fontFamily: "'Barlow Condensed'", fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: o.hours === 'Chiuso' ? COLORS.inkLight : COLORS.ink }}>{o.days}</span>
                <span style={{ fontSize: 8.5, fontFamily: "'Barlow Condensed'", color: o.hours === 'Chiuso' ? COLORS.terra : COLORS.inkMid, fontStyle: o.hours === 'Chiuso' ? 'italic' : 'normal' }}>{o.hours}</span>
              </div>
            ))}
          </div>

{/* Info box */}
          <div style={{
            marginTop: 16,
            border: `0.75px solid ${COLORS.rule}`,
            padding: '10px 12px',
            background: 'rgba(139,42,26,0.04)',
          }}>
            <div style={{ fontFamily: "'Bodoni Moda', serif", fontStyle: 'italic', fontSize: 11, color: COLORS.terra, marginBottom: 6 }}>Come trovarci</div>
            <div style={{ fontSize: 8, fontFamily: "'Barlow Condensed'", color: COLORS.inkMid, lineHeight: 1.7 }}>
              Viale Giulio Cesare 112 · Novara<br />
              Tel. 0321403318
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ borderTop: `0.75px solid ${COLORS.rule}`, marginTop: 10, paddingTop: 6, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 7, color: COLORS.inkLight, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Barlow Condensed'" }}>
          Prezzi in euro · IVA inclusa
        </span>
        <span style={{ fontFamily: "'Bodoni Moda', serif", fontStyle: 'italic', fontSize: 8, color: COLORS.terra }}>
          Dal 1974, con passione
        </span>
        <span style={{ fontSize: 7, color: COLORS.inkLight, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Barlow Condensed'" }}>
          Pagina 2 / 2
        </span>
      </div>
    </div>
  )
}