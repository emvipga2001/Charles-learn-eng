import React from 'react'

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className='min-h-[90svh] flex items-center'>
        {children}
    </div>
  )
}
