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
import { useState, useEffect } from 'react'
import * as z from 'zod'

 
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { debug } from "console"
import { useTransition } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { getSession } from "next-auth/react"
import { Task } from "@/app/project/[id]/page";
import { EditTaskButton } from '@/components/ui/edit-task'
import { DeleteTaskButton } from '@/components/ui/delete-task'
import { Checkbox } from "@/components/ui/checkbox"
import { UpdateTaskStatus, GetSubtasks } from "@/lib/actions"
import { Status, Subtask } from "@prisma/client"
import { CreateSubtaskForm } from "./create-subtask"
import { Card } from "./card"
import { SubtaskListItem } from "./subtask-list-item"
import { TaskScrollHeader } from "./task-scroll-header"
import { sub } from "date-fns"
import { SubtaskPanel } from "./subtask-panel"
import { useSelectRange } from "react-day-picker"
import { User } from "@prisma/client"
import { GetUserByID } from "@/lib/actions"

export function TaskWindow({task}) {
  const [open, setOpen] = useState(false);
  const router = useRouter()
  const { toast } = useToast()

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
 
  const [checked, setChecked] = useState<boolean>(task.status == Status.COMPLETE)
  const [isAddingSubtask, setIsAddingSubtask] = useState<boolean>(false)

  const [subtasks, setSubtasks] = useState<Subtask[]>(task.subtasks)

  const [sortCatagory, setSortCatagory] = useState<String>('deadline')
  const [reverse, setReverse] = useState<boolean>(false)

  const [selectedSubtask, setSelectedSubtask] = useState<Subtask>()
  const [assigned, setAssigned] = useState<User>()

  function SetSortedSubtasks(raw: Subtask[]){
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

    if(raw != subtasks){
        setSubtasks(raw)
    }


    return
  }


  const SortByName = () => 
  {
      if(sortCatagory == 'name')
      {
          setReverse(!reverse)
      }
      else{
          setReverse(false)
      }
      setSortCatagory('name');
          
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
      setSortCatagory('deadline');
  }

  function CompareGreater(task1, task2){
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

  useEffect(() => {
    setChecked(task.status == Status.COMPLETE)
  }, []);

  useEffect(() => {
    startTransition(() =>{
        GetSubtasks(task.id).then((response) => SetSortedSubtasks(response))  
    })
  }, [subtasks])

  const closeWindow = () =>{
    setOpen(false);
  }

  const [isPending, startTransition] = useTransition()

  async function ToggleChecked() {
    const newChecked = !checked
    setChecked(newChecked)
    await UpdateTaskStatus({taskID:task.id , status:newChecked})

  }

  function ToggleAddSubtask(newState){
    setIsAddingSubtask(newState)
    setSelectedSubtask(undefined)
  }

  const selectSubTask = (subtask) => {
    setSelectedSubtask(subtask)
    setIsAddingSubtask(false)
  }

  
  return (
    <div className="grid grid-cols-12 gap-1">
      <Checkbox id={task.id} onCheckedChange={(e) => ToggleChecked()} checked={checked} className="col-span-1 ml-2 mt-2"/>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="link" className="col-span-5 justify-start">{task.name}</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[90%] px-24 bg-cover" style={ {backgroundImage:`url('/images/DialogueTall.png')` }}>
          <h1 className="text-4xl font-bold">{task.name}</h1>
          <EditTaskButton task = {task}/>
          <DeleteTaskButton task = {task} closeParent={closeWindow}/>
          <Separator className="bg-black"/>
          <div>
            <Card className="w-[30%] h-[650px] inline-block">
              <p>deadline: {task.deadline.toLocaleDateString()}</p>
              <p className="text-wrap break-words">description: {task.description}</p>
              <div>
                <p>status</p>
                <Checkbox id="terms" onCheckedChange={(e) => ToggleChecked()} checked={checked}/>
              </div>
              <Separator className="my-[20px] bg-black"/>
              <p className="text-xl font-bold">Subtask</p>
              <TaskScrollHeader NameSort={SortByName} DeadlineSort={SortByDeadline} />    
              <ScrollArea className="h-[450px] w-[100%] rounded-md border border-zinc-950">
                {subtasks?.map((subtask) => (
                    <div key={subtask.id}>
                        <SubtaskListItem subtask={subtask} selectFunction={selectSubTask}/>
                        <Separator className="my-2 bg-black"/>
                    </div>
                ))}
              </ScrollArea>
              <Button className="w-[50%]" onClick={() => ToggleAddSubtask(true)}>add subtask</Button>
            </Card>
            
            <SubtaskPanel isAdding={isAddingSubtask} taskid={task.id} subtask={selectedSubtask}/>
          </div>
        </DialogContent>
      </Dialog>

      
      <div className="col-span-3">{task.assigned?.username}</div>  
      <div className="col-span-3">{task.deadline.toLocaleDateString()}</div>
    </div>
  )
}