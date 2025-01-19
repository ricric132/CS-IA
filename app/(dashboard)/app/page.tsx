import React from 'react'
import {auth} from '@/auth'
import ProjectMenu from '@/components/ui/projects-menu'
import { AdminProjectMenu } from '@/components/ui/admin-projects-menu'
import SettingsButton from '@/components/ui/settings-button'
import { UserRole } from '@prisma/client'
import { GetUserByID } from '@/lib/actions'



export default async function Dashboard() 
{
  const session = await auth()


 
  const user = await GetUserByID({userID : session?.user.id})
  

  //For Admins
  if(user?.role == UserRole.ADMIN){
    return (
      <div>           
        <a>
          <h1 className="text-8xl font-bold bg-cover pt-3 pb-2 pl-5" style={ {backgroundImage:`url('/images/Title.png')` }}>Admin Dashboard</h1>
          <div className='float-right'>
            <SettingsButton/>
          </div>
        </a>
  
  
        <div className='grid grid-cols-5 gap-2 h-[80vh]'>
          <AdminProjectMenu userid={session?.user.id}/>
        </div>
      </div>
    )
  }
  //for Users
  else{
    return (
      <div>           
        <div className="grid grid-cols-12 bg-cover pt-3 pb-2 pl-5" style={ {backgroundImage:`url('/images/Title.png')` }} >
          <h1 className="text-8xl font-bold col-span-11">User Dashboard</h1>
          <div className='float-right col-span-1'>
            <SettingsButton/>
          </div>
        </div>

        <ProjectMenu userid={session?.user.id}/>
      </div>
    )
  }
}
