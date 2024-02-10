'use client'

import Spinner from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { verifyToken } from '@/lib/actions'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState, useTransition } from 'react'

export default function Confirm() {
  return (
    <Card className="mx-auto w-full max-w-xs border-none shadow-md md:max-w-7xl">
      <CardHeader>
        <h1 className="text-center text-2xl font-semibold">
          Verification Failed
        </h1>
      </CardHeader>
      <CardContent className="px-6 py-0">
        <div className="flex flex-col space-y-4 items-center justify-center text-center">
          <p className="text-sm text-muted-foreground">
            It looks like you may have clicked on an invalid email verification
            link. Please close this window and try authenticating again.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
