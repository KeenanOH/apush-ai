import React from "react"
import { Box, ComponentWithAs, Flex, Heading, Text, Card, IconProps } from "@chakra-ui/react"

export default function FeatureCard({ icon: Icon, title, description }: { icon: ComponentWithAs<"svg", IconProps>, title: string, description: string }) {
    return (
        <Card variant="outline">
            <Flex flexDirection="column" paddingX="20px" paddingY="20px" justifyItems="center">
                <Icon width="75px" height="75px" />
                <Box paddingTop="30px" paddingBottom="15px">
                    <Heading size="lg">{ title }</Heading>
                    <Text fontSize="xl">{ description }</Text>
                </Box>
            </Flex>
        </Card>
    )
}
