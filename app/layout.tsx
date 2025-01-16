import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "next-themes";


// React Chart Component
import { AgCharts } from 'ag-charts-react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hábitos de jugadores y la ansiedad',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
