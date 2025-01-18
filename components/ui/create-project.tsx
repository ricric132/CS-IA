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
import { ProjectSchema } from '@/schemas'
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
import { CreateProject } from '@/lib/actions'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
 
const lessons = ["maths", "physics", "chemistry", "biology"]

export function CreateProjectButton({userid, triggerRefresh}) {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: 'New project'
    },
  })

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition()

  async function onSubmit(values: z.infer<typeof ProjectSchema>) {
    setError('')
    setSuccess('')
    startTransition(() => {
      CreateProject(values, userid).then((data) => {
        setError(data.error)
        setSuccess(data.success)
        if (data.success) {
          toast({
            title: 'Project Created!',
            description:
              'project ('+ values.name +') has successfully been been created!',
          })
          setTimeout(() => {
            setOpen(false);
            setError('')
            setSuccess('')
            form.reset()
            triggerRefresh()
            router.refresh()
          }, 1000)
        }
      })
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Project</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[1000px] px-40 py-12 bg-cover" style={ {backgroundImage:`url('/images/DialogueTall.png')` }}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    Project Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter project name..."
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
                      placeholder="Give your project a quick description..."
                      {...field}
                      className="h-40 text-wrap"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button className="w-full" type="submit">
              <span>Create project</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}