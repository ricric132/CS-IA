'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
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
import { NoteSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input"
import { FormError } from '../form-error'
import React, { useState } from 'react'
import * as z from 'zod'

 
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { debug } from "console"
import { useTransition } from 'react'
import { CreateNote } from '@/lib/actions'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
 
function CreateNoteButton({projectid}) {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      name: 'New note'
    },
  })

  const [error, setError] = useState<string | undefined>('')
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition()

  async function onSubmit(values: z.infer<typeof NoteSchema>) {
    startTransition(() => {
        CreateNote(projectid, values.name).then((data) => {
            toast({
            title: 'Note Created!',
            description:
                'note ('+ values.name +') has successfully been been created!',
            })
            setTimeout(() => {
                setOpen(false);
                form.reset()
            }, 1000)
        })
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Note</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[1000px] px-24 py-10" style={ {backgroundImage:`url('/images/DialogueShort.png')` }}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    Note name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter note name..."
                      {...field}
                      type="name"
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
export default CreateNoteButton;