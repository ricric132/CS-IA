'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function AuthNavbar() {
  const pathname = usePathname()

  return (
    <div className="mx-auto flex max-w-sm justify-between p-4 text-right md:max-w-7xl">
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
