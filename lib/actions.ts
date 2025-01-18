'use server'

import { signIn } from '@/auth'
import { db } from '@/lib/db'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { LoginSchema, ProjectSchema, RegisterSchema, TaskSchema, PasswordChangeSchema, InviteCodeSchema } from '@/schemas'
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'
import * as z from 'zod'
import { getUserByUsername } from './user'
import { Prisma } from '@prisma/client'
import { generateVerificationToken, getVerificationTokenByToken } from './auth'
import { sendTaskAssignEmail, sendVerificationEmail } from './mail'
import { Task } from '@prisma/client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import getServerSession from "next-auth"
import { ProjectRole, Status } from '@prisma/client'
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { stat } from 'fs'
import { error } from 'console'
import { addISOWeekYears, sub } from 'date-fns'
import Success from '@/app/(auth)/success/page'
import exp from 'constants'

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { username, password } = validatedFields.data

  const existingUser = await getUserByUsername(username)

  if (!existingUser || !existingUser.username || !existingUser.password) {
    return { error: 'Invalid credentials!' }
  }

  try {
    await signIn('credentials', {
      username,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }

    throw error
  }
}

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { username, password, confirmPassword, email, role } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  if(password != confirmPassword){
    return { error: 'Confirm password is not the same' }
  }


  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  })



  if (existingUser) {
    return { error: 'Email already in use!' }
  }

  const existingUserPending = await db.pendingUsers.findUnique({
    where: {
      email,
    },
  })

  if (existingUserPending) {
    return { error: 'Verification email has already been sent!' }
  }

  await db.pendingUsers.create({
    data: {
      email,
      password: hashedPassword,
      username,
      role: role,
    },
  })

  const verificationToken = await generateVerificationToken(email)

  await sendVerificationEmail(verificationToken.email, verificationToken.token, role)

  return {
    success: 'User created successfully! Redirecting...',
  }
}

export async function verifyToken(token: string) {
  const existingToken = await getVerificationTokenByToken(token)
  if (!existingToken) {
    return { error: 'Token does not exist!' }
  }

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  })

  const userData = await db.pendingUsers.findUnique({
    where: {email: existingToken.email },
  })
  await db.pendingUsers.delete({
    where: { email: existingToken.email },
  })

  const hasExpired = new Date(existingToken.expires) < new Date()
  if (hasExpired) {
    return { error: 'Token has expired!' }
  }

  await db.user.create({
    data: {
      email: userData?.email,
      username: userData?.username,
      password: userData?.password,
      role: userData?.role 
    },
  })

  return {
    success: 'Email has been verified!',
    email: `${existingToken.email}`,
  }
}

export async function CreateProject(values: z.infer<typeof ProjectSchema>, userId : string) {
  const validatedFields = ProjectSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { name, description } = validatedFields.data

 
  let attempts = 0
  let project = undefined

  while(attempts < 10)
  {
    let generatedCode = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 6) {
      generatedCode += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    try {
      project = await db.project.create({
        data: {
          name,
          description,
          inviteCode: generatedCode
        },
      })
      
      break
    
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          continue
        }
      }
    }
    attempts += 1
  }

  if (project == undefined){
    return {
      error : "failed to create project"
    }
  }

  await db.userProject.create({
    data: {
      projectid: project.id,
      userid: userId,
      role: ProjectRole.OWNER,
    },
  })


  return {
    success: 'Project Created',
  }
}

export async function CreateProjectJoinRequest(projectId : string, userId : string) {
  const alreadySent = await db.userProject.findMany({
    where:{
      projectid: projectId,
      userid: userId
    }
  })

  console.log(alreadySent)
  if(alreadySent.length > 0){
    return {
      error: 'Request Already Sent'
    }
  }   

  await db.userProject.create({
    data:{
      projectid:projectId,
      userid:userId,
      role: ProjectRole.PENDING
    }
  })

  return{
    success: 'Request Sent'
  }
}


export async function CreateTask(values: z.infer<typeof TaskSchema>, userId : string, projectID : string) {
  console.log("starting create")
  const validatedFields = TaskSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { name, description, deadline, assigned } = validatedFields.data

  const task = await db.task.create({
    data: {
      name : name,
      description : description,
      projectid : projectID,
      status : Status.INCOMPLETE,
      deadline : deadline,
      userid: assigned
    },
    include:{
      assigned:true,
      project:true
    }
  })

  if(task.assigned){
    console.log(JSON.stringify(task))
    sendTaskAssignEmail(task.assigned.email as string, task, task.project)
  }

  return {
    success: 'Task Created',
  }
}




