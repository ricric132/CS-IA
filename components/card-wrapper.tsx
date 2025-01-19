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
}: CardWrapperProps) {
  return (
    <Card className="mx-auto w-[930px] border-none  h-[850px] bg-cover grid grid-rows-6"  style={ {backgroundImage:`url('/Images/LoginBox.png')` }}>
      <CardHeader className='row-span-1'>
        <h1 className="text-center text-5xl font-semibold">{header}</h1>
      </CardHeader>
      <CardContent className="px-40 py-0 row-span-4">{children}</CardContent>
      <CardFooter className='row-span-1'>
        <Button variant="link" className="mt-8 w-full font-normal text-2xl" size="sm" asChild>
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
