import axios from "axios"

async function setValideLesson(lesson_student) {
    const response = await axios.post("http://localhost:8000/api/lesson_students", lesson_student)
    return response
}

export default { setValideLesson }