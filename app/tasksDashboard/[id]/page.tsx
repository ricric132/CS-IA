'use client'

import { useEffect, useTransition, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GetFullTasksFromProject, GetProjectFromID, GetUsersFromProject } from '@/lib/actions'
import CreateTaskButton from '@/components/ui/create-task'
import TaskWindow from '@/components/ui/task-info-window'
import BackButton from '@/components/ui/back-button'
import TaskScrollHeader from '@/components/ui/task-scroll-header'
import { Card } from '@/components/ui/card'
import { Task, Project } from "@prisma/client"
import { User } from "@prisma/client"
import { SearchBar } from "@/components/ui/search-bar"



export default function TaskDashboard(params:{
    id : string
}){
    let id = params.params.id as string
    
    const [sortCatagory, setSortCatagory] = useState('deadline')
    const [reverse, setReverse] = useState(false)
    const [tasks, setTasks] = useState<Task[]>()  
    const [searchInput, setSearchInput] = useState("")
    const [project, setProject] = useState<Project | null>()
    const [isPending, startTransition] = useTransition()
    const [users, setUsers] = useState<User[]>()
    
    useEffect(() => {
        startTransition(() => {
            GetProjectFromID(id).then((response) => setProject(response))
            GetUsersFromProject(id).then((response) => setUsers(response))
        })
    }, [])

    useEffect(() => {
        startTransition(() => {
          GetFullTasksFromProject(id).then((response) => SetSortedTasks(response))
        })
    })
    
    const SortByName = () =>
    {
        console.log(sortCatagory)
        if(sortCatagory == 'name')
        {
            setReverse(!reverse)
        }
        else{
            setReverse(false)
        }
        setSortCatagory('name')
          
    }

        
    const SortByDeadline = () =>
    {
        if(sortCatagory == 'deadline')
        {
            setReverse(!reverse)
        }
        else{
            setReverse(false)
        }
        setSortCatagory('deadline')
    }

    function CompareGreater(task1, task2)
    {
        let primary1 = task1.deadline.getTime()
        let primary2 = task2.deadline.getTime()
        let secondary1 = task1.name.toLowerCase()
        let secondary2 = task2.name.toLowerCase()

        if(sortCatagory == 'name'){
            primary1 = task1.name.toLowerCase()
            primary2 = task2.name.toLowerCase()
            secondary1 = task1.deadline.getTime()
            secondary2 = task2.deadline.getTime()
        }

        if(primary1 < primary2){
            if(reverse){
                return true
            }
            return false
        }
        else if(primary1 == primary2 && secondary1 < secondary2)
        {
            if(reverse){
                return true
            }
            return false
        }

        if(reverse){
            return false
        }
        return true
    }

    
    function SetSortedTasks(raw){
        for(let i = 0; i < raw.length; i++){
            let earliest = raw[i]
            let index = i
            for(let j = i+1; j < raw.length; j++){
                if(CompareGreater(raw[j], earliest)){
                    earliest = raw[j]
                    index = j
                }
            }
            let temp = raw[i]
            raw[i] = earliest
            raw[index] = temp
        }

        
        setTasks(raw)
    }

    return(
        <div className="bg-amber-950">
            <div className='mb-5 grid grid-cols-10 bg-white bg-cover' style={ {backgroundImage:`url('/images/Title.png')`}}>
                <div className='col-span-1 ml-5'>
                    <BackButton />
                </div>
                <h1 className="text-8xl font-bold col-span-8 mt-2 mb-2">Tasks Dashboard</h1>
            </div>
            <div className="grid grid-cols-12 gap-3"> 
                <Card className="col-span-4 bg-yellow-50">
                    <CreateTaskButton projectid={id} users={users}/>
                    <SearchBar defaultValue={""} returnValue={setSearchInput}/>
                    <TaskScrollHeader NameSort={SortByName} DeadlineSort={SortByDeadline} />    
                    <ScrollArea className="h-[650px] w-[100%] rounded-md border">
                        {tasks?.map((task) => (
                            <>
                                {task.name.toLowerCase().startsWith(searchInput.toLowerCase()) &&
                                    <div key={task.id} className="bg-cover p-3" style={ {backgroundImage:`url('/images/ThinPanel.png')`}}>
                                        <TaskWindow task = {task}/>
                                    </div>
                                }
                            </>
                        ))}
                    </ScrollArea> 
                </Card>
                <Card className="col-span-8 bg-yellow-50">
                </Card>
            </div>
        </div>
        
    )
}