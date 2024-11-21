'use client'
import { ReactNode } from 'react'

export const CenterLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='fixed justify-center items-center grid w-full h-full'>
      {children}
    </div>
  )
}
