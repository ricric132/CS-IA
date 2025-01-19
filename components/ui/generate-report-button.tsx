import { Button } from "./button"
import { GenerateReport } from "@/lib/actions"
import { useState } from "react";

function GenerateReportButton({projectid, triggerRefresh}){
    const [open, setOpen] = useState(false)

    async function HandleOnClick(){
        const reports = await GenerateReport(projectid)
        triggerRefresh()
    }

    return (
        <div>
            <Button onClick={()=>HandleOnClick()}>
                Generate Report
            </Button>
        </div>
    )
}
export default GenerateReportButton;