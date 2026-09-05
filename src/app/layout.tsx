import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "OZATA Apps",
  description: "Interactive 3D experiences",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" type="image/png" href="/ozata-apps-web/assets/images/logo.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Almendra:wght@400;700&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  )
}