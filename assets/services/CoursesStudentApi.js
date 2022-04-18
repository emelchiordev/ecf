import axios from "axios"
import { API_URL } from "./config"

async function createCourseStudent(course_student) {
    const response = await axios.post(API_URL + "courses_students", course_student)
    return response
}

async function setCoursesStatus(course_student, id) {
    const response = await axios.put(API_URL + "courses_students/" + id, course_student)
    return response
}

export default { createCourseStudent, setCoursesStatus }