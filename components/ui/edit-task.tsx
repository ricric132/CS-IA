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
import { Textarea } from "@/components/ui/textarea"
import { useForm } from 'react-hook-form'
import { ProjectSchema, TaskSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import React, { useState } from 'react'
import * as z from 'zod'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { debug } from "console"
import { useTransition } from 'react'
import { EditTask } from '@/lib/actions'
import { useToast } from '@/components/ui/use-toast'
import { useParams, useRouter } from 'next/navigation'
import { getSession } from "next-auth/react"
import { Task } from "@/app/project/[id]/page";
import { Description } from "@radix-ui/react-toast"
import { Calendar } from "./calendar"


export function EditTaskButton({task}) {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      name: task.name,
      description: task.description,
      deadline: task.deadline
    },
  })

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition()

  async function onSubmit(values: z.infer<typeof TaskSchema>) {
    setError('')
    setSuccess('')
    startTransition(() => {
      EditTask(values, task.id).then((data) => {
        setError(data.error)
        setSuccess(data.success)
        if (data.success) {
          toast({
            title: 'Task Updated!',
            description:
              'task ('+ values.name +') has successfully been been updated!',
          })
          setTimeout(() => {
            setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit Task</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[1000px] px-24 bg-cover" style={ {backgroundImage:`url('/images/DialogueTall.png')` }}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    Task Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={task.name}
                      {...field}
                      type="name"
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
                <FormItem>
                  <FormLabel className="text-black">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={task.description}
                      {...field}
                      className="h-40 text-wrap"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
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
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button className="w-full" type="submit">
              <span>Update task</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}