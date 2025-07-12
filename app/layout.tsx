import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Concord SMP',
  description: 'A minecraft server build around community',
  icons: {
    // This path is correct IF image.png is directly inside the 'public' directory
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
