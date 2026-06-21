"use client"
import { useState, useEffect } from "react"

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [opacity, setOpacity] = useState(0)
  const [scale, setScale] = useState(0.95)

  useEffect(() => {
    const timeline = [
      // Fade in logo (0-400ms)
      { time: 0, action: () => animateFadeIn() },
      
      // Hold (400-1400ms = 1 second hold)
      
      // Fade out (1400-1800ms)
      { time: 1400, action: () => animateFadeOut() },
      
      // Complete and transition
      { time: 1800, action: onComplete }
    ]

    const timers = timeline.map(({ time, action }) => 
      setTimeout(action, time)
    )

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  const animateFadeIn = () => {
    const start = performance.now()
    const duration = 400
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOut(progress)
      setOpacity(eased)
      setScale(0.95 + 0.05 * eased)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  const animateFadeOut = () => {
    const start = performance.now()
    const duration = 400
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOut(progress)
      setOpacity(1 - eased)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999
    }}>
      <div style={{
        opacity,
        transform: `scale(${scale})`,
        transition: "none"
      }}>
        {/* StanceBeam Logo - Using the provided logo image */}
        <img 
          src="/stancebeam-logo.png" 
          alt="StanceBeam" 
          style={{
            width: "auto",
            height: 120,
            objectFit: "contain"
          }}
        />
      </div>
    </div>
  )
}
