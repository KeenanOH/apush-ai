import { getServerSession } from "next-auth"
import { PrismaClient } from "@prisma/client"

import { database } from "@/app/firebase/firebase"

const prismaClient = new PrismaClient()

export async function createContext() {
    return { database, session: await getServerSession(), prisma: prismaClient }
}
export type Context = Awaited<ReturnType<typeof createContext>>
