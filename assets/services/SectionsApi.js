import axios from "axios"

async function createSections(section) {
    const response = await axios.post("http://localhost:8000/api/sections", section)
    return response
}

async function modifySections(id, section) {
    const response = await axios.put("http://localhost:8000/api/sections/" + id, section)
    return response
}

async function removeSection(id) {
    const response = await axios.delete("http://localhost:8000/api/sections/" + id)
    return response
}


async function getSections(id) {
    const response = await axios.get("http://localhost:8000/api/sections")
    return response
}
async function getSectionsFilter(id) {
    const response = await axios.get("http://localhost:8000/api/sections?course.id=" + id)
    return response
}

export default { createSections, getSections, getSectionsFilter, modifySections, removeSection }