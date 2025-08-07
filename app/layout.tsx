import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: '로또 번호 추출기',
  description: '로또 번호 추출기',
  generator: 'kimtg-tech',
  icons: {
    icon: '/favicon.ico',                    // 기본 favicon
    apple: '/apple-icon.png',               // iOS 홈 화면 아이콘
    shortcut: '/favicon-16x16.png',         // 단축 아이콘
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
