'use client'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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
import React, { useEffect, useState } from 'react'
import * as z from 'zod'

import { useTransition } from 'react'
import { EditSubtask } from '@/lib/actions'
import { useToast } from '@/components/ui/use-toast'
import { useParams, useRouter } from 'next/navigation'
import { getSession } from "next-auth/react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Card } from "./card"

function EditSubtaskForm({taskid, subtask}) {
  const router = useRouter()
  const { toast } = useToast()

  let form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      name: subtask.name,
      description: subtask.description,
      deadline: subtask.deadline
    },
    mode:"onChange"
  })

  useEffect(() => {
    form.reset(
      {
        name: subtask.name,
        description: subtask.description,
        deadline: subtask.deadline
      }
    )
  }, [subtask])

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition()

  async function onSubmit(values: z.infer<typeof TaskSchema>) {
    setError('')
    setSuccess('')
    const userid = (await getSession())?.user.id!
    startTransition(() => {
      EditSubtask(values, subtask.id).then((data) => {
        setError(data.error)
        setSuccess(data.success)
        if (data.success) {
         
          setOpen(false);
          toast({
            title: 'Subtask Created!',
            description:
              'Subtask ('+ values.name +') has successfully been been updated!',
          })
          setTimeout(() => {
            setError('')
            setSuccess('')
            //router.refresh()
          }, 1000)
        }
      })
    })
    form.reset({        
        name: values.name,
        description: values.description,
        deadline: values.deadline
      }
    )
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
                    <FormLabel className="text-black ">
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
          <Button className="w-full" type="submit" disabled={!form.formState.isDirty}>
            <span>Save Changes</span>
          </Button>
        </form>
      </Form>
    </Card>
  )
}
export default EditSubtaskForm;
