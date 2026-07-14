import { useState, useEffect } from 'react'
import FrontPage from './components/FrontPage'
import BackPage from './components/BackPage'
import MobileMenu from './components/MobileMenu'

export default function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkViewport = () => {

      const isSmallScreen = window.innerWidth <= 768
      
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

      setIsMobile(isSmallScreen && (isTouchDevice || isMobileUserAgent))
    }
    
    checkViewport()
    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  return (
    <div>
      {isMobile && (
        <div className="mobile-view">
          <MobileMenu />
        </div>
      )}

      {(!isMobile || window.matchMedia('print').matches) && (
        <div className="desktop-view print-container" style={{ minHeight: '100vh', background: '#2a2520', padding: '32px 24px', fontFamily: "'Barlow Condensed', sans-serif" }}>
          <div className="print-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
            <PageWrapper>
              <FrontPage />
            </PageWrapper>
            <PageWrapper>
              <BackPage />
            </PageWrapper>
          </div>
        </div>
      )}
    </div>
  )
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="print-page-wrapper" style={{ width: '100%', maxWidth: 920 }}>
      <div className="print-shadow-none" style={{
        boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
        lineHeight: 1,
      }}>
        {children}
      </div>
    </div>
  )
}