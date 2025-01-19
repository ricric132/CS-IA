import { ChevronDown,ChevronUp, ChevronsUpDown } from "lucide-react"


export enum ChevronStates{
    Neutral,
    Up,
    Down
}

function DynamicChevrons({state}) {
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
export default DynamicChevrons;