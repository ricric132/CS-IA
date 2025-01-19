'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import {GetProjectsFromUser, GetPendingProjectsFromUser, GetNotjoinedProjects} from '@/lib/actions'
import { useState, useEffect } from 'react'
import { useTransition } from 'react'
import { ScrollArea } from './scroll-area'
import { JoinProjectButton } from './join-project-code'
import { Card } from './card'
import { useMotionValueEvent, useTime} from "framer-motion";
import { useRef } from 'react'
import { Project } from '@prisma/client'
import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import { Separator } from "./separator";
import FloatingProject from '@/components/ui/floating-project'


function ProjectMenu({userid}){
    const [projects, setProjects] = useState<{ name: string; id: string; }[]>([]);
    const [pendingProjects, setPendingProjects] = useState<{ name: string; id: string; }[]>([]);
    const [isPending, startTransition] = useTransition()
    const { push } = useRouter();
  
    useEffect(() => {
      startTransition(() => {
        GetProjectsFromUser(userid).then((response) => setProjects(response))
        GetPendingProjectsFromUser(userid).then((response) => setPendingProjects(response))
      })
    }, []);

    const triggerRefresh = () => {
      startTransition(() => {
        GetProjectsFromUser(userid).then((response) => setProjects(response))
        GetPendingProjectsFromUser(userid).then((response) => setPendingProjects(response))
      })
    }
  
    async function selectProject(id:string)
    {
      push('/project/' + id);
    }

    const router = useRouter()
    const [paused, setPaused] = useState(false)
    const [scrollProjects, setScrollProjects] = useState<Project[]>([])

    const baseTime = useTime()
    let savedTime = 0
 
    const viewportRef = useRef<React.ElementRef<typeof RadixScrollArea.Viewport>>(null);

    useMotionValueEvent(baseTime, "change", (latest) =>{
        if(paused){
            return
        }
        if(viewportRef.current){
          const reversed = Math.floor((latest/10)/(viewportRef.current.scrollHeight-700))%2 == 1
          if(reversed){
              viewportRef.current.scrollTop = (viewportRef.current.scrollHeight-700) - (latest/10)%(viewportRef.current.scrollHeight-700)
          }
          else{
              viewportRef.current.scrollTop = (latest/10)%(viewportRef.current.scrollHeight-700)
          }
        }
    })

    useEffect(() => {
        startTransition(() => {
          GetNotjoinedProjects(userid).then((response) => setScrollProjects(response))
        })
    }, []);

    const Pause = () =>{
        if(paused){
            return
        }
        savedTime = baseTime.getPrevious()!
        setPaused(true)
    }
    

    const Continue = () => {
        if(!paused){
            return
        }
        
        setPaused(false)
        baseTime.set(savedTime)
    }
    
    return(
      <div className='grid grid-cols-5 gap-2 h-[80vh]'>
        <div className='col-span-3 grid grid-rows-10 gap-y-4 px-12 py-16 bg-cover' style={ {backgroundImage:`url('/Images/BoardThiner.png')` }}>
          
          <div className='row-span-1'>
            <h2 className="text-4xl font-semibold inline-block">Joined Projects</h2>
            <JoinProjectButton userid={userid} triggerRefresh={triggerRefresh}/>
          </div>

          <div className='w-full row-span-4'>
            <ScrollArea>
              {projects?.map((project) => (
                <Button type='button' onClick={() => selectProject(project.id)} style={ {backgroundImage:`url('/Images/Button.png')` }} className="w-1/5 h-[190px] mx-5 my-5 bg-contain text-black" key={project.id}>
                  <div>
                      <div className="h-16 text-xl font-semibold">{project.name}</div>
                  </div>
                </Button>
              ))}
            </ScrollArea>
          </div>
          
          <h2 className="text-4xl font-semibold row-span-1 ml-3"> Pending Project</h2>
          <div className='w-full row-span-4'>
            <ScrollArea>
              {pendingProjects?.map((pendingProject) => (
                <Button type='button' onClick={() => console.log("click")} style={ {backgroundImage:`url('/Images/Button.png')` }} className="w-1/5 h-[190px] mx-5 my-5 bg-contain text-black" key={pendingProject.id}>
                  <div>
                      <div className="h-16 text-xl font-semibold">{pendingProject.name}</div>
                  </div>
                </Button>
              ))}
            </ScrollArea>
          </div>
          
      </div>
        <Card className="col-span-2 px-5 bg-yellow-50">
            <div className="text-2xl font-semibold">Browse joinable projects</div>
            <RadixScrollArea.Root>
                <RadixScrollArea.Viewport ref={viewportRef} className="h-[700px] w-full rounded ">
                {scrollProjects?.map((project) => (
                    <div className='bg-amber-100'>
                        <div className="text-xl font-semibold">{project.name}</div>
                        <div>{project.description}</div>
                        <FloatingProject userid={userid} project={project} Pause={Pause} Unpause={Continue} triggerRefresh={triggerRefresh}/>
                        <Separator className="my-5"/>
                    </div>
                ))}
                {scrollProjects?.map((project) => (
                    <div className='bg-amber-100'>
                        <div className="text-xl font-semibold">{project.name}</div>
                        <div>{project.description}</div>
                        <FloatingProject userid={userid} project={project} Pause={Pause} Unpause={Continue} triggerRefresh={triggerRefresh}/>
                        <Separator className="my-5"/>
                    </div>
                ))}
                {scrollProjects?.map((project) => (
                    <div className='bg-amber-100'>
                        <div className="text-xl font-semibold">{project.name}</div>
                        <div>{project.description}</div>
                        <FloatingProject userid={userid} project={project} Pause={Pause} Unpause={Continue} triggerRefresh={triggerRefresh}/>
                        <Separator className="my-5"/>
                    </div>
                ))}                
                {scrollProjects?.map((project) => (
                    <div className='bg-amber-100'>
                        <div className="text-xl font-semibold">{project.name}</div>
                        <div>{project.description}</div>
                        <FloatingProject userid={userid} project={project} Pause={Pause} Unpause={Continue} triggerRefresh={triggerRefresh}/>
                        <Separator className="my-5"/>
                    </div>
                ))}
                </RadixScrollArea.Viewport>
            </RadixScrollArea.Root>
        </Card>
      </div>
    )
}
export default ProjectMenu;