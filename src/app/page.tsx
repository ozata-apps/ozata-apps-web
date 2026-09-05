'use client'

import { Navbar } from "@/components/sections/Navbar"
import { Hero } from "@/components/sections/Hero"
import { ProductSection } from "@/components/sections/ProductSection"
import { ComingSoonSection } from "@/components/sections/ComingSoonSection"
import { WhySection } from "@/components/sections/WhySection"
import { MissionSection } from "@/components/sections/MissionSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { Footer } from "@/components/sections/Footer"
import { SplashPreloader } from "@/components/sections/SplashPreloader"
import { CursorGlow } from "@/components/sections/CursorGlow"

export default function Home() {
  return (
    <>
      <SplashPreloader />
      <CursorGlow />
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        <Hero />
        <ProductSection />
        <ComingSoonSection />
        <WhySection />
        <MissionSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}