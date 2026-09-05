'use client'

import { useEffect, useRef, useState } from 'react'

const SPLASH_KEY = 'ozata_splash_watched'

interface Particle {
  x: number; y: number; size: number; speedX: number; speedY: number
  opacity: number; color: string; life: number; decay: number
  isExploding: boolean; explodeSpeed: number; explodeAngle: number
}

export function SplashPreloader() {
  const [showSplash, setShowSplash] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const preloaderRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const preloader = preloaderRef.current
    const video = videoRef.current
    const btn = btnRef.current
    const canvas = canvasRef.current

    // Referans mantığı: sessionStorage'da izlenmişse hiç gösterme.
    // sessionStorage sayfa yenilendiğinde korunur, tarayıcı kapatılınca silinir.
    if (sessionStorage.getItem(SPLASH_KEY) === 'true') {
      setShowSplash(false)
      return
    }

    if (!preloader || !video || !btn || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Portre modda mobil video, yatayda tam video
    const source = video.querySelector('source')
    const pickSource = () => {
      if (!source) return
      const portrait = window.matchMedia('(orientation: portrait)').matches
      source.src = portrait
        ? '/ozata-apps-web/assets/video/splash_video_mobile.mp4'
        : '/ozata-apps-web/assets/video/splash_video.mp4'
      video.load()
    }
    pickSource()
    video.preload = 'auto'

    // === PARTİKÜL SİSTEMİ ===
    let W = 0, H = 0
    const resizeCanvas = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let particles: Particle[] = []
    let isHovering = false
    let isExploding = false
    let animId: number | null = null
    let spawnTimer = 0

    const makeParticle = (x: number, y: number): Particle => ({
      x, y,
      size: Math.random() * 3 + 1.5,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.5 + 0.3,
      color: `hsl(${Math.random() * 60 + 240}, 80%, 65%)`,
      life: 1,
      decay: Math.random() * 0.003 + 0.001,
      isExploding: false, explodeSpeed: 0, explodeAngle: 0,
    })

    const updateParticle = (p: Particle): boolean => {
      if (p.isExploding) {
        p.x += Math.cos(p.explodeAngle) * p.explodeSpeed
        p.y += Math.sin(p.explodeAngle) * p.explodeSpeed
        p.explodeSpeed *= 0.99
        p.size *= 0.998
        p.life -= p.decay * 2
      } else {
        p.x += p.speedX
        p.y += p.speedY
        if (p.x < 0 || p.x > W) p.speedX *= -1
        if (p.y < 0 || p.y > H) p.speedY *= -1
        p.life -= p.decay
      }
      return p.life > 0.01
    }

    const drawParticle = (p: Particle) => {
      ctx.save()
      ctx.globalAlpha = p.life * p.opacity
      ctx.shadowColor = p.color
      ctx.shadowBlur = 12
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.fill()
      ctx.restore()
    }

    const getButtonCenter = () => {
      const rect = btn.getBoundingClientRect()
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    }

    const spawnParticles = (count: number, cx: number, cy: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const radius = Math.random() * 120 + 30
        const p = makeParticle(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius)
        const dir = Math.random() > 0.5 ? 1 : -1
        const speed = Math.random() * 0.4 + 0.2
        p.speedX = Math.cos(angle + Math.PI / 2) * speed * dir
        p.speedY = Math.sin(angle + Math.PI / 2) * speed * dir
        p.size = Math.random() * 4 + 2
        p.opacity = Math.random() * 0.5 + 0.4
        particles.push(p)
      }
    }

    const explodeAllParticles = () => {
      isExploding = true
      particles.forEach((p) => {
        p.isExploding = true
        p.explodeAngle = Math.random() * Math.PI * 2
        p.explodeSpeed = Math.random() * 10 + 4
        p.size = Math.random() * 5 + 2
        p.opacity = 0.8
        p.life = 1
        p.decay = Math.random() * 0.005 + 0.002
      })
      const center = getButtonCenter()
      for (let i = 0; i < 80; i++) {
        const angle = Math.random() * Math.PI * 2
        const radius = Math.random() * 20
        const p = makeParticle(center.x + Math.cos(angle) * radius, center.y + Math.sin(angle) * radius)
        p.isExploding = true
        p.explodeAngle = Math.random() * Math.PI * 2
        p.explodeSpeed = Math.random() * 15 + 5
        p.size = Math.random() * 5 + 2
        p.opacity = 0.9
        p.life = 1
        p.decay = Math.random() * 0.004 + 0.002
        particles.push(p)
      }
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, W, H)
      if (isHovering && !isExploding) {
        spawnTimer++
        if (spawnTimer % 3 === 0) {
          const c = getButtonCenter()
          spawnParticles(2, c.x, c.y)
        }
      }
      particles = particles.filter(updateParticle)
      particles.forEach(drawParticle)
      if (particles.length > 400) particles = particles.slice(-350)
      animId = requestAnimationFrame(animateParticles)
    }
    animId = requestAnimationFrame(animateParticles)

    // === KAPATMA (referans: video bitince hide) ===
    const hidePreloader = () => {
      if (preloader.classList.contains('hide')) return
      preloader.classList.add('hide')
      sessionStorage.setItem(SPLASH_KEY, 'true')
      setTimeout(() => {
        setShowSplash(false)
        video.pause()
        video.currentTime = 0
        if (animId !== null) cancelAnimationFrame(animId)
      }, 800)
    }

    // === OLAYLAR ===
    const hint = preloader.querySelector('.splash-hint') as HTMLElement | null

    const handleMouseEnter = () => {
      isHovering = true
      const c = getButtonCenter()
      spawnParticles(40, c.x, c.y)
      if (hint) hint.style.opacity = '0'
    }
    const handleMouseLeave = () => {
      isHovering = false
      if (hint) hint.style.opacity = '0.8'
    }

    const handleClick = (e: MouseEvent) => {
      // === RIPPLE EFEKTİ ===
      const rect = btn.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const ripple = document.createElement('span')
      ripple.classList.add('ripple')
      ripple.style.width = ripple.style.height = size + 'px'
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px'
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px'
      btn.appendChild(ripple)
      setTimeout(() => ripple.remove(), 900)

      // === PARTİKÜL PATLAMASI ===
      explodeAllParticles()

      // === BUTON KÜÇÜLME ===
      btn.style.transform = 'scale(0.94)'
      setTimeout(() => { btn.style.transform = '' }, 150)

      // === VİDEOYU SESLİ BAŞLAT ===
      video.muted = false
      video.volume = 1.0
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.then(() => {
          preloader.classList.add('playing')
        }).catch(() => {
          video.muted = true
          video.play().catch(() => {})
          preloader.classList.add('playing')
        })
      }
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !preloader.classList.contains('hide')) hidePreloader()
    }

    btn.addEventListener('mouseenter', handleMouseEnter)
    btn.addEventListener('mouseleave', handleMouseLeave)
    btn.addEventListener('click', handleClick)
    video.addEventListener('ended', hidePreloader)
    video.addEventListener('error', hidePreloader)
    document.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      btn.removeEventListener('mouseenter', handleMouseEnter)
      btn.removeEventListener('mouseleave', handleMouseLeave)
      btn.removeEventListener('click', handleClick)
      video.removeEventListener('ended', hidePreloader)
      video.removeEventListener('error', hidePreloader)
      document.removeEventListener('keydown', handleKeydown)
      if (animId !== null) cancelAnimationFrame(animId)
    }
  }, [])

  if (!showSplash) return null

  return (
    <div ref={preloaderRef} id="preloader">
      <video ref={videoRef} id="splashVideo" playsInline>
        <source id="splashSource" src="/ozata-apps-web/assets/video/splash_video.mp4" type="video/mp4" />
      </video>
      <canvas ref={canvasRef} id="splashParticleCanvas" />
      <div className="splash-overlay">
        <div className="splash-btn-wrap">
          <button ref={btnRef} id="splashStartBtn" className="splash-btn">
            <i className="fas fa-play"></i>
            <span>SİHİRİ BAŞLAT</span>
          </button>
          <p className="splash-hint">✦ Sihirli an için tıkla ✦</p>
        </div>
      </div>
    </div>
  )
}
