import { Box, Card, Flex, LinkBox, LinkOverlay, Text } from "@chakra-ui/react"

export default function ListCard({ children, href }: { children: string, href: string }) {
    return (
        <LinkBox>
            <LinkOverlay href={ href } textDecoration="none">
                <Card variant="outline" paddingX="24px" paddingY="8px">
                    <Flex alignItems="center">
                        <Text fontSize={ ["xl", "2xl"] }>{ children }</Text>
                        <Box marginLeft="auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                                <path d="M1.90283 0L0 1.88L6.18084 8L0 14.12L1.90283 16L10 8L1.90283 0Z" fill="#3182CE"/>
                            </svg>
                        </Box>
                    </Flex>
                </Card>
            </LinkOverlay>
        </LinkBox>
    )
}
