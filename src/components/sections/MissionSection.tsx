'use client'

import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

export function MissionSection() {
  return (
    <section className="mission-section relative py-16 lg:py-24 overflow-hidden">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="w-full bg-black/30 border-border/40 relative overflow-hidden rounded-2xl">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          <div className="max-w-4xl mx-auto text-center relative z-10 p-8 lg:p-16">
            <span className="section-label inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-4">MİSYONUMUZ</span>
            <h2 className="mission-title text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Teknolojiyi <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Herkes İçin</span> Erişilebilir Kılmak
            </h2>
            <p className="mission-desc text-lg text-neutral-300 leading-relaxed max-w-3xl mx-auto">
              Karmaşık iş süreçleri basit çözümlerle yönetilebilir olmalı. Her uygulamamızda pratiklik, güvenilirlik ve kullanıcı odaklılık ilkelerini takip ediyoruz.
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}
