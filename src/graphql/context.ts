import type { Session, User } from '@prisma/client'
import type { IncomingMessage } from 'http'
import { getSession } from 'next-auth/react'

import { prisma } from '@/libs/prisma'

export interface Context {
  prisma: typeof prisma
  currentUser: User | null
}

export const createContext: any = async ({
  req,
}: {
  req: IncomingMessage
}): Promise<Context> => {
  const session = await getSession({ req })
  const email: string | null = session?.user?.email || null
  const currentUser = email
    ? await prisma.user.findUnique({ where: { email } })
    : null
  return { prisma, currentUser }
}
