import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from "@/components/ui/button"
import { CreateProjectButton } from '@/components/ui/create-project'
import {auth} from '@/auth'
import { ProjectMenu } from '@/components/ui/projects-menu'
import { SettingsButton } from '@/components/ui/settings-button'
import { JoinProjectButton } from '@/components/ui/join-project-code'
import { ProjectScroll } from '@/components/ui/projects-scroll'



export default async function Dashboard() 
{
  const session = await auth()

  return (
    <div>           
      <a>
        <h1 className="text-8xl font-bold">Admin Dashboard</h1>
        <div className='float-right'>
          <SettingsButton/>
        </div>
      </a>

      <Separator style={{ margin: '10px 15px' }} />
      <div>
        <h2 className="text-4xl font-semibold w-1/4 inline-block"> Projects</h2>
        <CreateProjectButton userid={session?.user.id}/>
      </div>

      <div className='grid grid-cols-5 gap-2 h-[80vh]'>
        <ProjectMenu userid={session?.user.id}/>
      </div>
    </div>
  )
}
