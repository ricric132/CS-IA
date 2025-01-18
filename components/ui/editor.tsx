'use client'

import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import { useEffect, useMemo, useState } from "react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { SaveNote } from "@/lib/actions";
import { genUploader } from "uploadthing/client";
import { generateReactHelpers } from "@uploadthing/react";

export const { uploadFiles } =
  generateReactHelpers<OurFileRouter>();

export async function uploadFile(file: File) {
  const body = new FormData();
  body.append("file", file);

  const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
    method: "POST",
    body: body,
  });
  return (await ret.json()).data.url.replace(
    "tmpfiles.org/",
    "tmpfiles.org/dl/"
  );
}

async function saveToStorage(jsonBlocks, id) {
  SaveNote(JSON.stringify(jsonBlocks), id)
}

export function Editor({note}){
  const [initialContent, setInitialContent] = useState<
  PartialBlock[] | undefined | "loading"
  >("loading");

  useEffect(() => {
    if(note != undefined)
    {
      if(note.content == ''){
        setInitialContent([ {
          type: "paragraph",
          content: "New Note",
        }])
      }
      else{
        setInitialContent(JSON.parse(note.content))
      }
    }
    else{
      setInitialContent("loading")
    }
  }, [note]);

  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({ initialContent, uploadFile });
  }, [initialContent]);

  if (editor === undefined) {
    return "Select a note to open";
  }

  return (
    <BlockNoteView
      editor={editor}
      onChange={() => {
        saveToStorage(editor.document, note.id);
      }}
    />
  );
}