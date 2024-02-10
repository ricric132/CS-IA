'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function AuthNavbar() {
  const pathname = usePathname()

  return (
    <div className="md:max-w-7xl max-w-sm mx-auto p-4 flex justify-between text-center">
      <Image
        src="../../vercel.svg"
        height={75}
        width={75}
        alt="Logo"
        className="dark:invert"
      />
      {pathname === '/login' && (
        <Link href="/register">
          <Button variant="ghost" size="sm">
            Sign Up
          </Button>
        </Link>
      )}
      {pathname === '/register' && (
        <Link href="/login">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
        </Link>
      )}
    </div>
  )
}
