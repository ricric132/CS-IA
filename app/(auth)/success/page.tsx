'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export default function Success() {
  const router = useRouter()

  const searchParams = useSearchParams()

  const email = searchParams.get('email')

  return (
    <Card className="mx-auto w-full max-w-xs border-none shadow-md md:max-w-7xl">
      <CardHeader>
        <h1 className="text-center text-2xl font-semibold">
          Sign Up Successful
        </h1>
      </CardHeader>
      <CardContent className="px-6 py-0">
        <div className="flex flex-col space-y-4 items-center justify-center text-center">
          <p className="text-sm text-muted-foreground">
            {email ? email : 'Your email'} was verified. You may close this
            window
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
