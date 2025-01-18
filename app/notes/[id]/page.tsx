'use client'

import { Editor } from "@/components/ui/editor";
import { useState, useTransition, useEffect } from "react"; 
import { Note } from "@prisma/client";
import { GetAllNotesInProject } from "@/lib/actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CreateNoteButton } from "@/components/ui/create-note";
import { BackButton } from "@/components/ui/back-button";
import { DeleteNote } from "@/lib/actions";
import { Card } from "@/components/ui/card";


export default function Notes(params:{
    id : string
}) {
  const [notes, setNotes] = useState<Note[]>()
  const [activeNote, setActiveNote] = useState<Note>()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(() => {
      GetAllNotesInProject(params.params.id).then((response) => SetSortedNotes(response))
    })
  })

  function SetSortedNotes(raw: Note[]){
    for(let i = 0; i < raw.length; i++){
        let earliest = raw[i]
        let index = i
        for(let j = i+1; j < raw.length; j++){
            if(raw[j].name < earliest.name){
              earliest = raw[j]
              index = j
            }
        }
        let temp = raw[i]
        raw[i] = earliest
        raw[index] = temp
    }

    if(raw != notes){
        setNotes(raw)
    }
  }

  function DeleteCurNote(){
    if(activeNote != undefined){
      DeleteNote(activeNote.id)
    }

    setActiveNote(undefined)
  }

  return (
    <div className="bg-yellow-50">
      <div className='grid grid-cols-10 mb-5 bg-yellow-50 bg-cover' style={ {backgroundImage:`url('/images/Title.png')`}}>
          <div className='col-span-1 ml-5'>
              <BackButton />
          </div>
          <h1 className="text-8xl font-bold col-span-8 mt-2 mb-2">Note Archive</h1>
      </div>
      <div>
        <Card className="w-[20%] float-left bg-yellow-50">
          <CreateNoteButton projectid={params.params.id}/>
          <Button variant={'destructive'} onClick={() => DeleteCurNote()}> delete note</Button>
          <ScrollArea className="h-[700px] w-[100%] rounded-md border">
            {notes?.map((note) => (
              <div key={note.id} className="bg-cover mb-3" style={ {backgroundImage:`url('/images/ThinPanel.png')`}}>
              { note?.id != activeNote?.id ? (<Button onClick={() => setActiveNote(note)} variant={'link'} >{note.name}</Button>)
                : (<Button onClick={() => setActiveNote(note)} className="underline" variant={'link'} >{note.name}</Button>)
              } 
              </div>
            ))}
          </ScrollArea>
        </Card>
        <div className="float-right w-[80%]">
          <Editor note={activeNote}/>
        </div>
      </div>
    </div>
  ) 
}
 