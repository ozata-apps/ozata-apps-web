'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

const comingApps = [
  {
    name: "MedTak",
    desc: "İlaç takibi ve sesli hatırlatma",
    icon: "/ozata-apps-web/assets/icons/medtak-icon.png",
    color: "coming-app-purple"
  },
  {
    name: "CoupleList",
    desc: "Ortak alışveriş listesi",
    icon: "/ozata-apps-web/assets/icons/couplelist-icon.png",
    color: "coming-app-pink"
  },
  {
    name: "Mutfak Günlüğüm",
    desc: "Lezzetli tarifler",
    icon: "/ozata-apps-web/assets/icons/mutfak-icon.png",
    color: "coming-app-orange"
  },
  {
    name: "Eğitim Oyunları",
    desc: "Çocuklar için eğitici",
    icon: null,
    color: "coming-app-blue",
    iconFallback: "fas fa-gamepad"
  },
  {
    name: "Üretim Takip",
    desc: "Üretim süreçleri yönetimi",
    icon: null,
    color: "coming-app-green",
    iconFallback: "fas fa-industry"
  },
  {
    name: "Stok & Montaj",
    desc: "Stok ve montaj takibi",
    icon: null,
    color: "coming-app-cyan",
    iconFallback: "fas fa-boxes"
  },
]

export function ComingSoonSection() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="w-full bg-black/30 border-border/40 relative overflow-hidden rounded-2xl">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          <div className="relative p-8 lg:p-14">
            <div className="coming-content text-center mb-14">
              <span className="section-label-coming inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-4">YENİ UYGULAMALAR YOLDA</span>
              <h2 className="section-title-coming text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                YAKINDA
              </h2>
              <p className="section-desc-coming text-lg text-neutral-300 max-w-2xl mx-auto">
                Sizin için yeni projeler üzerinde çalışıyoruz.
              </p>
            </div>

            <div className="coming-apps-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {comingApps.map((app) => (
                <Card
                  key={app.name}
                  className="coming-app-item group bg-white/[0.03] border-neutral-800/80 hover:border-neutral-600 transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <div className={`coming-app-icon ${app.color} w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      {app.icon ? (
                        <img src={app.icon} alt={app.name} className="w-10 h-10" />
                      ) : (
                        <i className={`${app.iconFallback} text-3xl text-white`} />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-neutral-100 group-hover:text-primary transition-colors">{app.name}</h3>
                    <p className="text-neutral-400">{app.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
