import { DeleteReport, GenerateReportPDFData } from "@/lib/actions"
import { Button } from "./button"
import { Separator } from "./separator"
import { useRouter } from "next/navigation"


function ReportScrollItem({report, triggerRefresh}){
    const router = useRouter()
    async function OpenClick(){
        router.push("/report/" + report.id + "/pdf")
        //const data = await GenerateReportPDFData(report.id)
        //console.log(JSON.stringify(data))
    }

    function DeleteClick(){
        DeleteReport(report.id)
        triggerRefresh()
    }

    return(
        <div className="">
            <div className="grid grid-cols-5 gap-3">
                <div className="col-span-2">
                    <Button onClick={() => OpenClick()} variant="ghost">
                        {report.fileName}
                    </Button>
                </div>

                <div className="col-span-3">
                    <Button onClick={() => DeleteClick()} variant="ghost">
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default ReportScrollItem;