import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

const app = initializeApp({
    apiKey: "AIzaSyBmypCLpQQJGhQ4z4eq3yVX_WJ5fcfddqA",
    authDomain: "apush-ai.firebaseapp.com",
    databaseURL: "https://apush-ai-default-rtdb.firebaseio.com",
    projectId: "apush-ai",
    storageBucket: "apush-ai.appspot.com",
    messagingSenderId: "540443867216",
    appId: "1:540443867216:web:818698467407eed5ebb955"
})

export const database = getDatabase(app)

