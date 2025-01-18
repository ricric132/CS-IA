'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { useForm } from 'react-hook-form'
import { InviteCodeSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input"
import { FormError } from '../form-error'
import React, { useState } from 'react'
import * as z from 'zod'

import { useTransition } from 'react'
import { JoinProjectCode } from '@/lib/actions'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
 
export function JoinProjectButton({userid, triggerRefresh}) {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof InviteCodeSchema>>({
    resolver: zodResolver(InviteCodeSchema),
    defaultValues: {
      code: ''
    },
  })

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition()

  async function onSubmit(values: z.infer<typeof InviteCodeSchema>) {
    setError('')
    setSuccess('')
    startTransition(() => {
        JoinProjectCode(values, userid).then((data) => {
            setError(data.error)
            setSuccess(data.success)
            if(data.success){
                toast({
                title: 'Note Created!',
                description:
                    'Succesfully joined project'+ data.success,
                })
                setTimeout(() => {
                  setOpen(false);
                  setSuccess('')
                  setError('')
                  form.reset()
                  triggerRefresh()
                }, 1000)
            }
            
        })
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Join Project</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[1000px] px-24 py-10 bg-cover" style={ {backgroundImage:`url('/images/DialogueShort.png')` }}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    Project Invite Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="XXXXXX"
                      {...field}
                      type="code"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormError message={error} />
            <Button className="w-full" type="submit">
              <span>Create Note</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}