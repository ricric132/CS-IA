'use client'
import { Checkbox } from "./checkbox"
import { Button } from "./button"
import { useState, useEffect, useTransition, startTransition } from "react"
import { UpdateSubtaskStatus } from "@/lib/actions"
import { ProjectRole, Status, User } from "@prisma/client"
import { GetUserById , RemoveProjectMembers, AcceptJoinRequest} from "@/lib/actions"

export function MemberListItemNoButtons({member, triggerRefresh}){
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
        </div>
    )
}
