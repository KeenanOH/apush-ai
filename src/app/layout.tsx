import React from "react"

import Provider from "@/app/provider"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Provider>
                    { children }
                </Provider>
            </body>
        </html>
    )
}
