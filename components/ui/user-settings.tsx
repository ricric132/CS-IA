'use client'
import { useEffect, useTransition } from "react";
import { GetUserByID } from "@/lib/actions";
import { useState } from "react";
import { User } from "@prisma/client";
import {EditUsername} from "./edit-username"
import { EditPassword } from "./edit-password";


export function UserSettings({userID}){
    const [isPending, startTransition] = useTransition()
    const [user, setUser] = useState<User | null>()

    useEffect(() => {
        startTransition(() => {
            GetUserByID({userID}).then((response) => setUser(response)) 
        })
    });

    return(
        <div>
            <p>Username : {user?.username}</p>
            <EditUsername userID = {userID}/>
            <EditPassword userID = {userID}/>
        </div>
    )
    
}