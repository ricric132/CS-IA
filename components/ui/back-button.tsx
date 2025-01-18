'use client'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { useState } from "react";


export function BackButton(){
    const router = useRouter()
    const [clicked, setClicked] = useState(false)

    return(
        <a className="float-left">
            <Button variant="ghost" disabled={clicked} onClick={() => {router.back(); setClicked(true)}} className="text-8xl font-bold h-[100%]"> {"<"} </Button>
        </a>
    )
}