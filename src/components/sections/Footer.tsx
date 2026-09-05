'use client'

import Link from 'next/link'
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

export function Footer() {
  return (
    <footer className="footer relative pb-10">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="w-full bg-black/30 border-border/40 relative overflow-hidden rounded-2xl">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          <div className="relative">
            <div className="footer-logo-wrap text-center py-14 lg:py-16">
              <img src="/ozata-apps-web/assets/images/logo.png" alt="OZATA" className="footer-logo w-20 h-20 mx-auto mb-4" />
              <p className="footer-powered text-xs font-medium text-primary/80 tracking-widest uppercase mb-2">POWERED BY OZATA</p>
              <p className="footer-slogan text-sm text-neutral-400 whitespace-pre-line bg-clip-text">
                SİHİR GİBİ PRATİK,<br />GERÇEKÇİ ÇÖZÜMLER
              </p>
            </div>

            <div className="footer-bottom border-t border-neutral-800/80">
              <div className="footer-bottom-container py-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="footer-brand text-center lg:text-left">
                    <span className="footer-brand-name font-heading font-bold text-xl lg:text-2xl bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">OZATA</span>
                    <span className="footer-brand-sub block text-xs font-medium text-primary/80 tracking-widest uppercase mt-1">POWERED BY OZATA</span>
                  </div>

                  <div className="footer-links flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-400">
                    <a href="/ozata-apps-web/privacy.html" className="hover:text-neutral-100 transition-colors">Gizlilik Politikası</a>
                    <Link href="#iletisim" className="hover:text-neutral-100 transition-colors">İletişim</Link>
                  </div>

                  <div className="footer-social flex items-center justify-center gap-4">
                    <a
                      href="https://instagram.com/ozataapps"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                    >
                      <i className="fab fa-instagram" />
                    </a>
                    <a
                      href="https://t.me/ozataapps"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Telegram"
                      className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                    >
                      <i className="fab fa-telegram" />
                    </a>
                  </div>
                </div>

                <div className="footer-copy text-center mt-8 pt-8 border-t border-neutral-800/80">
                  <p className="text-sm text-neutral-500">© 2026 OZATA. Tüm hakları saklıdır.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </footer>
  )
}