export async function CreateSubtask(values: z.infer<typeof TaskSchema>, userId : string, taskID : string) {
  const validatedFields = TaskSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { name, description, deadline } = validatedFields.data

  await db.subtask.create({
    data: {
      name : name,
      taskid : taskID,
      description : description,
      status : Status.INCOMPLETE,
      deadline : deadline
    },
  })
  console.log("finished create")

  return {
    success: 'Subtask Created',
  }
}

export async function EditSubtask(values: z.infer<typeof TaskSchema>, subtaskID) {
  const validatedFields = TaskSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { name, description, deadline } = validatedFields.data
  await db.subtask.update({
    where:{
      id : subtaskID
    },
    data: {
      name : name,
      description : description,
      deadline : deadline
    },
  })

  return {
    success: 'Changes Saved',
  }
}

export async function EditTask(values: z.infer<typeof TaskSchema>, taskID : string)
{
  const validatedFields = TaskSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { name, description, deadline } = validatedFields.data

  await db.task.update({
    where:{
      id: taskID
    },
    data: {
      name : name,
      description : description,
      deadline : deadline
    },
  })

  return {
    success: 'Project Updated',
  }
}

export async function DeleteTask(taskID : string)
{
  await db.task.delete({
    where:{
      id: taskID
    },
  })

  return {
    success: 'Project Deleted',
  }
}

export async function GetProjectsFromUser(userid : string){
  const raw = await db.userProject.findMany({
    where:{
      userid : userid,
      NOT:{
        role: ProjectRole.PENDING
      }
    },
    select:{
      project:{select:{
        name:true,
        id:true
      }}
    }
  },
  )

  const processed = []

  for(var i = 0; i < raw.length; i++){
    let project = raw[i].project;
    processed[i] = project
  }
  
  return processed
}

export async function GetPendingProjectsFromUser(userid : string){
  const raw = await db.userProject.findMany({
    where:{
      userid : userid,
      role: ProjectRole.PENDING
    },
    select:{
      project:{select:{
        name:true,
        id:true
      }}
    }
  },
  )

  const processed = []

  for(var i = 0; i < raw.length; i++){
    let project = raw[i].project;
    processed[i] = project
  }
  
  return processed
}

export async function GetProjectsFromAll(){
  const raw = await db.project.findMany({
    include:{
      users:{
        where:{
          role:ProjectRole.OWNER
        },
        select:{
          user:true
        }
      }
    }
  })
  
  return raw
}

export async function GetNotjoinedProjects(userid){
  const raw = await db.project.findMany({
    where:{
      users:{
        none:{
          userid:userid
        }
      }
    },
    include:{
      users:{
        where:{
          role:ProjectRole.OWNER
        },
        select:{
          user:true
        }
      }
    }
  })
  
  return raw
}

export async function GetProjectMembers(projectid : string){
  const data = await db.userProject.findMany({
    where:{
      projectid: projectid,
      NOT:{
        role: ProjectRole.PENDING
      }
    },
  })
  
  return data
}

export async function GetPendingProjectMembers(projectid : string){
  const data = await db.userProject.findMany({
    where:{
      projectid: projectid,
      role: ProjectRole.PENDING
    },
  })
  
  return data
}

export async function GetUserProject(projectid, userid){
  const data = await db.userProject.findMany({
    where:{
      projectid: projectid,
      userid: userid
    },
  })

  return data[0];
}

export async function RemoveProjectMembers(id : string){
  const data = await db.userProject.delete({
    where:{
      id: id
    },
  })
  
  return data
}

export async function AcceptJoinRequest(id : string){
  const data = await db.userProject.update({
    where:{
      id : id
    },
    data:{
      role: ProjectRole.MEMBER
    }
  })
  
  return data
}

export async function GetProjectFromID(projectID : string) {
  const project = await db.project.findUnique({
    where:{
      id : projectID,
    },
  })

  return project
}

export async function GetTasksFromProject(projectID : string) {
  const data = await db.task.findMany({
    where:{
      projectid : projectID
    },
  },
  )
  
  return data
}

export async function GetFullTasksFromProject(projectID : string) {
  const data = await db.task.findMany({
    where:{
      projectid : projectID
    },
    include:{
      assigned:true,
      subtasks:true
    }
  },
  )
  
  return data
}

