"use client"

import React, { useState } from "react"
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { ChakraProvider } from "@chakra-ui/react"

import { getBaseUrl, trpc } from "@/utils/trpc"

export default function Provider({ children }: { children: React.ReactNode }) {

    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`
                })
            ]
        })
    )

    return (
        <trpc.Provider queryClient={ queryClient } client={ trpcClient }>
            <QueryClientProvider client={ queryClient }>
                <SessionProvider>
                    <ChakraProvider>
                        { children }
                    </ChakraProvider>
                </SessionProvider>
            </QueryClientProvider>
        </trpc.Provider>
    )
}
