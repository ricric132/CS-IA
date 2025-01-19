'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Project } from "@prisma/client";
import FloatingProject from '@/components/ui/floating-project'
import { GetNotjoinedProjects } from "@/lib/actions";
import { Card } from "./card";
import { useMotionValueEvent, useTime } from "framer-motion";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useRef } from "react";
import { relative } from "path";
import { cn } from "@/lib/utils";
import { Separator } from "./separator";


function ProjectScroll({userid}){
    const router = useRouter()
    
    const [isPending, startTransition] = useTransition()
    const [active, setActive] = useState<Project[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [paused, setPaused] = useState(false)

    const baseTime = useTime()
    let savedTime = 0
 
    const viewportRef = useRef<React.ElementRef<typeof ScrollArea.Viewport>>(null);

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
          GetNotjoinedProjects(userid).then((response) => setProjects(response))
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
        <Card className="col-span-2">
            <div className="text-2xl font-semibold">Browse joinable projects</div>
            <ScrollArea.Root>
                <ScrollArea.Viewport ref={viewportRef} className="h-[700px] w-full rounded ">
                {projects?.map((project) => (
                    <div>
                        <div className="text-xl font-semibold">{project.name}</div>
                        <div>{project.description}</div>
                        <FloatingProject userid={userid} project={project} Pause={Pause} Unpause={Continue}/>
                        <Separator className="my-5"/>
                    </div>
                ))}
                {projects?.map((project) => (
                    <div>
                        <div className="text-xl font-semibold">{project.name}</div>
                        <div>{project.description}</div>
                        <FloatingProject userid={userid} project={project} Pause={Pause} Unpause={Continue}/>
                        <Separator className="my-5"/>
                    </div>
                ))}
                {projects?.map((project) => (
                    <div>
                        <div className="text-xl font-semibold">{project.name}</div>
                        <div>{project.description}</div>
                        <FloatingProject userid={userid} project={project} Pause={Pause} Unpause={Continue}/>
                        <Separator className="my-5"/>
                    </div>
                ))}                
                {projects?.map((project) => (
                    <div>
                        <div className="text-xl font-semibold">{project.name}</div>
                        <div>{project.description}</div>
                        <FloatingProject userid={userid} project={project} Pause={Pause} Unpause={Continue}/>
                        <Separator className="my-5"/>
                    </div>
                ))}
                </ScrollArea.Viewport>
            </ScrollArea.Root>
        </Card>
    )
}
export default ProjectScroll;