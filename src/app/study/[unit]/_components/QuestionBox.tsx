import React from "react"
import { Card, Flex, SimpleGrid, Text } from "@chakra-ui/react"

import AnswerCard from "@/app/study/[unit]/_components/AnswerCard"

function handleQuestionBoxCallback(answer: string, key: string, setState: React.Dispatch<React.SetStateAction<string>>) {
    if (answer === key) {
        setState("correct")
    } else {
        setState("wrong")
    }
}

export default function QuestionBox({ question, choices, answer, choiceStates }: { question: string, choices: { [_: string]: string }, answer: string, choiceStates: { [_: string]: [string, React.Dispatch<React.SetStateAction<string>>] } }) {

    return (
        <Card variant="outline" marginX={ ["10px", "35px", "70px"] } marginTop="70px">
            <Flex justifyContent="center">
                <Text fontSize="xl" padding="20px" paddingTop="50px">{ question }</Text>
            </Flex>

            <SimpleGrid columns={ [1, null, 2] } padding="20px" gap="20px">
                {
                    Object.keys(choices).map(key =>
                        <AnswerCard
                            key={ key }
                            onClick={ () =>  handleQuestionBoxCallback(answer, key, choiceStates[key][1]) }
                            state={ choiceStates[key][0] }
                        >
                            { choices[key] }
                        </AnswerCard>
                    )
                }
            </SimpleGrid>
        </Card>
    )
}
