import axios from "axios"

const getTeachers = async () => {
    const response = await axios.get("http://localhost:8000/api/instructors")
    return response

}

const getTeacher = async (id) => {
    const response = await axios.get("http://localhost:8000/api/instructors/" + id)
    return response

}

export default { getTeachers, getTeacher }