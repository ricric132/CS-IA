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
}

export const CardWrapper = ({
  children,
  header,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) => {
  function onClick(provider: 'google' | 'github') {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <Card className="mx-auto w-full max-w-xs border-none shadow-md md:max-w-3xl">
      <CardHeader>
        <h1 className="text-center text-3xl font-semibold">{header}</h1>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <Separator className="w-full" />
      <CardFooter className="mt-4">
        <div className="flex w-full items-center gap-x-2">
          <Button
            size="lg"
            className="w-full"
            variant="outline"
            onClick={() => onClick('google')}
          >
            Google
          </Button>
          <Button
            size="lg"
            className="w-full"
            variant="outline"
            onClick={() => onClick('github')}
          >
            GitHub
          </Button>
        </div>
      </CardFooter>
      <CardFooter>
        <Button variant="link" className="w-full font-normal" size="sm" asChild>
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
