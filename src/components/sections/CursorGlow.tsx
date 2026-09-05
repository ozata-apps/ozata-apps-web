'use client'

import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    // Sadece mouse destekleyen cihazlarda aktif
    if (window.matchMedia('(hover: none)').matches) return

    const handleMouseMove = (e: MouseEvent) => {
      glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return <div ref={glowRef} className="cursor-glow" id="cursorGlow" aria-hidden="true" />
}