export async function GetCompletedTasksFromProject(projectID : string) {
  const data = await db.task.findMany({
    where:{
      projectid : projectID,
      status : Status.COMPLETE
    },
  },
  )
  
  return data
}

export async function GetIncompleteTasksFromProject(projectID : string) {
  const data = await db.task.findMany({
    where:{
      projectid : projectID,
      status : Status.INCOMPLETE
    },
  },
  )
  
  return data
}

export async function GetInProgressTasksFromProject(projectID : string) {
  const data = await db.task.findMany({
    where:{
      projectid : projectID,
      status : Status.IN_PROCESS
    },
  },
  )
  
  return data
}

export async function UpdateTaskStatus({taskID, status}) {
  if(status == false){
    await db.task.update({
      where:{
        id: taskID
      },
      data: {
        status: Status.INCOMPLETE
      },
    })
  }
  else{
    await db.task.update({
      where:{
        id: taskID
      },
      data: {
        status: Status.COMPLETE
      },
    })
  }
}

export async function UpdateSubtaskStatus({subtaskID, status}) {
  if(status == false){
    await db.subtask.update({
      where:{
        id: subtaskID
      },
      data: {
        status: Status.INCOMPLETE
      },
    })
  }
  else{
    await db.subtask.update({
      where:{
        id: subtaskID
      },
      data: {
        status: Status.COMPLETE
      },
    })
  }
}

export async function GetSubtasks({taskid}){
  const data = await db.subtask.findMany({
    where:{
      taskid : taskid
    },
  },
  )
  return data
}

export async function GetUserByID({userID}){
  if(!userID){
    return null
  }
  const data = await db.user.findUnique({
    where:{
      id : userID
    }
  })

  return data
}

export async function GetUsersFromProject(projectID: string){
    const raw = await db.userProject.findMany({
      where:{
        projectid:projectID
      },
      include:{
        user:true
      }
    })

    const processed = []

    for(var i = 0; i < raw.length; i++){
      let user = raw[i].user;
      processed[i] = user
    }

    return processed

}

export async function UpdateUsername({values, user}){
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { username, password } = validatedFields.data

  if (!user.password ) {
    return { error: 'Invalid credentials!' }
  }


  try{
    await db.user.update({
      where:{
        id : user.id
      },
      data: {
        username : username
      },
    })
  }
  catch{
    return { error : 'username already in use'}
  }


  return {
    success: 'Username Updated',
  }
}

export async function UpdatePassword({values, user}){
  const validatedFields = PasswordChangeSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { newPassword, password } = validatedFields.data

  const toCheck = await bcrypt.hash(password, 10)

  if (user.password != toCheck) {
    return { error: 'Old Password Incorect' }
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  await db.user.update({
    where:{
      id : user.id
    },
    data: {
      password : hashedPassword
    },
  })
  

  return {
    success: 'Password Updated',
  }
}

export async function CreateNote(projectid, name){
  await db.note.create({
    data: {
      content : '',
      projectid : projectid,
      name : name
    },
  })
}

export async function SaveNote(content, noteid){
  await db.note.update({
    where:{
      id : noteid
    },
    data: {
      content : content
    },
  })
}

export async function LoadNode({noteid}){
  const data = await db.note.findUnique({
    where:{
      id : noteid
    },
  })

  return data
}

export async function GetAllNotesInProject({projectID}) {
  const data = await db.note.findMany({
    where:{
      projectid:projectID
    },
  })

  return data
}

export async function DeleteNote(noteid){
  await db.note.delete({
    where:{
      id: noteid
    },
  })
}


export async function GetUserById(id: string) {
  const user = await db.user.findUnique({ 
    where: {
      id: id
    } 
  })
  
  return user
}

export async function JoinProjectCode(values, userid) {
  const validatedFields = InviteCodeSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }


  const { code } = validatedFields.data


  const project = await db.project.findUnique({
    where: {
      inviteCode: code
    }
  })

  if(!project){
    return {error : 'Project Not Found'}
  }

  await db.userProject.create({
    data:{
      userid: userid,
      projectid: project.id,
      role: ProjectRole.MEMBER
    }
  })

  return {success : project.name}
}

export async function JoinProject(userid, projectid) {
  const join = await db.userProject.create({
    data:{
      userid: userid,
      projectid: projectid,
      role: ProjectRole.ADMIN
    }
  })

  if(!join){
    return {error : "failed to join"}
  }

  return {success : "project joined successfully"}
}

