import axios from "axios"
import { API_URL } from "./config"

async function setValideLesson(lesson_student) {
    const response = await axios.post(API_URL + "lesson_students", lesson_student)
    return response
}

export default { setValideLesson }