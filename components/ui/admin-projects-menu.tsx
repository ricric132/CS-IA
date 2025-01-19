'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import {GetProjectsFromUser, GetPendingProjectsFromUser} from '@/lib/actions'
import { useState, useEffect } from 'react'
import { useTransition } from 'react'
import { ScrollArea } from './scroll-area'
import { JoinProjectButton } from './join-project-code'
import CreateProjectButton from './create-project'
import { GetNotjoinedProjects } from '@/lib/actions'
import { AdminProjectPreview } from './admin-project-preview'

export function AdminProjectMenu({userid}){
    const [projects, setProjects] = useState<{ name: string; id: string; }[]>([]);
    const [notJoinedProjects, setNotJoinedProjects] = useState<{ name: string; id: string; }[]>([]);
    const [isPending, startTransition] = useTransition()
    const { push } = useRouter();
  
    useEffect(() => {
      startTransition(() => {
        GetProjectsFromUser(userid).then((response) => setProjects(response))
        GetNotjoinedProjects(userid).then((response) => setNotJoinedProjects(response)) 
      
      })
    }, []);

    const triggerRefresh = () => {
      console.log("refreshed")
      startTransition(() => {
        GetProjectsFromUser(userid).then((response) => setProjects(response))
        GetNotjoinedProjects(userid).then((response) => setNotJoinedProjects(response)) 
      })
    }
  
    async function selectProject(id:string)
    {
      push('/project/' + id);
    }
    
    return(
        <div className='col-span-3 h-[80vh] w-[65vw] grid grid-rows-10 gap-y-4 p-16 bg-cover' style={ {backgroundImage:`url('/Images/Board.png')` }}>
          <div className='row-span-1'>
            <h2 className="text-4xl font-semibold inline-block">Joined Projects</h2>
            <CreateProjectButton userid={userid} triggerRefresh={triggerRefresh}/>
            <JoinProjectButton userid={userid} triggerRefresh={triggerRefresh}/>
          </div>

          <div className='w-full row-span-4' >
            <ScrollArea className="h-[100%]">
              {projects?.map((project) => (
                <Button type='button' onClick={() => selectProject(project.id)} style={ {backgroundImage:`url('/Images/Button.png')` }} className="w-1/5 h-[200px] mx-5 my-5 bg-contain text-black" key={project.id}>
                  <div>
                      <div className="h-16 text-xl font-semibold">{project.name}</div>
                  </div>
                </Button>
              ))}
            </ScrollArea>
          </div>
          
          <h2 className="text-4xl font-semibold row-span-1 mx-5">All Projects</h2>

          <div className='w-full row-span-4'>
            <ScrollArea className="h-[100%]">
              {notJoinedProjects?.map((project) => ( 
                <Button type='button' onClick={() => console.log("click")} style={ {backgroundImage:`url('/Images/Button.png')` }} className="w-1/5 h-[200px] mx-5 my-5 bg-contain text-black" key={project.id}>
                  <div>
                    <div className="h-16 text-xl font-semibold">{project.name}</div>
                    <AdminProjectPreview userid={userid} project={project} triggerRefresh={triggerRefresh}/>
                  </div>
                </Button>
              ))}
            </ScrollArea>
          </div>
      </div>
    )
}