import axios from "axios"

async function createCourse(course) {
    const response = await axios.post("http://localhost:8000/api/courses", { ...course })
    return response
}

async function getCourses() {
    const response = await axios.get("http://localhost:8000/api/courses")
    return response
}

async function getPhoto(url) {
    const response = await axios.get("http://localhost:8000" + url)
    return response
}

async function getCourse(id) {
    const response = await axios.get("http://localhost:8000/api/courses/" + id)
    return response
}

async function modifyCourse(id, value) {
    const response = await axios.put("http://localhost:8000/api/courses/" + id, value)
    return response
}

async function createPhoto(value) {
    const response = await axios.post("http://localhost:8000/api/courses_objects", value,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
    )
    return response
}

async function removeCourse(id) {
    const response = await axios.delete("http://localhost:8000/api/courses/" + id)
    return response
}


export default { createCourse, getCourses, removeCourse, getCourse, modifyCourse, createPhoto, getPhoto }