import * as z from 'zod'
import { UserRole } from '@prisma/client'

export const LoginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

export const RegisterSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(8, { message: 'Minimum of 8 characters required' }),
  confirmPassword: z.string().min(8, { message: 'Minimum of 8 characters required' }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum([UserRole.ADMIN, UserRole.USER])
})

export const ProjectSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
})

export const TaskSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  deadline: z.date(),
  assigned: z.string().optional()
})

export const PasswordChangeSchema = z.object({
  password: z.string().min(1, { message: 'Password is required' }),
  newPassword: z.string().min(1, { message: 'Enter new password' }),
})

export const NoteSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' })
})

export const InviteCodeSchema = z.object({
  code: z.string().min(1, { message: 'Enter invite code' }).max(6, {message: 'Invite codes are 6 character'})
})




