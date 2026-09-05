'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export function ProductSection() {
  return (
    <section id="urunler" className="relative py-16 lg:py-24 overflow-hidden">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="w-full bg-black/30 border-border/40 relative overflow-hidden rounded-2xl">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center p-8 lg:p-14 relative z-10">
            <div className="product-text">
              <span className="product-label inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-4">FİNANS</span>
              <h2 className="product-title text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Muhasebecim
              </h2>
              <p className="product-desc text-lg text-neutral-300 mb-8 max-w-lg">
                Gelir ve giderlerinizi kolayca yönetin. Finansal özgürlüğe giden yolda sizinle birlikte.
              </p>
              <div className="product-buttons flex flex-col sm:flex-row gap-4">
                <a href="/ozata-apps-web/muhasebecim.html">
                  <Button className="btn-google magnetic group relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 w-full sm:w-auto">
                    <i className="fab fa-google-play mr-3 text-2xl" />
                    <span>Google Play</span>
                  </Button>
                </a>
                <a href="/ozata-apps-web/muhasebecim.html">
                  <Button variant="outline" size="lg" className="btn-outline magnetic group relative overflow-hidden border border-neutral-700 hover:border-neutral-400 hover:bg-white/5 px-8 py-4 rounded-lg font-medium transition-all duration-300 w-full sm:w-auto">
                    Detaylı incele
                  </Button>
                </a>
              </div>
            </div>

            <div className="product-visual relative">
              <Card className="phone-mockup phone-hover bg-transparent border-primary/20 shadow-2xl overflow-hidden rounded-2xl">
                <div className="phone-notch absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-background rounded-b-lg z-10" />
                <CardContent className="p-0 phone-screen relative">
                  <img
                    src="/ozata-apps-web/assets/images/muhasebecim-screenshot.png"
                    alt="Muhasebecim Ekranı"
                    className="app-screenshot w-full h-full object-cover object-top"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
