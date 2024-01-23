"use client"
import React, { useState } from "react"
import { Box, Button, Flex, useToast } from "@chakra-ui/react"

import NavigationBar from "@/app/_components/NavigationBar";
import QuestionBox from "@/app/study/[unit]/_components/QuestionBox"
import { ChevronRightIcon } from "@chakra-ui/icons"
import { trpc } from "@/utils/trpc"

export default function Study({ params }: { params: { unit: string }}) {

    const toast = useToast()
    const generateQuestion = trpc.generate.useMutation()
    const [question, setQuestion] = useState<{
        question: string,
        options: { 1: string, 2: string, 3: string, 4: string },
        answer: string
    }>()
    const choiceStates = {
        1: useState(""),
        2: useState(""),
        3: useState(""),
        4: useState("")
    }

    return (
        <Box>
            <Box boxShadow="xl">
                <NavigationBar />
            </Box>

            <QuestionBox
                question={ question?.question ?? "N/A" }
                choices={ question?.options ?? {} }
                answer={ question?.answer ?? "" }
                choiceStates={ choiceStates }
            />

            <Flex justifyContent="end" marginX="70px" marginTop="15px">
                <Button
                    size="lg"
                    colorScheme="blue"
                    rightIcon={ <ChevronRightIcon width="28px" height="28px" /> }
                    onClick={ () => {
                        const promise = async () => {
                            choiceStates[1][1]("")
                            choiceStates[2][1]("")
                            choiceStates[3][1]("")
                            choiceStates[4][1]("")
                            setQuestion(undefined)

                            const question = await generateQuestion.mutateAsync({ unit: params.unit })
                            setQuestion(question)
                        }
                        toast.promise(promise(), {
                            success: { title: "Success", description: "Generated the question!" },
                            error: (error: Error) => {
                                return { title: "Error", description: error.message }
                            },
                            loading: { title: "Generating...", description: "Attempting to generate a question"}
                        })
                    } }
                >
                    Generate
                </Button>
            </Flex>
        </Box>
    )
}
