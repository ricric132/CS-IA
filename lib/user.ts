import { db } from '@/lib/db'

export async function getUserByUsername(username: string) {
  try {
    const user = await db.user.findUnique({ where: { username } })

    return user
  } catch {
    return null
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({ where: {id: id} })
    return user
  } catch {
    return null
  }
}
