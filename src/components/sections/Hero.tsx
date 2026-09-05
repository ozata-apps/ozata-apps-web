'use client'

import { useEffect, useRef } from 'react'
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Hero() {
  const splineContainerRef = useRef<HTMLDivElement>(null)

  // Robot sabit (fixed) tam ekran arka plan. Canvas pointer-events: none
  // olduğundan gerçek wheel/drag/touch olayları ASLA canvas'a ulaşmaz —
  // scroll ve tıklamalar her zaman sayfaya düşer, robot scroll'la oynamaz.
  // Mouse takibi ise window mousemove → synthetic pointermove ile sağlanır;
  // dispatchEvent hit-test'e takılmadığı için pointer-events: none'a rağmen
  // Spline'in dinleyicisine ulaşır. Robot yalnızca imleci takip eder.
  useEffect(() => {
    const container = splineContainerRef.current
    if (!container) return

    // Spline sahnesi window.scrollY/pageYOffset'i okuyarak robotun pozunu
    // kaydırıyor (bel bükülmesi). Getter'lar 0'a sabitlenir → sayfa normal
    // kayar ama Spline scroll'u hiç görmez, robot pozu değişmez.
    // (Sayfanın gerçek kayması documentElement.scrollTop üzerinden akmaya devam eder.)
    let scrollYDescriptor: PropertyDescriptor | undefined
    let pageYOffsetDescriptor: PropertyDescriptor | undefined
    try {
      scrollYDescriptor = Object.getOwnPropertyDescriptor(window, 'scrollY')
      pageYOffsetDescriptor = Object.getOwnPropertyDescriptor(window, 'pageYOffset')
      Object.defineProperty(window, 'scrollY', { configurable: true, get: () => 0 })
      Object.defineProperty(window, 'pageYOffset', { configurable: true, get: () => 0 })
    } catch { /* defineProperty başarısız olursa eski davranış */ }

    let canvas: HTMLCanvasElement | null = null

    const findCanvas = () => {
      canvas = container.querySelector('canvas')
      if (canvas) {
        canvas.style.pointerEvents = 'none'
        canvas.style.touchAction = 'auto'
      } else {
        setTimeout(findCanvas, 300)
      }
    }
    findCanvas()

    // Son bilinen fare konumu — scroll sırasında robotun pozunu tazelerken kullanılır.
    let lastMouse: { x: number; y: number } | null = null

    const dispatchPointerToCanvas = () => {
      if (!canvas || !lastMouse) return
      canvas.dispatchEvent(new PointerEvent('pointermove', {
        clientX: lastMouse.x,
        clientY: lastMouse.y,
        bubbles: true,
        pointerId: 1,
        pointerType: 'mouse',
        isPrimary: true,
      }))
    }

    const forwardMouseMove = (e: MouseEvent) => {
      lastMouse = { x: e.clientX, y: e.clientY }
      dispatchPointerToCanvas()
    }
    window.addEventListener('mousemove', forwardMouseMove, { passive: true })

    // Scroll sırasında da son fare konumu yeniden bildirilir.
    let scrollRaf: number | null = null
    const handleScroll = () => {
      if (scrollRaf !== null) return
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = null
        dispatchPointerToCanvas()
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', forwardMouseMove)
      window.removeEventListener('scroll', handleScroll)
      if (scrollRaf !== null) cancelAnimationFrame(scrollRaf)
      try {
        if (scrollYDescriptor) Object.defineProperty(window, 'scrollY', scrollYDescriptor)
        if (pageYOffsetDescriptor) Object.defineProperty(window, 'pageYOffset', pageYOffsetDescriptor)
      } catch { /* ignore */ }
    }
  }, [])

  return (
    <section id="hero" className="relative flex items-center justify-center overflow-hidden pt-24 pb-10 lg:pt-28">
      {/* Robot: tüm sayfa boyunca sabit tam ekran arka plan (pointer kapalı) */}
      <div ref={splineContainerRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="w-full min-h-[540px] lg:min-h-[600px] bg-black/30 border-border/40 relative overflow-hidden rounded-2xl">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          <div className="flex h-full flex-col justify-center p-8 lg:p-14 relative z-10">
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-full blur-3xl opacity-50 animate-pulse" />
                <img src="/ozata-apps-web/assets/images/logo.png" alt="OZATA" className="relative w-20 h-20 lg:w-24 lg:h-24" />
              </div>
            </div>
            <p className="text-xs font-medium text-primary/80 tracking-widest uppercase mb-4">POWERED BY OZATA</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              SİHİR GİBİ PRATİK,<br />
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">GERÇEKÇİ ÇÖZÜMLER</span>
            </h1>
            <p className="mt-4 text-lg text-neutral-300 max-w-lg mb-10">
              Akıllı mobil uygulamalar geliştiriyoruz.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a href="/ozata-apps-web/muhasebecim.html">
                <Button className="group relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300">
                  <i className="fab fa-google-play mr-3 text-2xl" />
                  <span>Muhasebecim</span>
                </Button>
              </a>
              <a href="#urunler">
                <Button variant="outline" size="lg" className="group relative overflow-hidden border border-neutral-700 hover:border-neutral-400 hover:bg-white/5 px-8 py-4 rounded-lg font-medium transition-all duration-300">
                  <span>Uygulamaları Keşfet</span>
                  <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
