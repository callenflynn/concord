import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Concord SMP',
  description: 'A minecraft server built around community',
  icons: {
    icon: '/image.png', 
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
