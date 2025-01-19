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
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import React, { useState } from 'react'
import * as z from 'zod'

import { useTransition } from 'react'
import { DeleteTask } from '@/lib/actions'
import { useToast } from '@/components/ui/use-toast'
import { useParams, useRouter } from 'next/navigation'
import { getSession } from "next-auth/react"
import { Task } from "@/app/project/[id]/page"


 


function DeleteTaskButton({task, closeParent}) {
  const router = useRouter()
  const { toast } = useToast()
  
  const [success, setSuccess] = useState<string | undefined>('')
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition()

  async function ConfirmDeletion() {
    console.log("clicked");
    

    await DeleteTask(task.id)
   
    closeParent()
    setOpen(false);
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Delete Task</Button>
      </DialogTrigger>
      <DialogContent className="w-[1000px] px-[100px] bg-cover" style={ {backgroundImage:`url('/images/DialogueShort.png')` }}>
        <h1>are you sure you want to delete {task.name}?</h1>
        
        <Button onClick={() => ConfirmDeletion()}>confirm</Button>
      </DialogContent>
    </Dialog>
  )
}
export default DeleteTaskButton;