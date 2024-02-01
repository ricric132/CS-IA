'use server'

import bcrypt from 'bcryptjs'
import * as z from 'zod'
import { AuthError } from 'next-auth'

import { db } from '@/lib/db'

import { signIn } from '@/auth'
import { LoginSchema, RegisterSchema } from '@/schemas'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export async function Login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn('credentials', {
      email,
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
