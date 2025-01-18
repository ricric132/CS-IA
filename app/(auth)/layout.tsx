import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Metadata } from 'next'
import { ReactNode } from 'react'

import AuthNavbar from '../../components/auth-nav'


export const metadata: Metadata = {
  title: 'Authentication | Platforms Starter Kit',
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className = "bg-cover" style={ {backgroundImage:`url('/images/LoginBG.jpg')` }}>
      <div className="mx-auto flex h-full min-h-screen w-full max-w-sm flex-col items-center justify-center md:max-w-7xl bg-cover" >

        <div className="fixed top-0 w-full border-b">
          <AuthNavbar />
        </div>
        {children}
      </div>
    </div>
  )
}
