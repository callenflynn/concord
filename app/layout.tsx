import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Concord SMP',
  description: 'A minecraft server build around community',
    icons: {
    icon: '/image.png', // This points to your image.png in the public directory
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
