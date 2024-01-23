import { createTRPCReact } from "@trpc/react-query"

import { appRouter } from "@/server/routes/_app"

export function getBaseUrl() {
    if (typeof window !== "undefined")
        // browser should use relative path
        return ""

    if (process.env.VERCEL_URL)
        // reference for vercel.com
        return `https://${process.env.VERCEL_URL}`

    return `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpc = createTRPCReact<typeof appRouter>({})
