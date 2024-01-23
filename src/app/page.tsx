"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Box, Button, Flex, Heading, MenuItem, MenuList, SimpleGrid, Text } from "@chakra-ui/react"
import { CheckIcon, LockIcon, StarIcon } from "@chakra-ui/icons"
import { useDisclosure } from "@chakra-ui/hooks"
import { Link } from "@chakra-ui/next-js"

import NavigationBar from "@/app/_components/NavigationBar"
import FeatureCard from "@/app/_components/FeatureCard"
import HeroImage from "@/app/_components/HeroImage"
import GitHubIcon from "@/app/_components/GithubIcon"
import LoginModal from "@/app/_components/LoginModal"


function HomeNavigationBar({ status, onOpen }: { status: string, onOpen: () => void }) {

    const router = useRouter()

    if (status === "authenticated")
        return (
            <NavigationBar>
                <MenuList>
                    <MenuItem onClick={ () => router.push("/dashboard") }>Dashboard</MenuItem>
                </MenuList>
                <Flex>
                    <Button colorScheme="blue" onClick={ () => router.push("/dashboard") }>Dashboard</Button>
                </Flex>
            </NavigationBar>
        )

    return (
        <NavigationBar>
            <MenuList>
                <MenuItem onClick={ onOpen }>Log in</MenuItem>
            </MenuList>
            <Flex>
                <Button colorScheme="blue" onClick={ onOpen }>Log in</Button>
            </Flex>
        </NavigationBar>
    )
}

export default function Home() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { status } = useSession()

    return (
        <>
            <Box>
                <HomeNavigationBar status={ status } onOpen={ onOpen } />

                <Flex flexDirection={ ["column", null, "row"] } paddingX={ ["20px", null, "100px"] } paddingY="20px" minHeight="calc(100vh - 100px)">
                    <Flex flexDirection="column" alignItems={ ["center", null, "start"] } justifyContent="center">
                        <Heading size="2xl" textAlign={ ["center", null, "left"] }>
                            A <Heading size="2xl" as="span" color="blue.500">powerful</Heading> tool to study for the AP® exam.
                        </Heading>

                        <Text fontSize="xl" paddingTop="10px" textAlign={ ["center", null, "left"] }>
                            Leverage artificial intelligence technology to generate practice MCQ’s.
                        </Text>

                        <Button colorScheme="blue" size="lg" marginTop={ ["30px", null, "70px"] } onClick={ onOpen }>
                            Get Started
                        </Button>
                    </Flex>

                    <Flex marginLeft={ ["none", null, "auto"] } alignItems="center" justifyContent="center">
                        <HeroImage />
                    </Flex>
                </Flex>

                <Flex flexDirection="column" backgroundColor="#EBF8FF" paddingY="60px" alignItems="center">
                    <Heading>Features</Heading>
                    <Box width="70px" height="5px" backgroundColor="blue.500" />

                    <SimpleGrid columns={ [1, null, 3] } row={ [3, null, 1] } spacing="30px" paddingX="60px" paddingY="120px">
                        <FeatureCard
                            icon={ CheckIcon }
                            title="Reliable"
                            description="Created with reliability and performance in-mind."
                        />
                        <FeatureCard
                            icon={ StarIcon }
                            title="Accurate"
                            description="APUSH AI is trained with the AP® objectives in-mind."
                        />
                        <FeatureCard
                            icon={ LockIcon }
                            title="Secure"
                            description="APUSH AI uses state-of-the-art authentication solutions."
                        />
                    </SimpleGrid>
                </Flex>

                <Flex backgroundColor="blue.900" height="100px" alignItems="center" justifyContent="center">
                    <Flex gap="50px">
                        <Heading size="sm" color="white">
                            APUSH <Heading size="sm" as="span" color="#63B3ED">AI</Heading>
                        </Heading>

                        <Link href="https://github.com/KeenanOH/APUSH-AI" target="_blank">
                            <Flex>
                                <GitHubIcon />
                                <Text paddingStart="10px" color="gray.200" fontSize="sm">View us on GitHub</Text>
                            </Flex>
                        </Link>
                    </Flex>
                </Flex>
            </Box>

            <LoginModal isOpen={ isOpen } onClose={ onClose } />
        </>
    )
}
