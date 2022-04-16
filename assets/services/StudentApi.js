import axios from "axios"

async function createStudent(student) {
    const response = await axios.post("http://localhost:8000/api/students", { ...student })
    return response
}

async function getStudent(idStudent) {
    const response = await axios.get("http://localhost:8000/api/students/" + idStudent)
    return response
}

async function deleteStudent(idStudent) {
    const response = await axios.delete("http://localhost:8000/api/students/" + idStudent)
    return response
}


async function modifyStudent(idStudent, value) {
    const response = await axios.patch("http://localhost:8000/api/students/" + idStudent, { ...value },
        {
            headers: {
                "Content-Type": "application/merge-patch+json",
            }
        }
    )
    return response
}



export default { createStudent, modifyStudent, deleteStudent, modifyStudent, getStudent }