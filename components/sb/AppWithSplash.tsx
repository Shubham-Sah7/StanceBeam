"use client"
import { useState, useEffect } from "react"
import JourneyScreen from "./JourneyScreen"

export default function AppWithSplash() {
  const [logoOpacity, setLogoOpacity] = useState(0)
  const [logoScale, setLogoScale] = useState(0.95)
  const [showSplash, setShowSplash] = useState(true)
  const [showDashboard, setShowDashboard] = useState(false)

  useEffect(() => {
    // Timeline for splash
    const timeline = [
      // Logo fade in (0-400ms)
      { time: 0, action: () => animateLogoIn() },
      
      // Hold logo (400-1200ms = 800ms hold)
      
      // Start rendering dashboard (but hidden behind splash)
      { time: 1000, action: () => setShowDashboard(true) },
      
      // Fade out logo (1200-1600ms)
      { time: 1200, action: () => animateLogoOut() },
      
      // Remove splash overlay (1800ms)
      { time: 1800, action: () => setShowSplash(false) }
    ]

    const timers = timeline.map(({ time, action }) => 
      setTimeout(action, time)
    )

    return () => timers.forEach(clearTimeout)
  }, [])

  const animateLogoIn = () => {
    const start = performance.now()
    const duration = 400
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOut(progress)
      setLogoOpacity(eased)
      setLogoScale(0.95 + 0.05 * eased)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  const animateLogoOut = () => {
    const start = performance.now()
    const duration = 400
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOut(progress)
      setLogoOpacity(1 - eased)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#FFFFFF" }}>
      {/* Dashboard - rendered only after splash starts fading */}
      {showDashboard && (
        <div style={{
          position: "absolute",
          inset: 0,
          opacity: showSplash ? 0 : 1,
          transition: showSplash ? "none" : "opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)"
        }}>
          <JourneyScreen />
        </div>
      )}

      {/* Splash overlay */}
      {showSplash && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: logoOpacity > 0 ? "auto" : "none",
          zIndex: 10
        }}>
          <div style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            transition: "none"
          }}>
            <img 
              src="/stancebeam-logo.png" 
              alt="StanceBeam" 
              style={{
                width: "auto",
                height: 100,
                objectFit: "contain"
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
