'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { login } from '@/lib/actions'
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useTransition, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { CardWrapper } from '../../../components/card-wrapper'
import { FormError } from '../../../components/form-error'
import { FormSuccess } from '../../../components/form-success'
import bgImage from '../../../images/LoginBG.jpg'

export default function Login() {

  const [session, setSession] = useState<any>()

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const { push } = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError('')
    setSuccess('')
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error)
        // setSuccess(data?.success)
      })
    })
  }

  return (
    <CardWrapper
      header="Log in"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
      isPending={isPending}
      
    >
    
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black dark:text-black text-2xl">
                  Username
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your username..."
                    {...field}
                    type="username"
                    disabled={isPending}
                    className='text-black'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black dark:text-black text-2xl">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password..."
                    {...field}
                    type="password"
                    disabled={isPending}
                    className='text-black'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" type="submit" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
    
  )
}
