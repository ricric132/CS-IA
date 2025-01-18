
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";


export function SearchBar({ defaultValue, returnValue}) {
    // initiate the router from next/navigation

    const router = useRouter()

    // We need to grab the current search parameters and use it as default value for the search input

    const [inputValue, setValue] = useState(defaultValue)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{

        const inputValue = event.target.value;

        setValue(inputValue);
        returnValue(inputValue)
    }


    return (

        <div className="bg-white search__input border-[2px] border-solid border-slate-500 flex flex-row items-center gap-5 p-1 rounded-[15px]">

            

            <input type="text"

                id="inputId"

                placeholder="Search for tasks"

                value={inputValue ?? ""} onChange={handleChange}

                className="bg-[transparent] outline-none border-none w-full py-3 pl-2 pr-3" />


        </div>

    )

}