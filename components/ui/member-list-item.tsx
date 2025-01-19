'use client'
import { Button } from "./button"
import { useState, useEffect, useTransition} from "react"
import { ProjectRole, User } from "@prisma/client"
import { GetUserById , RemoveProjectMembers, AcceptJoinRequest} from "@/lib/actions"

function MemberListItem({member, triggerRefresh}){
    const [user, setUser] = useState<User | null>()
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition(() => {
            GetUserById(member.userid).then((response) => setUser(response))
        })
    }, [member.userid])
    
    return(
        <div className="grid grid-cols-5 gap-2"> 
            <div className="col-span-1">{user?.username}</div>
            <div className="col-span-1">{member.role}</div>
            <div className="col-span-1">{user?.email}</div>
            <div className="col-span-1"></div>
            <div className="col-span-1">
                <ManageButtons member={member} triggerRefresh={triggerRefresh}/>
            </div>
        </div>
    )
}

function ManageButtons({member, triggerRefresh}){
    const [isPending, startTransition] = useTransition()

    async function RemoveMember(){
        startTransition(() => {
            RemoveProjectMembers(member.id).then(() => console.log("a"))
        })
        triggerRefresh()
    }

    async function AddMember(){
        startTransition(() => {
            AcceptJoinRequest(member.id)
        })
        triggerRefresh()
    }


    if(member.role == ProjectRole.MEMBER){
        return(
            <div>
                <Button onClick={() => RemoveMember()}>Remove</Button>
            </div>
        )
    }

    if(member.role == ProjectRole.OWNER){
        return(
            <div>
                
            </div>
        )
    }

    if(member.role == ProjectRole.PENDING){
        return(
            <div className="grid grid-cols-2">
                <Button className="col-span-1" onClick={() => AddMember()}>Accept</Button>
                <Button className="col-span-1" variant={"destructive"} onClick={() => RemoveMember()}>Reject</Button>
            </div>
        )
    }
}
export default MemberListItem;