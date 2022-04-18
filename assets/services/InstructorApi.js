import axios from "axios"
import { API_URL } from "./config"

async function createInstructor(instructor) {
    const response = await axios.post(API_URL + "instructors", { ...instructor })
    return response
}

async function deleteInstructor(idInstructor) {
    const response = await axios.delete(API_URL + "instructors/" + idInstructor)
    return response
}

async function setAccountStatus(idInstructor, value) {
    const response = await axios.put(API_URL + "instructors/" + idInstructor, { ...value })
    return response
}

async function modifyInstructor(idInstructor, value) {
    const response = await axios.patch(API_URL + "instructors/" + idInstructor, { ...value },
        {
            headers: {
                "Content-Type": "application/merge-patch+json",
            }
        }
    )
    return response
}

async function createAvatar(value) {
    const response = await axios.post(API_URL + "media_objects", value,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
    )
    return response
}

export default { createInstructor, deleteInstructor, setAccountStatus, createAvatar, modifyInstructor }