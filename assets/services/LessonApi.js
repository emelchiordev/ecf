import axios from "axios"
import { API_URL } from "./config"

async function createLesson(lesson) {
    const response = await axios.post(API_URL + "lessons", lesson)
    return response
}


async function removeLesson(id) {
    const response = await axios.delete(API_URL + "lessons/" + id)
    return response
}

async function getLesson(id) {
    const response = await axios.get(API_URL + "lessons/" + id)
    return response
}
async function modifyLesson(id, value) {
    const response = await axios.put(API_URL + "lessons/" + id, value)
    return response
}



export default { createLesson, removeLesson, getLesson, modifyLesson }