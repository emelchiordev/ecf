import axios from "axios"

async function createInstructor(instructor) {
    const response = await axios.post("http://localhost:8000/api/instructors", { ...instructor })
    return response
}

async function deleteInstructor(idInstructor) {
    const response = await axios.delete("http://localhost:8000/api/instructors/" + idInstructor)
    return response
}

async function setAccountStatus(idInstructor, value) {
    const response = await axios.put("http://localhost:8000/api/instructors/" + idInstructor, { ...value })
    return response
}

async function modifyInstructor(idInstructor, value) {
    const response = await axios.patch("http://localhost:8000/api/instructors/" + idInstructor, { ...value },
        {
            headers: {
                "Content-Type": "application/merge-patch+json",
            }
        }
    )
    return response
}

async function createAvatar(value) {
    const response = await axios.post("http://localhost:8000/api/media_objects", value,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
    )
    return response
}

export default { createInstructor, deleteInstructor, setAccountStatus, createAvatar, modifyInstructor }