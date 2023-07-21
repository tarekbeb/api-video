'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 60}}>
        <header style={{display: 'flex', gap: 15, alignSelf: 'flex-start', marginBottom: 30}}>
          <Link href="/">Upload a video</Link>
					{/* We use the router here to revalidate our videos data on each page load */}
          <div style={{ cursor: 'pointer' }} onClick={() => router.push('/videos')}>Videos list</div>
          <div style={{ cursor: 'pointer' }} onClick={() => router.push('/live')}>Go Live</div>
        </header>
        {children}
      </body>
    </html>
  )
}