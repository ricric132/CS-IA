import { Button } from "@/components/ui/button"
import { ProjectSchema } from "@/schemas"
import Image from 'next/image'
import * as z from 'zod'

export async function ClassMenu(name:string) {
  return (
    <Button variant="outline" className="w-1/4 h-60 mx-5 border-8">
        <div>
            <div className="h-16 text-xl font-semibold">{name}</div>
        </div>
    </Button>
  )
}
