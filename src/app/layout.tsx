import './globals.css'
import { Inter } from 'next/font/google'
import { ToastProvider } from '@/components/ui/ToastProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Head from 'next/head'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AutoChart - Smart on FHIR App',
  description: 'A modern Smart on FHIR app for efficient patient charting',
  manifest: '/manifest.json',
  icons: [
    { rel: 'apple-touch-icon', url: '/icons/icon-192x192.png' },
  ],
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow animate-fadeIn">
              {children}
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </body>
    </html>
  )
}
