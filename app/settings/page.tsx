import { auth } from "@/auth"
import { BackButton } from "@/components/ui/back-button"
import { Separator } from "@/components/ui/separator"
import { UserSettings } from "@/components/ui/user-settings"


export default async function Settings(){
    const session = await auth()
    

    return(
        <div>
            <div className='grid grid-cols-10 mb-5 bg-yellow-50 bg-cover' style={ {backgroundImage:`url('/images/Title.png')`}}>
                <div className='col-span-1 ml-5'>
                    <BackButton />
                </div>
                <h1 className="text-8xl font-bold col-span-8 mt-2 mb-2">Settings</h1>
            </div>

            <Separator style={{ margin: '10px 15px' }} />
            
            <UserSettings userID={session?.user.id}/>


        </div>
    )
}