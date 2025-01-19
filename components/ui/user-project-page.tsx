'use client'

import {GetProjectFromID, GetTasksFromProject, GetCompletedTasksFromProject, GetIncompleteTasksFromProject, GetInProgressTasksFromProject} from '@/lib/actions'
import { Button } from "@/components/ui/button"
import { debug } from 'console'
import { useState, useEffect } from 'react'
import {Status} from "@prisma/client";
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import BackButton from '@/components/ui/back-button'
import { Progress } from '@/components/ui/progress'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import ManageMembers from '@/app/manage-members/[id]/page'
import { ProjectRole } from "@prisma/client";

export type Task = {
    id: string;
    projectid: string;
    name: string;
    description: string;
    status: Status;
    deadline: Date;
}

type Project = {
    id: string;
    name: string;
    description: string;
}

type Progress = {
    incomplete: number;
    inProgress: number;
    complete:   number;
}

function UserProject({projectid, userid, role}){
    const [project, setProjects] = useState<Project | null>()

    const [completed, setCompleted] = useState<Task[]>()
    const [inProgress, setInProgress] = useState<Task[]>()
    const [incomplete, setIncomplete] = useState<Task[]>()
    const [progress, setProgress] = useState<number>()

    const [isPending, startTransition] = useTransition()
    const router = useRouter();

    let counter = 0

    useEffect(() => {
        startTransition(() => {
          GetCompletedTasksFromProject(projectid).then((response) => setCompleted(response))
          GetIncompleteTasksFromProject(projectid).then((response) => setIncomplete(response))
          GetInProgressTasksFromProject(projectid).then((response) => setProgress(response))
          GetProjectFromID(projectid).then((response) => setProjects(response))
        })
    },[projectid]);
    
    useEffect(() => {
        if(completed != undefined && incomplete != undefined && incomplete.length != 0){
            setProgress(Math.round(completed.length/(completed.length + incomplete.length) * 100))
        }
    })

    async function tasksMenu()
    {
        router.refresh()
        router.push('/tasksDashboard/' + projectid);
    }

    async function notesMenu()
    {
        router.refresh()
        router.push('/notes/' + projectid);
    }

    async function ManageMembers()
    {
        console.log(role)
        if(role == ProjectRole.ADMIN || role == ProjectRole.OWNER){
            router.refresh()
            router.push('/manage-members/' + projectid);
        }
        else{
            router.refresh()
            router.push('/see-members/' + projectid);
        }
    }

    return (
        <div className='bg-amber-50'>
            <div className='grid grid-cols-10 bg-cover' style={ {backgroundImage:`url('/images/Title.png')`}}>
                <div className='col-span-1 ml-5'>
                    <BackButton />
                </div>
                <h1 className="text-8xl font-bold col-span-8 mt-2 mb-2">{project?.name} Dashboard</h1>
            </div>
            <Separator className='my-7'/>
            <div className='inline-block w-[100%]'>
                <Button type='button' onClick={() => tasksMenu()} style={ {backgroundImage:`url('/images/OpenTasks.png')`}}  className="w-[45%] h-[750px]  bg-cover" >
                    <div>
                        <div className="h-16 text-4xl font-semibold text-black">Tasks Menu</div>
                        <p className='text-black'>complete: {completed?.length}</p>
                        <p className='text-black'>in progress: {inProgress?.length}</p>
                        <p className='text-black'>incomplete: {incomplete?.length}</p>
                        <p className='text-black'>progress: {progress}%</p>
                        <Progress value={progress} className="w-[100%]" />
                    </div>
                </Button>

                <Button type='button' onClick={() => notesMenu()} style={ {backgroundImage:`url('/images/Notes.png')`}} className="w-[20%] h-[275px] align-bottom bg-cover ml-5">
                    <div>
                        <div className="text-2xl font-semibold text-black bg-[#ffe0a3]" >Notes Menu</div>
                    </div>
                </Button>

                <Button type='button' onClick={() => ManageMembers()} style={ {backgroundImage:`url('/images/Manage.png')`}} variant="outline" className="w-[21%] h-[275px] ml-5 align-bottom bg-cover">
                    <div>
                        <div className="h-16 text-xl font-semibold">Manage Project</div>
                    </div>
                </Button>
            </div>
        </div>
    )
}
export default UserProject;