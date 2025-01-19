'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
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
import { UserRole } from '@prisma/client'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function Register() {
  const router = useRouter()
  const { toast } = useToast()

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      password: '',
      role: UserRole.USER,
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
            title: 'Account Created!',
            description:
              'Account has been successfully created redirecting to login...',
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
      header="Create your account"
      backButtonLabel="Already have an account?"
      backButtonHref="/login"
      isPending={isPending}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black dark:text-black">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email..."
                    {...field}
                    type="email"
                    disabled={isPending}
                    className='text-black'
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black dark:text-black">
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
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black dark:text-black">
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
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black dark:text-black">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Re-enter your password..."
                    {...field}
                    type="confirmPassword"
                    disabled={isPending}
                    className='text-black'
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Select your account role</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={UserRole.USER} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Register as a user
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={UserRole.ADMIN} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Register as an admin
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
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
