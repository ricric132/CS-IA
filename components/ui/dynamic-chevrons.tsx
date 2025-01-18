import { ChevronDown,ChevronUp, ChevronsUpDown } from "lucide-react"


export enum ChevronStates{
    Neutral,
    Up,
    Down
}

export function DynamicChevrons({state}) {
    if(state == ChevronStates.Up){
        return(
            <ChevronUp/>
        )
    }

    if(state == ChevronStates.Down){
        return(
            <ChevronDown/>
        )
    }

    return(
        <ChevronsUpDown/>
    )
}