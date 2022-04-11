import axios from "axios"

async function createLesson(lesson) {
    const response = await axios.post("http://localhost:8000/api/lessons", lesson)
    return response
}


async function removeLesson(id) {
    const response = await axios.delete("http://localhost:8000/api/lessons/" + id)
    return response
}

async function getLesson(id) {
    const response = await axios.get("http://localhost:8000/api/lessons/" + id)
    return response
}
async function modifyLesson(id, value) {
    const response = await axios.put("http://localhost:8000/api/lessons/" + id, value)
    return response
}



export default { createLesson, removeLesson, getLesson, modifyLesson }