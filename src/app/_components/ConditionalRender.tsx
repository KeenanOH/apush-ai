import React from "react"

export default function ConditionalRender({ isShowing, children }: { isShowing: boolean, children: React.ReactNode }) {
    if (isShowing)
        return children
}
