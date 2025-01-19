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
import { Separator } from '@/components/ui/separator'
import { login, UpdatePassword } from '@/lib/actions'
import { PasswordChangeSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
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
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

function EditPassword({userID}) {
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

    const form = useForm<z.infer<typeof PasswordChangeSchema>>({
        resolver: zodResolver(PasswordChangeSchema),
        defaultValues: {
        newPassword: '',
        password: '',
        },
    })

    async function onSubmit(values: z.infer<typeof PasswordChangeSchema>) {
        setError('')
        setSuccess('')
        startTransition(() => {
        UpdatePassword({values, user}).then((data) => {
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
                <Button>Change Password</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[80%] px-24 py-10 bg-cover" style={ {backgroundImage:`url('/images/DialogueShort.png')` }}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-black">
                            Old Password
                            </FormLabel>
                            <FormControl>
                            <Input
                                placeholder="Old Password..."
                                {...field}
                                type="password"
                            />
                            </FormControl>
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-black">
                            New Password
                            </FormLabel>
                            <FormControl>
                            <Input
                                placeholder="Enter your new password..."
                                {...field}
                                type="newPassword"
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
export default EditPassword;