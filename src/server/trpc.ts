import { initTRPC, TRPCError } from "@trpc/server"

import { Context } from "@/server/context"

const t = initTRPC.context<Context>().create()
export const router = t.router

export const authenticatedProcedure = t.procedure.use(async (opts) => {
    if (!opts.ctx.session)
        throw new TRPCError({ code: "UNAUTHORIZED" })

    return opts.next(opts)
})
