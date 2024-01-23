import React from "react"
import { Flex, Hide, IconButton, Menu, MenuButton, Show } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"

import { NavigationBarChildren } from "@/app/_components/NavigationBar"

export default function NavigationBarActions({ children }: { children: NavigationBarChildren }) {
    return (
        <Flex marginStart="auto">
            <Show below="md">
                <Menu>
                    <MenuButton as={ IconButton } variant="ghost" icon={ <HamburgerIcon width="32px" height="32px" /> } />
                    { children[0] }
                </Menu>
            </Show>

            <Hide below="md">
                { children[1] }
            </Hide>
        </Flex>
    )
}