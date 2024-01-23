import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai"
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { createStuffDocumentsChain } from "langchain/chains/combine_documents"
import { createRetrievalChain } from "langchain/chains/retrieval"
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase"
import { createClient } from "@supabase/supabase-js"

const client = createClient(process.env["SUPABASE_URL"]!, process.env["SUPABASE_SECRET"]!)

function createVectorStore(openAIApiKey: string) {
    const embeddings = new OpenAIEmbeddings({
        openAIApiKey
    })

    return new SupabaseVectorStore(embeddings, {
        client,
        tableName: "documents",
    })
}

function createPrompt() {
    return ChatPromptTemplate.fromTemplate(`You are a college professor writing a United States history exam.
Write a multiple-choice question using the following context and learning targets.
Each of the answer choices MUST have a similar length.
The question must NOT be based on "excepts" or outside sources.

When you come up with an answer choice, ask yourself the following questions:
1. Is this relevant to the learning target?
2. Is the answer choice a similar length to the others?
3. Is the generality of the answer choice similar to the others?

When you come up with the correct answer, ask yourself:
1. Does the answer align with the learning targets and context?

You must format the question in JSON with the following fields:
1. question - a string representing the question
2. options - a dictionary with the key being a number between 1-4 and the value being the answer choice
3. answer - the key representing the answer within the options

Here is an example on how to format the question:
{{
    "question": "the question goes here",
    "options": {{
        "1": "option 1 goes here",
        "2": "option 2 goes here",
        "3": "option 3 goes here",
        "4": "option 4 goes here"
    }},
    "answer": "answer goes here (will be either 1, 2, 3, or 4)"
}}

Context: {context}

Learning Targets: {input}

After you've written the question, it's time to do some revisions.
1. Look at the length of all the answer choices. If one of them is too short or too long, fix it to be similar length to the others. 
   The length of each answer choice should be within 5 characters of each other.`)
}

export async function createChain(openAIApiKey: string) {
    const llm = new ChatOpenAI({ modelName: "gpt-3.5-turbo-1106", temperature: 1, openAIApiKey })
    const prompt = createPrompt()
    const vectorStore = createVectorStore(openAIApiKey)

    return await createRetrievalChain({
        combineDocsChain: await createStuffDocumentsChain({ llm, prompt }),
        retriever: vectorStore.asRetriever(2),
    })
}
