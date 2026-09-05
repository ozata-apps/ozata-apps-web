'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    emailjs: {
      init: (config: { publicKey: string }) => void
      sendForm: (serviceId: string, templateId: string, form: HTMLFormElement) => Promise<{ status: number }>
    }
  }
}

export function ContactSection() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formMessage, setFormMessage] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.emailjs) {
      window.emailjs.init({
        publicKey: "OvTz3Iuh_cncLLF2Q",
      });
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    setFormStatus('sending')
    setFormMessage('')

    try {
      const response = await window.emailjs.sendForm(
        'service_ozata',
        'template_contact',
        formRef.current
      )

      if (response.status === 200) {
        setFormStatus('success')
        setFormMessage('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.')
        formRef.current.reset()
      } else {
        throw new Error('Gönderim başarısız')
      }
    } catch (error) {
      setFormStatus('error')
      setFormMessage('Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin veya doğrudan e-posta ile iletişime geçin.')
    }
  }

  return (
    <section id="iletisim" className="contact-section relative py-16 lg:py-24 overflow-hidden">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="w-full bg-black/30 border-border/40 relative overflow-hidden rounded-2xl">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          <div className="relative p-8 lg:p-14">
            <div className="text-center mb-14">
              <span className="section-label inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-4">İLETİŞİM</span>
              <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Bizimle İletişime Geçin
              </h2>
            </div>

            <div className="contact-grid grid lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="contact-info space-y-8">
                <div className="space-y-6">
                  <div className="contact-item flex items-start gap-4">
                    <div className="contact-icon w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-envelope text-xl text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-neutral-100">E-posta</h4>
                      <p className="text-neutral-400">ozata.apps@gmail.com</p>
                    </div>
                  </div>
                  <div className="contact-item flex items-start gap-4">
                    <div className="contact-icon w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-map-marker-alt text-xl text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-neutral-100">Konum</h4>
                      <p className="text-neutral-400">Türkiye</p>
                    </div>
                  </div>
                  <div className="contact-item flex items-start gap-4">
                    <div className="contact-icon w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-clock text-xl text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-neutral-100">Çalışma Saatleri</h4>
                      <p className="text-neutral-400">Pzt - Cuma: 09:00 - 18:00</p>
                    </div>
                  </div>
                </div>

                <div className="social-links flex gap-4 pt-4">
                  <a
                    href="https://instagram.com/ozataapps"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                  >
                    <i className="fab fa-instagram text-xl" />
                  </a>
                  <a
                    href="https://t.me/ozataapps"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram"
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                  >
                    <i className="fab fa-telegram text-xl" />
                  </a>
                </div>
              </div>

              <Card className="contact-form-card bg-white/[0.03] border-neutral-800/80">
                <CardContent className="p-8">
                  <form ref={formRef} id="contactForm" onSubmit={handleSubmit} className="space-y-6">
                    <input type="hidden" name="source" id="formSource" value="OZATA Web Sitesi" />

                    <div className="form-row grid sm:grid-cols-2 gap-6">
                      <div className="form-group">
                        <label className="block text-sm font-medium mb-2 text-neutral-200">Adınız</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full px-4 py-3 rounded-lg bg-transparent border border-neutral-700 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                        />
                      </div>

                      <div className="form-group">
                        <label className="block text-sm font-medium mb-2 text-neutral-200">E-posta</label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 rounded-lg bg-transparent border border-neutral-700 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="block text-sm font-medium mb-2 text-neutral-200">Konu</label>
                      <select
                        name="subject"
                        required
                        defaultValue=""
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-neutral-700 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors [&>option]:bg-neutral-900"
                      >
                        <option value="" disabled>Size nasıl yardımcı olabiliriz?</option>
                        <option value="Özellik önerisi">💡 Özellik önerisi</option>
                        <option value="Hata bildirimi">🐞 Hata bildirimi</option>
                        <option value="Memnuniyet">❤️ Memnuniyet</option>
                        <option value="Şikayet">😕 Şikayet</option>
                        <option value="Diğer">❓ Diğer</option>
                      </select>
                    </div>

                    <div className="form-group">
                       <label className="block text-sm font-medium mb-2 text-neutral-200">Mesajınız</label>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-transparent border border-neutral-700 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="btn-submit magnetic group relative overflow-hidden w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300"
                      disabled={formStatus === 'sending'}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {formStatus === 'sending' ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Gönderiliyor...
                          </>
                        ) : (
                          <>
                            <span>Mesaj Gönder</span>
                            <i className="fas fa-paper-plane group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </Button>

                    {formMessage && (
                      <div id="formMessage" className={`form-message text-center p-4 rounded-lg ${
                        formStatus === 'success'
                          ? 'bg-green-900/30 text-green-400 border border-green-500/30'
                          : 'bg-red-900/30 text-red-400 border border-red-500/30'
                      }`}>
                        {formMessage}
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
