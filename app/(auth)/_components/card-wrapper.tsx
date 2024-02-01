'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

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
            onClick={() => signIn('google')}
          >
            Google
          </Button>
          <Button
            size="lg"
            className="w-full"
            variant="outline"
            onClick={() => signIn('apple')}
          >
            Apple
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
