'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  useEffect(() => { const handleScroll = () => setScrolled((document.documentElement.scrollTop || document.body.scrollTop) > 20); window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll) }, [])
  const navLinks = [{ href: '#urunler', label: 'Uygulamalar' }, { href: '#hakkimizda', label: 'Hakkımızda' }, { href: '#iletisim', label: 'İletişim' }]
  return (
    <nav className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', scrolled ? 'bg-black/80 backdrop-blur-md border-b border-neutral-800' : 'bg-transparent')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2"><span className="font-heading font-bold text-xl lg:text-2xl bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">OZATA</span></Link>
          <div className={cn('hidden lg:flex items-center gap-8', mobileMenuOpen && 'lg:hidden')}>
            <nav className="flex items-center gap-6">{navLinks.map((link) => (<Link key={link.href} href={link.href} className="text-sm font-medium text-neutral-400 hover:text-neutral-100 transition-colors">{link.label}</Link>))}</nav>
            <Link href="#urunler"><Button variant="outline" size="sm" className="hidden sm:inline-flex border-neutral-700 hover:bg-white/5 hover:text-neutral-100 hover:border-neutral-400">İndir</Button></Link>
          </div>
          <div className="flex items-center gap-4 lg:hidden">
            <Link href="#urunler"><Button variant="outline" size="sm" className="hidden sm:inline-flex border-neutral-700 hover:bg-white/5 hover:text-neutral-100 hover:border-neutral-400">İndir</Button></Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg hover:bg-white/10 text-neutral-200 transition-colors" aria-label="Menü" aria-expanded={mobileMenuOpen}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}</svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (<div className="lg:hidden py-4 border-t border-neutral-800 bg-black/90 backdrop-blur-md animate-slide-down"><nav className="flex flex-col gap-4 px-2">{navLinks.map((link) => (<Link key={link.href} href={link.href} className="text-base font-medium text-neutral-400 hover:text-neutral-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>{link.label}</Link>))}<Link href="#urunler" onClick={() => setMobileMenuOpen(false)}><Button className="w-full justify-start">İndir</Button></Link></nav></div>)}
      </div>
      <style jsx>{`@keyframes slide-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } } .animate-slide-down { animation: slide-down 0.2s ease-out; }`}</style>
    </nav>
  )
}
