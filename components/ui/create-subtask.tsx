'use client'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Textarea from "@/components/ui/textarea"
import { useForm } from 'react-hook-form'
import { TaskSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input"
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import React, { useState } from 'react'
import * as z from 'zod'

import { useTransition } from 'react'
import { CreateSubtask } from '@/lib/actions'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { getSession } from "next-auth/react"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "./card"

function CreateSubtaskForm({taskid}) {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      name: 'New Task'
    },
  })

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition()

  async function onSubmit(values: z.infer<typeof TaskSchema>) {
    setError('')
    setSuccess('')
    const userid = (await getSession())?.user.id!
    startTransition(() => {
      CreateSubtask(values, userid, taskid).then((data) => {
        setError(data.error)
        setSuccess(data.success)
        if (data.success) {
          setOpen(false);
          toast({
            title: 'Subtask Created!',
            description:
              'Subtask ('+ values.name +') has successfully been been created!',
          })
          setTimeout(() => {
            setError('')
            setSuccess('')
            form.reset()
            router.refresh()
          }, 1000)
        }
      })
    })
  }

  return (
    <Card className="w-[70%] inline-block align-bottom">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <div className="w-[30%] inline-block">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-[100%] inline-block m-[5px]">
                    <FormLabel className="text-black">
                      Subtask Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Task name..."
                        {...field}
                        type="name"
                        //disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-[100%] inline-block align-top m-[5px]">
                    <FormLabel className="text-black">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Give your task a quick description..."
                        {...field}
                        className="h-40 text-wrap"
                        //disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="w-[30%] inline-block align-top">
                  <FormLabel>Deadline</FormLabel>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                      />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" type="submit" /*disabled={isPending}*/>
            <span>Create task</span>
          </Button>
        </form>
      </Form>
    </Card>
  )
}
export default CreateSubtaskForm;
