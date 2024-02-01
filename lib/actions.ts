'use server'

import bcrypt from 'bcrypt'
import * as z from 'zod'

import { db } from '@/lib/db'

import { LoginSchema, RegisterSchema } from '@/schemas'
import { DevBundlerService } from 'next/dist/server/lib/dev-bundler-service'

export async function Login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  return { success: 'Email sent!' }
}

export async function Register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  })

  if (existingUser) {
    return { error: 'Email already in use!' }
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  return { success: 'User created!' }
}
