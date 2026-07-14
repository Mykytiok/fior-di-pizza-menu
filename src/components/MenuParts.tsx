import type { CSSProperties } from 'react'

export interface Pizza {
  id: string | number
  name: string
  ingredients?: string
  normale: string
  maxi?: string
  category?: string
}

export interface Calzone {
  id: string | number
  name: string
  ingredients?: string
  price: string
  key?: string | number
}

export const COLORS = {
  paper:    '#faf7f2',
  ink:      '#1c1812',
  inkMid:   '#3d3830',
  inkLight: '#8a8070',
  terra:    '#8b2a1a',
  terraMid: '#a63520',
  rule:     '#c8bfb0',
  ruleFaint:'#ddd8ce',
}


export const PAGE: CSSProperties = {
  width: '100%',
  height: '100%',
  aspectRatio: '420 / 297',
  background: COLORS.paper,
  padding: '20px 28px 16px',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: "'Barlow Condensed', sans-serif",
  color: COLORS.ink,
  position: 'relative',
  overflow: 'hidden',
}

export function rule(extra?: string) {
  return (
    <div
      key={extra}
      style={{
        height: 0,
        borderTop: `0.75px solid ${COLORS.rule}`,
        margin: '4px 0',
      }}
    />
  )
}

export function PriceHeader() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '0 20px',
      marginBottom: 2,
    }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 0,
        }}>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 0 }}>
            <div style={{
              width: 52,
              textAlign: 'right',
              fontSize: 7.5,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: COLORS.terra,
              paddingRight: 6,
            }}>Normale</div>
            <div style={{
              width: 42,
              textAlign: 'right',
              fontSize: 7.5,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: COLORS.terra,
            }}>Maxi</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 3,
      marginTop: 2,
    }}>
      <div style={{ flex: 1, height: 0, borderTop: `1px solid ${COLORS.rule}` }} />
      <div style={{
        fontFamily: "'Bodoni Moda', serif",
        fontSize: 13,
        fontStyle: 'italic',
        fontWeight: 400,
        color: COLORS.terra,
        letterSpacing: '0.08em',
        textTransform: 'none',
        lineHeight: 1,
      }}>
        {children}
      </div>
      <div style={{ flex: 1, height: 0, borderTop: `1px solid ${COLORS.rule}` }} />
    </div>
  )
}


export function PizzaItem({ id, name, ingredients, normale, maxi }: Pizza) {
  return (
    <div style={{ paddingTop: 2.3, paddingBottom: 2.3, borderBottom: `0.5px solid ${COLORS.ruleFaint}` }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
        <span style={{
          fontSize: 7.5,
          fontWeight: 600,
          color: COLORS.terra,
          minWidth: 18,
          fontFamily: "'Barlow Condensed', sans-serif",
          letterSpacing: '0.04em',
          flexShrink: 0,
        }}>{id}.</span>
        <span style={{
          flex: 1,
          fontSize: 9.5,
          fontWeight: 700,
          fontFamily: "'Barlow Condensed', sans-serif",
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: COLORS.ink,
          lineHeight: 1.1,
        }}>{name}</span>
        <div style={{ display: 'flex', flexShrink: 0, gap: 0 }}>
          <span style={{
            width: 52,
            textAlign: 'right',
            fontSize: 9,
            fontWeight: 500,
            fontFamily: "'Barlow Condensed', sans-serif",
            color: COLORS.inkMid,
            paddingRight: 6,
          }}>{normale}</span>
          <span style={{
            width: 42,
            textAlign: 'right',
            fontSize: 9,
            fontWeight: 500,
            fontFamily: "'Barlow Condensed', sans-serif",
            color: COLORS.inkMid,
          }}>{maxi}</span>
        </div>
      </div>
      <div style={{
        fontSize: 7,
        color: COLORS.inkLight,
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 300,
        fontStyle: 'italic',
        letterSpacing: '0.02em',
        paddingLeft: 18,
        lineHeight: 1.25,
        marginTop: 0.5,
      }}>
        {ingredients}
      </div>
    </div>
  )
}

export function CalzoneItem({ id, name, ingredients, price }: Calzone) {
  return (
    <div style={{ paddingTop: 2.3, paddingBottom: 2.3, borderBottom: `0.5px solid ${COLORS.ruleFaint}` }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
        <span style={{
          fontSize: 7.5,
          fontWeight: 600,
          color: COLORS.terra,
          minWidth: 22,
          fontFamily: "'Barlow Condensed', sans-serif",
          letterSpacing: '0.04em',
          flexShrink: 0,
        }}>{id}.</span>
        <span style={{
          flex: 1,
          fontSize: 9.5,
          fontWeight: 700,
          fontFamily: "'Barlow Condensed', sans-serif",
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: COLORS.ink,
        }}>{name}</span>
        <span style={{
          fontSize: 9,
          fontWeight: 500,
          fontFamily: "'Barlow Condensed', sans-serif",
          color: COLORS.inkMid,
          minWidth: 36,
          textAlign: 'right',
        }}>{price}</span>
      </div>
      <div style={{
        fontSize: 7,
        color: COLORS.inkLight,
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 300,
        fontStyle: 'italic',
        paddingLeft: 22,
        marginTop: 0.5,
      }}>
        {ingredients}
      </div>
    </div>
  )
}

export function DrinkRow({ name, vol, price }: { name: string; vol?: string; price: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'baseline',
      paddingTop: 2,
      paddingBottom: 2,
      borderBottom: `0.5px solid ${COLORS.ruleFaint}`,
      gap: 4,
    }}>
      <span style={{ flex: 1, fontSize: 9, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.03em', color: COLORS.ink, fontFamily: "'Barlow Condensed'" }}>{name}</span>
      {vol && <span style={{ fontSize: 7.5, color: COLORS.inkLight, fontFamily: "'Barlow Condensed'", fontStyle: 'italic' }}>{vol}</span>}
      <span style={{ fontSize: 9, fontWeight: 500, color: COLORS.inkMid, fontFamily: "'Barlow Condensed'", textAlign: 'right', minWidth: 32 }}>{price}</span>
    </div>
  )
}

export function DolceRow({ name, desc, price }: { name: string; desc: string; price: string }) {
  return (
    <div style={{ paddingTop: 2.3, paddingBottom: 2.3, borderBottom: `0.5px solid ${COLORS.ruleFaint}` }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ flex: 1, fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: COLORS.ink, fontFamily: "'Barlow Condensed'" }}>{name}</span>
        <span style={{ fontSize: 9, fontWeight: 500, color: COLORS.inkMid, fontFamily: "'Barlow Condensed'", minWidth: 32, textAlign: 'right' }}>{price}</span>
      </div>
      <div style={{ fontSize: 7, color: COLORS.inkLight, fontStyle: 'italic', fontFamily: "'Barlow Condensed'", fontWeight: 300, marginTop: 0.5 }}>{desc}</div>
    </div>
  )
}