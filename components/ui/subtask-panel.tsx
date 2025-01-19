import { sub } from "date-fns"
import { Card } from "./card"
import CreateSubtaskForm  from "./create-subtask"
import EditSubtaskForm  from "./edit-subtask"
import PlaceholderSubtask  from "./placeholder-subtask"

function SubtaskPanel({isAdding, subtask, taskid}){
    if (isAdding == true){
        return(
            <CreateSubtaskForm taskid={taskid}/>
        )
    }
    else if(subtask != undefined){
        return(
            <EditSubtaskForm taskid={taskid} subtask={subtask}/>
        )
    }
    else{
        return(
            <PlaceholderSubtask/>
        )
    }
}
export default SubtaskPanel;

