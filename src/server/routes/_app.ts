import { z } from "zod"
import { TRPCError } from "@trpc/server"


import { authenticatedProcedure, router } from "@/server/trpc"
import { getLearningTarget } from "@/app/firebase/realtimeDatabase"
import { createChain } from "@/utils/ai"

export const questionSchema = z.object({
    question: z.string(),
    options: z.object({
        1: z.string(),
        2: z.string(),
        3: z.string(),
        4: z.string()
    }),
    answer: z.string()
})

const questionJsonSchema = z.string()
    .transform(str => {
        return JSON.parse(str)
    })

export const appRouter = router({
    generate: authenticatedProcedure
        .input(z.object({
            unit: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const email = ctx.session?.user?.email

            if (!email)
                throw new TRPCError({ code: "UNAUTHORIZED" })

            const user = await ctx.prisma.user.findFirst({ where: { email } })

            if (!user)
                throw new Error("Please set your Open AI Key")

            const learningTarget = await getLearningTarget(ctx.database, input.unit)

            if (!learningTarget)
                throw new Error("This learning target is not found or it's not in the database yet.")

            const chain = await createChain(user.openAiKey)
            const response = await chain.invoke({ input: learningTarget })

            console.log("===START QUESTION===")
            console.log(response)
            console.log("===END QUESTION===")

            // const exOutput = `{
            //   "question": "How did the growth of railroads in the North contribute to the South's growing sense of insecurity within the Union?",
            //   "options": {
            //     "1": "By creating a strong economic partnership between the North and the Midwest, leaving the South feeling excluded",
            //     "2": "By providing the North with better access to international markets, making the South feel economically disadvantaged",
            //     "3": "By increasing the industrial competitiveness of the North, causing the South to fear losing political influence",
            //     "4": "By reducing the South's ability to regulate its agricultural production, resulting in economic vulnerability"
            //   },
            //   "answer": "2"
            // }`
            const parsed = await questionJsonSchema.parseAsync(response.answer)
            return await questionSchema.parseAsync(parsed)
        }),
    setOpenAiKey: authenticatedProcedure
        .input(z.object({
            openAiKey: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            if (!ctx.session?.user?.email)
                throw new TRPCError({ code: "UNAUTHORIZED" })

            await ctx.prisma.user.upsert({
                create: {
                    email: ctx.session.user.email,
                    openAiKey: input.openAiKey
                },
                update: {
                    openAiKey: input.openAiKey
                },
                where: {
                    email: ctx.session.user.email
                }
            })

            return { "success": true }
        })
})
