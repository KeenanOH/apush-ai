"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    MenuItem,
    MenuList,
    useToast
} from "@chakra-ui/react"

import NavigationBar from "@/app/_components/NavigationBar"
import KeyIcon from "@/app/dashboard/_components/KeyIcon"
import ListCard from "@/app/dashboard/_components/ListCard"
import LoadingScreen from "@/app/_components/LoadingScreen"
import { trpc } from "@/utils/trpc"

export default function Dashboard() {

    const saveOpenAiKey = trpc.setOpenAiKey.useMutation()
    const toast = useToast()
    const router = useRouter()
    const [openAiKey, setOpenAiKey] = useState("")
    const session = useSession({
        required: true,
        onUnauthenticated: () => router.push("/")
    })

    if (session.status === "loading")
        return <LoadingScreen />

    return (
        <Box>
            <Box boxShadow="xl">
                <NavigationBar>
                    <MenuList>
                        <MenuItem onClick={ () => signOut({ callbackUrl: "/" }) }>Log out</MenuItem>
                    </MenuList>
                    <Flex>
                        <Button
                            colorScheme="blue"
                            marginEnd="15px"
                            onClick={ () => signOut({ callbackUrl: "/" }) }
                        >
                            Log out
                        </Button>
                    </Flex>
                </NavigationBar>
            </Box>

            <Box paddingX={ ["35px", null, "70px"] }>
                <Flex justifyContent="center" paddingTop="70px">
                    <InputGroup width="300px">
                        <InputLeftAddon>
                            <KeyIcon />
                        </InputLeftAddon>
                        <Input placeholder="OpenAI Key" onChange={ (e) => setOpenAiKey(e.target.value) } />
                    </InputGroup>

                    <Button
                        colorScheme="blue"
                        marginLeft="30px"
                        onClick={ () => {
                            const promise = saveOpenAiKey.mutateAsync({ openAiKey })
                            toast.promise(promise, {
                                success: { title: "Success", description: "Saved your Open AI Key", duration: 2000 },
                                error: (error: Error) => {
                                    return { title: "Error", description: error.message, duration: 300000 }
                                },
                                loading: { title: "Saving...", description: "Attempting to save your Open AI Key"}
                            })
                        } }
                    >
                        Save
                    </Button>
                </Flex>

                <Flex flexDirection="column" gap="10px" paddingTop="50px">
                    <Heading size="lg">Study</Heading>

                    <ListCard href="/study/1">Unit 1: 1491 - 1607</ListCard>
                    <ListCard href="/study/2">Unit 2: 1607 - 1754</ListCard>
                    <ListCard href="/study/3">Unit 3: 1754 - 1800</ListCard>
                    <ListCard href="/study/4">Unit 4: 1800 - 1848</ListCard>
                    <ListCard href="/study/5">Unit 5: 1844 - 1877</ListCard>
                    <ListCard href="/study/6">Unit 6: 1865 - 1898</ListCard>
                    <ListCard href="/study/7">Unit 7: 1890 - 1945</ListCard>
                    <ListCard href="/study/8">Unit 8: 1945 - 1980</ListCard>
                    <ListCard href="/study/9">Unit 9: 1945 - Present</ListCard>
                </Flex>
            </Box>
        </Box>
    )
}
