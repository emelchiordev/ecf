import axios from "axios"
import { API_URL } from "./config"

async function createSections(section) {
    const response = await axios.post(API_URL + "sections", section)
    return response
}

async function modifySections(id, section) {
    const response = await axios.put(API_URL + "sections/" + id, section)
    return response
}

async function removeSection(id) {
    const response = await axios.delete(API_URL + "sections/" + id)
    return response
}


async function getSections(id) {
    const response = await axios.get(API_URL + "sections")
    return response
}
async function getSectionsFilter(id) {
    const response = await axios.get(API_URL + "sections?course.id=" + id)
    return response
}

export default { createSections, getSections, getSectionsFilter, modifySections, removeSection }