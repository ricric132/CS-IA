'use client'
import { useState, useTransition, useEffect } from "react"
import { Project } from "@prisma/client"
import { GetProjectFromID, GetProjectMembers, GetPendingProjectMembers } from "@/lib/actions"
import { Separator } from "@/components/ui/separator"
import { UserProject } from "@prisma/client"
import MemberListItemNoButtons from "@/components/ui/member-list-item-no-buttons"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DeleteProject } from "@/lib/actions"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"

export default function ManageMembers(params:{
    id : string
}) {
    const [project, setProject] = useState<Project | null>(null)
    const [members, setMembers] = useState<UserProject[]>()
    const [pendingMembers, setPendingMembers] = useState<UserProject[]>()
    const [isPending, startTransition] = useTransition()
    
    const router = useRouter()

    
    useEffect(() => {
        startTransition(() => {
            GetProjectFromID(params.params.id).then((response) => setProject(response))
            GetProjectMembers(params.params.id).then((response) => setMembers(response))
            GetPendingProjectMembers(params.params.id).then((response) => setPendingMembers(response))
        })
    }, [])

    const triggerRefresh = () =>{
        startTransition(() => {
            GetProjectFromID(params.params.id).then((response) => setProject(response))
            GetProjectMembers(params.params.id).then((response) => setMembers(response))
            GetPendingProjectMembers(params.params.id).then((response) => setPendingMembers(response))
        })
    }

    async function DeleteButton() {
        startTransition(() => {
            DeleteProject(params.params.id).then((response) => router.push("/app"))
        })
    }
    
    return(
        <div>
            <div className='grid grid-cols-10 mb-5 bg-yellow-50 bg-cover' style={ {backgroundImage:`url('/Images/Title.png')`}}>
                <div className='col-span-1 ml-5'>
                    <BackButton />
                </div>
                <h1 className="text-8xl font-bold col-span-8 mt-2 mb-2">Members</h1>
            </div>

            

            <div className='grid grid-cols-5 gap-2 h-[80vh]'>
                <Card className="col-span-2 px-5 bg-yellow-50">
                    <h1 className="text-2xl font-bold">Manage members</h1>
                    <p>invite code: {project?.inviteCode}</p>
                    <div className="grid grid-cols-5 gap-2"> 
                        <div className="col-span-1">username</div>
                        <div className="col-span-1">role</div>
                        <div className="col-span-1">email</div>
                        <div className="col-span-1"></div>
                    </div>
                    <ScrollArea className="h-[700px] w-[100%] rounded-md border ">
                        {members?.map((member) => (
                            <div key={member.id} className="bg-cover py-6 px-5 mb-3" style={ {backgroundImage:`url('/Images/ThinPanel.png')`}}>
                                <MemberListItemNoButtons member={member} triggerRefresh={triggerRefresh}/>
                            </div>
                        ))}
                        <div>Pending Members</div>
                        <Separator className="my-2"/>
                        {pendingMembers?.map((member) => (
                            <div key={member.id} className="bg-cover py-6 px-5 mb-3" style={ {backgroundImage:`url('/Images/ThinPanel.png')`}}>
                                <MemberListItemNoButtons member={member} triggerRefresh={triggerRefresh}/>
                                <Separator className="my-2"/>
                            </div>
                        ))}
                    </ScrollArea>
                </Card>
            </div>
        </div>
    )
}
