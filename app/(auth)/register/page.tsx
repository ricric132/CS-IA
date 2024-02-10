'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { register } from '@/lib/actions'
import { RegisterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { CardWrapper } from '../../../components/card-wrapper'
import { FormError } from '../../../components/form-error'
import { FormSuccess } from '../../../components/form-success'

export default function Register() {
  const router = useRouter()
  const { toast } = useToast()

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setError('')
    setSuccess('')
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error)
        setSuccess(data.success)
        if (data.success) {
          toast({
            title: 'Verification email sent!',
            description:
              'Verificaiton email successfully sent! Please check your inbox.',
          })
          setTimeout(() => {
            router.push('/login')
          }, 3000)
        }
      })
    })
  }

  return (
    <CardWrapper
      header="Create your Scaffold account"
      backButtonLabel="Already have an account?"
      backButtonHref="/login"
      showOAuth
      isPending={isPending}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black dark:text-white">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email address..."
                    {...field}
                    type="email"
                    disabled={isPending}
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
                <FormLabel className="text-black dark:text-white">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password..."
                    {...field}
                    type="password"
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" type="submit" disabled={isPending}>
            <span>Create an account</span>
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
