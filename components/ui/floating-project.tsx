'use client'

import { useState, useEffect, useTransition } from "react"
import { Project, ProjectRole, User } from "@prisma/client"
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
import { CreateProjectJoinRequest, GetProjectOwner } from "@/lib/actions"
import { late } from "zod"
import { Repeat } from "lucide-react"


export function FloatingProject({userid, project, Pause, Unpause, triggerRefresh}) {
    const [nextProject, setNextProject] = useState<Project>()

    const [isChanged, setChanged] = useState(false)
    const [open, setOpen] = useState(false);

    const [isPending, startTransition] = useTransition()

    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    async function SendRequest(){
        setError('')
        setSuccess('')
        startTransition(() => {
            CreateProjectJoinRequest(project.id, userid).then((data) => {
              setError(data?.error)
              setSuccess(data?.success)
              setTimeout(() => {
                setOpen(false)
                triggerRefresh()
              }, 1000);
            })
        }) 
    }
    

    useEffect(() => {
        setError('')
        setSuccess('')
        if(open){
            Pause()
        }
        else{
            Unpause()
        }
    }, [open])


    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>More info</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[80%] pl-40 py-12 bg-cover" style={ {backgroundImage:`url('/images/DialogueShort.png')` }}>
                <div>Project Info</div>
                <div>Name: {project.name}</div>
                <div>Description: {project.description}</div>
                <div>Owner: {project.users[0].user.username}</div>
                <div>Owner Email: {project.users[0].user.email}</div>
                <div className="text-green-600">{success}</div>
                <div className="text-red-600">{error}</div>
                <Button variant="default" onClick={() => SendRequest()}>Send Request</Button>
            </DialogContent>
        </Dialog>
    )
}