import { Button } from "./button"
import { GenerateReport } from "@/lib/actions"
import { useRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";

export function GenerateReportButton({projectid, triggerRefresh}){
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