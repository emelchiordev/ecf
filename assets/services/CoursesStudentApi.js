import axios from "axios"

async function createCourseStudent(course_student) {
    const response = await axios.post("http://localhost:8000/api/courses_students", course_student)
    return response
}

async function setCoursesStatus(course_student, id) {
    const response = await axios.put("http://localhost:8000/api/courses_students/" + id, course_student)
    return response
}

export default { createCourseStudent, setCoursesStatus }