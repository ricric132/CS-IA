'use client'
import { Separator } from "@/components/ui/separator"
import { Button } from "./button"
import { link } from "fs"
import DynamicChevrons from "./dynamic-chevrons"
import { useState } from "react"
import { ChevronStates } from "./dynamic-chevrons"

function TaskScrollHeader({NameSort, DeadlineSort}){
    const [nameChevronState, setNameChevronState] = useState<ChevronStates>(ChevronStates.Neutral)
    const [deadlineChevronState, setDeadlineChevronState] = useState<ChevronStates>(ChevronStates.Neutral)

    function ClickName(){
        NameSort()
        setDeadlineChevronState(ChevronStates.Neutral)
        if(nameChevronState != ChevronStates.Down){
            setNameChevronState(ChevronStates.Down)
        }
        else{
            setNameChevronState(ChevronStates.Up)
        }
    }

    function ClickDeadline(){
        DeadlineSort()
        setNameChevronState(ChevronStates.Neutral)
        if(deadlineChevronState != ChevronStates.Down){
            setDeadlineChevronState(ChevronStates.Down)
        }
        else{
            setDeadlineChevronState(ChevronStates.Up)
        }
    }

    return (
        <div className="grid grid-cols-12 gap-1 divide-x-2 divide-white divide-solid">
            <div className="col-span-1 ">Status</div>
            <div className="col-span-5">
                <Button variant='link' onClick={() => ClickName()}>
                    Task Name
                    <DynamicChevrons state={nameChevronState}/>
                </Button> 
            </div>
            <div className="col-span-3">
                Assigned user       
            </div>
            <div className="col-span-3">
                <Button variant='link' onClick={() => ClickDeadline()}>
                    Deadline
                    <DynamicChevrons state={deadlineChevronState}/>
                </Button> 
            </div>

        </div>
    )
}
export default TaskScrollHeader;
