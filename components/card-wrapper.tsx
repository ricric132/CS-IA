'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

interface CardWrapperProps {
  children: React.ReactNode
  header: string
  backButtonLabel: string
  backButtonHref: string
  showOAuth?: boolean
  isPending?: boolean
}

export function CardWrapper({
  children,
  header,
  backButtonLabel,
  backButtonHref,
  showOAuth,
  isPending,
}: CardWrapperProps) {
  function onClick(provider: 'google' | 'github') {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <Card className="mx-auto border-none w-full max-w-xs md:max-w-md">
      <CardHeader>
        <h1 className="text-center text-3xl font-semibold">{header}</h1>
      </CardHeader>
      <CardContent className="px-6 py-0">{children}</CardContent>
      <Separator className="mx-auto my-4 w-[90%] justify-center md:w-[95%]" />
      {showOAuth && (
        <CardFooter>
          <div className="flex w-full items-center gap-x-2">
            <Button
              size="lg"
              className="w-full"
              variant="outline"
              onClick={() => onClick('google')}
              disabled={isPending}
            >
              Google
            </Button>
            <Button
              size="lg"
              className="w-full"
              variant="outline"
              onClick={() => onClick('github')}
              disabled={isPending}
            >
              GitHub
            </Button>
          </div>
        </CardFooter>
      )}
      <CardFooter>
        <Button variant="link" className="w-full font-normal" size="sm" asChild>
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
