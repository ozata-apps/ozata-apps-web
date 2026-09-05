'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

const whyItems = [
  {
    icon: "fas fa-shield-alt",
    title: "Güvenli",
    desc: "Verileriniz Google Drive'da güvenle saklanır ve yedeklenir."
  },
  {
    icon: "fas fa-mobile-screen",
    title: "Modern",
    desc: "Son teknolojilerle tasarlanmış şık arayüz."
  },
  {
    icon: "fas fa-bolt",
    title: "Hızlı",
    desc: "Milisaniyeler içinde yanıt veren altyapı."
  },
  {
    icon: "fas fa-sync-alt",
    title: "Bulut Senkronizasyonu",
    desc: "Tüm cihazlarınızda anlık senkronizasyon."
  },
]

export function WhySection() {
  return (
    <section id="hakkimizda" className="why-section relative py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="w-full bg-black/30 border-border/40 relative overflow-hidden rounded-2xl">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          <div className="relative p-8 lg:p-14">
            <div className="text-center mb-14">
              <span className="section-label inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-4">NEDEN OZATA</span>
              <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Her Detayda Mükemmellik
              </h2>
            </div>

            <div className="why-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyItems.map((item) => (
                <Card
                  key={item.title}
                  className="why-card group bg-white/[0.03] border-neutral-800/80 hover:border-neutral-600 transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <div className="why-icon w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <i className={`${item.icon} text-2xl text-primary`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-neutral-100">{item.title}</h3>
                    <p className="text-neutral-400">{item.desc}</p>
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
