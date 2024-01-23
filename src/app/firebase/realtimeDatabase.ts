import { Database, get, ref } from "@firebase/database"

export async function getLearningTarget(database: Database, unit: string){
    const snapshot = await get(ref(database, unit))
    const data = snapshot.val()

    if (!data)
        return

    const dataAsDict = data as { [key: string]: string }
    const learningTargetKeys = Object.keys(dataAsDict)
    const randomTarget = learningTargetKeys[Math.floor(Math.random() * learningTargetKeys.length)]

    return dataAsDict[randomTarget]
}
