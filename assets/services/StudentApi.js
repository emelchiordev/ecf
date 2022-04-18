import axios from "axios"
import { API_URL } from "./config"

async function createStudent(student) {
    const response = await axios.post(API_URL + "students", { ...student })
    return response
}

async function getStudent(idStudent) {
    const response = await axios.get(API_URL + "students/" + idStudent)
    return response
}

async function deleteStudent(idStudent) {
    const response = await axios.delete(API_URL + "students/" + idStudent)
    return response
}


async function modifyStudent(idStudent, value) {
    const response = await axios.patch(API_URL + "students/" + idStudent, { ...value },
        {
            headers: {
                "Content-Type": "application/merge-patch+json",
            }
        }
    )
    return response
}



export default { createStudent, modifyStudent, deleteStudent, modifyStudent, getStudent }