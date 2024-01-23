import { Text, Card, Flex } from "@chakra-ui/react"
import ConditionalRender from "@/app/_components/ConditionalRender"
import { CheckIcon, CloseIcon } from "@chakra-ui/icons"

function getBackground(state?: string) {
    if (state === "correct") {
        return "green.100"
    } else if (state === "wrong") {
        return "red.100"
    }

    return ""
}

export default function AnswerCard({ children, state, onClick }: { children: string, state?: string, onClick: () => void }) {
    return (
        <Card
            as={ Flex }
            flexDirection="row"
            variant="outline"
            alignItems="center"
            justifyContent="center"
            padding={ ["10px", "25px", "50px", "75px", "100px"] }
            cursor="pointer"
            gap="30px"
            background={ getBackground(state) }
            onClick={ onClick }
        >
            <ConditionalRender isShowing={ state === "wrong" }>
                <CloseIcon width="32px" height="32px" color="red" />
            </ConditionalRender>

            <ConditionalRender isShowing={ state === "correct" }>
                <CheckIcon width="32px" height="32px" color="green" />
            </ConditionalRender>

            <Text fontSize="lg">{ children }</Text>
        </Card>
    )
}
