'use client'
import BackButton from "@/components/ui/back-button"
import { useState, useTransition, useEffect } from "react"
import { Project, ProjectStatusInstance  } from "@prisma/client"
import { GetProjectFromID, GetProjectMembers, GetPendingProjectMembers, GetReportsByProject } from "@/lib/actions"
import { Separator } from "@/components/ui/separator"
import { UserProject } from "@prisma/client"
import MemberListItem from "@/components/ui/member-list-item"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { DeleteProject } from "@/lib/actions"
import { useRouter } from "next/navigation"
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import GenerateReportButton from "@/components/ui/generate-report-button"
import { Card } from "@/components/ui/card"
import ReportScrollItem from "@/components/ui/report-scroll-item"

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});


export default function ManageMembers(params:{
    id : string
}) {
    const [project, setProject] = useState<Project | null>(null)
    const [members, setMembers] = useState<UserProject[]>()
    const [pendingMembers, setPendingMembers] = useState<UserProject[]>()
    const [isPending, startTransition] = useTransition()
    const [reports, setReports] = useState<ProjectStatusInstance[]>()
    
    const router = useRouter()
    
    useEffect(() => {
        startTransition(() => {
            GetProjectFromID(params.params.id).then((response) => setProject(response))
            GetProjectMembers(params.params.id).then((response) => setMembers(response))
            GetPendingProjectMembers(params.params.id).then((response) => setPendingMembers(response))
            GetReportsByProject(params.params.id).then((response) => setReports(response))
        })
    }, [])

    const triggerRefresh = () =>{
        startTransition(() => {
            GetProjectFromID(params.params.id).then((response) => setProject(response))
            GetProjectMembers(params.params.id).then((response) => setMembers(response))
            GetPendingProjectMembers(params.params.id).then((response) => setPendingMembers(response))
            GetReportsByProject(params.params.id).then((response) => setReports(response))
        })
    }

    const refreshReports = () =>{
        startTransition(() => {
            GetReportsByProject(params.params.id).then((response) => setReports(response))
        })
    }


    async function DeleteButton() {
        startTransition(() => {
            DeleteProject(params.params.id).then((response) => router.push("/app"))
        })
    }
    
    return(
        <div className="bg-amber-950">
            <div className='grid grid-cols-10 mb-5 bg-yellow-50 bg-cover' style={ {backgroundImage:`url('/images/Title.png')`}}>
                <div className='col-span-1 ml-5'>
                    <BackButton />
                </div>
                <h1 className="text-8xl font-bold col-span-8 mt-2 mb-2">manage project</h1>
            </div>

            <div className='grid grid-cols-5 gap-2 h-[80vh]'>
                <Card className="col-span-2 px-5 bg-yellow-50">
                    <h1 className="text-2xl font-bold">Manage members</h1>
                    <p>invite code: {project?.inviteCode}</p>
                    <div className="grid grid-cols-5 gap-2"> 
                        <div className="col-span-1">username</div>
                        <div className="col-span-1">role</div>
                        <div className="col-span-1">email</div>
                        <div className="col-span-1"></div>
                    </div>
                    <ScrollArea className="h-[700px] w-[100%] rounded-md border ">
                        {members?.map((member) => (
                            <div key={member.id} className="bg-cover py-6 px-5 mb-3" style={ {backgroundImage:`url('/images/ThinPanel.png')`}}>
                                <MemberListItem member={member} triggerRefresh={triggerRefresh}/>
                            </div>
                        ))}
                        <div>Pending Members</div>
                        <Separator className="my-2"/>
                        {pendingMembers?.map((member) => (
                            <div key={member.id} className="bg-cover py-6 px-5 mb-3" style={ {backgroundImage:`url('/images/ThinPanel.png')`}}>
                                <MemberListItem member={member} triggerRefresh={triggerRefresh}/>
                                <Separator className="my-2"/>
                            </div>
                        ))}
                    </ScrollArea>
                </Card>
                <Card className="col-span-3 bg-yellow-50">
                    <h1 className="text-2xl font-bold">Manage general</h1>
                    <Button onClick={() => DeleteButton()}>Delete Project</Button>
                    <GenerateReportButton projectid={params.params.id} triggerRefresh={refreshReports}/>
                    <Card className="">
                        <ScrollArea>
                            {reports?.map((report) => (
                                <div className="bg-cover py-6 px-5 mb-3" style={ {backgroundImage:`url('/images/ThinerPanel.png')`}}>
                                    <ReportScrollItem report={report} triggerRefresh={refreshReports}/>
                                </div>
                            ))}
                        </ScrollArea>
                    </Card>
                </Card>
            </div>
        </div>
    )
}
