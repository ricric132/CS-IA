'use client'
import { Button } from "./button"
import { useRouter } from "next/navigation"

export function SettingsButton(){
    const router = useRouter()

    function GoToSettings(){
        router.push('/settings')
    }

    return(
        <Button onClick={() => GoToSettings()}>Settings</Button>
    )
}