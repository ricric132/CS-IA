import { GetUserProject } from "@/lib/actions";
import { Status } from "@prisma/client";
import { auth } from '@/auth'
import { AdminProject } from "@/components/ui/admin-project-page";
import UserProject from "@/components/ui/user-project-page";



export default async function Project(params:{
    id : string
}){
    const session = await auth()

    const user = await GetUserProject(params.params.id, session?.user.id)

    return(
        <>
            <UserProject userid={session?.user.id} projectid={params.params.id} role={user.role}/>
        </>
    )
    
}