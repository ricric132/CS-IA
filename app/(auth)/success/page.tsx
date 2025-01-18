'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'

export default function Success() {
  const router = useRouter()

  return (
    <Card className="mx-auto w-full max-w-xs border-none shadow-md md:max-w-7xl">
      <CardHeader>
        <h1 className="text-center text-2xl font-semibold">
          Sign Up Successful
        </h1>
      </CardHeader>
      <CardContent className="px-6 py-0">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
        </div>
      </CardContent>
    </Card>
  )
}
