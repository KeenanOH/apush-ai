import React from "react"
import { ComponentWithAs, Flex, FlexProps, Heading, MenuListProps } from "@chakra-ui/react"
import { Link } from "@chakra-ui/next-js"

import NavigationBarActions from "@/app/_components/NavigationBarActions"

export type NavigationBarChildren = [
    React.ReactElement<ComponentWithAs<"div", MenuListProps>>,
    React.ReactElement<ComponentWithAs<"div", FlexProps>>
]

export default function NavigationBar({ children }: { children?: NavigationBarChildren }) {
    return (
        <Flex height="100px" alignItems="center" marginX="50px">
            <Link
                href="/"
                _hover={ {
                    textDecoration: "none",
                    transform: "scale(1.05, 1.05)",
                    transitionDuration: "300ms"
                } }
                _active={ {
                    transform: "scale(1.10, 1.10)"
                } }
            >
                <Heading size="lg">
                    APUSH <Heading size="lg" as="span" color="blue.500">AI</Heading>
                </Heading>
            </Link>

            { children ? <NavigationBarActions>{ children }</NavigationBarActions> : null }
        </Flex>
    )
}