export async function DeleteProject(projectid){
  const deleteNotes = await db.note.deleteMany({
    where:{
      projectid:projectid
    }
  })

  const note = await db.task.findMany({
    where:{
      projectid:projectid
    }
  })

  const tasks = await db.task.findMany({
    where:{
      projectid:projectid
    }
  })

  for (var task in tasks) {
    const deleteSubtasks = await db.subtask.deleteMany({
      where:{
        taskid: task.id
      }
    })
  }

  const deleteTasks = await db.task.deleteMany({
    where:{
      projectid:projectid
    }
  })

  const deleteProjectConnections = await db.userProject.deleteMany({
    where:{
      projectid:projectid
    }
  })

  const deleteProject = await db.project.delete({
    where:{
      id:projectid
    }
  })
}

export async function GenerateReport(projectid){
  const project = await db.project.findUnique({
    where:{
      id:projectid
    },
    include:{
      users:true,
      tasks:{
        include:{
          subtasks:true,
          assigned:true
        }
      }
    }
  })

  const year = new Date().getFullYear().toString();
  const month = new Date().getMonth().toString();
  const day = new Date().getDate().toString();
  const hour = new Date().getHours().toString();
  const min = new Date().getMinutes().toString();
  const sec = new Date().getSeconds().toString();

  const curInstance = await db.projectStatusInstance.create({
    data:{
      fileName:"Report - " + day+ "/" + month + "/" + year + "-" + hour + ":" + min + ":" + sec,
      projectid:projectid,
      date: new Date()
    }
  })

  for(var task of project?.tasks){
    let taskInstance = await db.taskStatusInstance.create({
      data:{
        instanceid:curInstance.id,
        originalid:task.id,
        name: task.name,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
        userid: task.assigned?.id
      }
    })
    for(var subTask of task.subtasks){
      let subtaskInstance = await db.subtaskStatusInstance.create({
        data:{
          taskid:taskInstance.id,
          name: subTask.name,
          description: subTask.description,
          deadline: task.deadline,
          status: task.status,
        }
      })
    }
  }
}

export async function GetReportsByProject(projectID) {
  const reports = await db.projectStatusInstance.findMany({
    where:{
      projectid:projectID
    },
    include:{
      tasks:{
        include:{
          subtasks:true,
          assigned:true
        }
      }
    }
  })

  return reports
}

export async function GenerateReportPDFData(instanceID){

  const initial = await db.projectStatusInstance.findFirst({
    where:{
      id:instanceID
    }
  })

  console.log(JSON.stringify(initial))

  const allInstances = await db.projectStatusInstance.findMany({
    where:{
      projectid:initial?.projectid
    },
    include:{
      tasks:{
        include:{
          subtasks:true,
          assigned:true,
        }
      }
    }
  })

  let selectedInstance

  for(var instance of allInstances){
    if(instance.id == instanceID){
      selectedInstance = instance
    }
  }

  let prevInstance

  for(var instance of allInstances){
    if(instance.date.getTime() < selectedInstance.date.getTime()){
      if(!prevInstance){
        prevInstance = instance
      }
      else if(instance.date.getTime() > prevInstance.date.getTime()){
        prevInstance = instance
      }
    }
  }

  let combinedTasks = []

  if(selectedInstance && prevInstance){
    for (let i = 0; i < selectedInstance.tasks.length; i++) {
      let subarray = [i, -1]
      for(let j = 0; j < prevInstance.tasks.length; j++){
        console.log(prevInstance.tasks[j].id + "      -      " + selectedInstance.tasks[i].id)
        if(prevInstance.tasks[j].originalid.localeCompare(selectedInstance.tasks[i].originalid) == 0){
          subarray[1] = j
          console.log(subarray)
        }
      }
      combinedTasks.push(subarray)
    }

    for(let i = 0; i < prevInstance.tasks.length; i++){
      let found = false
      for(let j = 0; j < combinedTasks.length; j++){
        if(combinedTasks[j][1] == i){
          found = true
          break
        }
      }
      if(!found){
        combinedTasks.push([-1, i])
      }
    }
  }

  return {current : selectedInstance, prev : prevInstance,  taskMap : combinedTasks}
}

export async function DeleteReport(reportID){
  await db.projectStatusInstance.delete({
    where:{
      id:reportID
    }
  })
}

export async function GetProjectOwner(projectID){
  const owner = db.userProject.findFirst({
    where:{
      projectid:projectID,
      role: ProjectRole.OWNER
    },
    include:{
      user: true
    }
  })

  return owner.user
}
