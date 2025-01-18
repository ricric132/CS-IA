import { motion, useAnimate, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion"
import { useState, useEffect, useTransition } from "react"
import { Project, User } from "@prisma/client"
import { Card } from "./card"
import { Button } from "./button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CreateProjectJoinRequest } from "@/lib/actions"
import { late } from "zod"
import { Repeat } from "lucide-react"
import { JoinProject } from "@/lib/actions"
import { useRouter } from "next/navigation"


export function AdminProjectPreview({userid, project, triggerRefresh}) {
    const router = useRouter()

    const [open, setOpen] = useState(false);

    const [isPending, startTransition] = useTransition()

    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')


    async function JoinButton(){
        setError('')
        setSuccess('')
        startTransition(() => {
            JoinProject(userid, project.id).then((data) => {
                setError(data?.error)
                setSuccess(data?.success)
                if(data.success){
                    setTimeout(() => {
                        setError('')
                        setSuccess('')
                        router.refresh()
                        setOpen(false)
                        triggerRefresh()
                    }, 1000)
                }
            })
        })
    } 

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>More info</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[80%] px-40 py-12 bg-cover" style={ {backgroundImage:`url('/images/DialogueTall.png')` }}>
                <div>Project Info</div>
                <div>Name: {project.name}</div>
                <div>Description: {project.description}</div>
                <div>Owner name: {project.users[0].user.username}</div>
                <div>Owner email: {project.users[0].user.email}</div>
                <div className="text-green-600">{success}</div>
                <div className="text-red-600">{error}</div>
                
                <Button variant="default" onClick={() => JoinButton()}>Join</Button>
            </DialogContent>
        </Dialog>
    )
}