"use client"

import { trpc } from "@/app/_trpc/client"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { useState, PropsWithChildren } from "react"

const Providers = ({ children }: PropsWithChildren) => {
    const [queryClient] = useState(() => new queryClient())
    const [trpcClient] = useState(() => 
    trpc.createClient({
        links: [
            httpBatchLink ({
                url: 'http://localhost:3000/api/trpc'
            }),
        ],
    })
    )

    return (
        <trpc.Provider
            client={trpcClient}
            queryClient={queryClient}
        >
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}

export default Providers