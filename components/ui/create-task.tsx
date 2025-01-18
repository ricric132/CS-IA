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
import { TaskSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input"
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import React, { useEffect, useState } from 'react'
import * as z from 'zod'

import { useTransition } from 'react'
import { CreateTask } from '@/lib/actions'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { getSession } from "next-auth/react"
import { Calendar } from "./calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import { User } from "@prisma/client"

export function CreateTaskButton({projectid, users}) {
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
  const [userSelectOpen, setUserSelectOpen] = useState(false);

  const [isPending, startTransition] = useTransition()

  

  async function onSubmit(values : z.infer<typeof TaskSchema>) {
    console.log(values.assigned)
    
    setError('')
    setSuccess('')
   
    const userid = (await getSession())?.user.id!
    startTransition(() => {
      CreateTask(values, userid, projectid).then((data) => {
        
        setError(data.error)
        setSuccess(data.success)
        if (data.success) {
          setOpen(false);
          toast({
            title: 'Task Created!',
            description:
              'task ('+ values.name +') has successfully been been created!',
          })
          setTimeout(() => {
            console.log("done")
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
        <Button>Add Task</Button>
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
                      placeholder="Enter Task name..."
                      {...field}
                      type="name"
                      disabled={isPending}
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
                      placeholder="Give your task a quick description..."
                      {...field}
                      className="h-40 text-wrap"
                      disabled={isPending}
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
            <FormField
              control={form.control}
              name="assigned"
              disabled={isPending}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Assigned user</FormLabel>
                  <Popover open={userSelectOpen} onOpenChange={setUserSelectOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? users?.find(
                                (user) => user.id === field.value
                              )?.username    
                            : "Select user"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                        
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search users..." />
                        <CommandList>
                          <CommandEmpty>No users found</CommandEmpty>
                          <CommandGroup>
                            {users?.map((user) => (
                              <CommandItem
                                value={user.username}
                                key={user.id}
                                onSelect={() => {
                                  form.setValue("assigned", user.id)
                                  setUserSelectOpen(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    user.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {user.username}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    This user will be assigned this task and recieve and an email. 
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button className="w-full" type="submit" disabled={isPending}>
              <span>Create task</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}