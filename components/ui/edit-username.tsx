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
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useTransition, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { User } from '@prisma/client'
import { GetUserByID } from '@/lib/actions'
import { UpdateUsername } from '@/lib/actions'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"

function EditUsername({userID}) {
    const [open, setOpen] = useState(false);
    const [session, setSession] = useState<any>()
    const searchParams = useSearchParams()

    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const [isPending, startTransition] = useTransition()

    const { push } = useRouter();

    const [user, setUser] = useState<User | null>()

    useEffect(() => {
        startTransition(() => {
            GetUserByID({userID}).then((response) => setUser(response)) 
        })
    }, []);

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
        UpdateUsername({values, user}).then((data) => {
            setError(data?.error)
            setSuccess(data?.success)
            if(data.success){
                setTimeout(() => {
                    setError('')
                    setSuccess('')
                    form.reset()
                    setOpen(false)
                }, 1000)
            }
        })
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Change Username</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[80%] px-24 py-10 bg-cover" style={ {backgroundImage:`url('/Images/DialogueShort.png')` }}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-black">
                            New username
                            </FormLabel>
                            <FormControl>
                            <Input
                                placeholder="Enter your new username..."
                                {...field}
                                type="username"
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
                            <FormLabel className="text-black">
                            Password
                            </FormLabel>
                            <FormControl>
                            <Input
                                placeholder="Enter your password..."
                                {...field}
                                type="password"
                            />
                            </FormControl>
                        </FormItem>
                        )}
                    />
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button className="w-full" type="submit">
                        Confirm
                    </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default EditUsername;