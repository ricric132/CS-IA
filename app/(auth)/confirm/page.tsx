'use client'

import Spinner from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { verifyToken } from '@/lib/actions'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState, useTransition, Suspense } from 'react'

export default function Confirm() {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  function onSubmit() {
    startTransition(() => {
      if (!token) {
        router.push('/failure')
        return
      }

      verifyToken(token)
        .then((data) => {
          if (data.error) {
            router.push('/failure')
            return
          }
          if (data.success) {
            router.push(`/success?email=${data.email}`)
          }
        })
        .catch(() => {
          router.push('/failure')
        })
    })
  }

  return (
    
      <Card className="mx-auto w-full max-w-xs md:max-w-7xl py-10 bg-cover" style={ {backgroundImage:`url('/Images/DialogueShort.png')` }}>
        <CardHeader>
          <h1 className="text-center text-2xl font-semibold">
            Email Verification
          </h1>
        </CardHeader>
        <CardContent className="px-6 py-0">
          <div className="flex items-center justify-center text-center">
            <div className="flex flex-col space-y-4">
              <p className="text-sm text-muted-foreground">
                To complete the verification process, please click the button
                below:
              </p>
              <div className="mx-auto w-1/2">
                <Button
                  onClick={() => onSubmit()}
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="mx-auto flex space-x-1">
                      <Spinner /> <span>Verify</span>
                    </div>
                  ) : (
                    'Verify'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent> 
      </Card>
  )
}
