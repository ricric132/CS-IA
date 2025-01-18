'use client'
import { Checkbox } from "./checkbox"
import { Button } from "./button"
import { useState } from "react"
import { UpdateSubtaskStatus } from "@/lib/actions"
import { useEffect } from "react"
import { Status } from "@prisma/client"

export function SubtaskListItem({subtask, selectFunction}){

    const [checked, setChecked] = useState<boolean>(subtask.status == Status.COMPLETE)
    
    async function ToggleChecked() {
        const newChecked = !checked
        setChecked(newChecked)
        await UpdateSubtaskStatus({subtaskID:subtask.id , status:newChecked})
    }


    return(
        <div>
            <Checkbox id={subtask.id} onCheckedChange={(e) => ToggleChecked()} checked={checked}/>
            <a className="float-right mr-2">{subtask.deadline.toLocaleDateString()}</a>
            <Button variant="link" onClick={() => selectFunction(subtask)}>{subtask.name}</Button>
        </div>
    )
}