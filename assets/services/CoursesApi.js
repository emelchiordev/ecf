import axios from "axios"
import { API_URL, ROOT_URL } from "./config"

async function createCourse(course) {
    const response = await axios.post(API_URL + "courses", { ...course })
    return response
}

async function getCourses() {
    const response = await axios.get(API_URL + "courses")
    return response
}

async function getPublishedCourses() {
    const response = await axios.get(API_URL + "courses?published=true")
    return response
}


async function getPhoto(url) {
    const response = await axios.get(ROOT_URL + url)
    return response
}

async function getCourse(id) {
    const response = await axios.get(API_URL + "courses/" + id)
    return response
}

async function getCoursesInstructor(id) {
    const response = await axios.get(API_URL + "courses?instructor=" + id)
    return response
}

async function modifyCourse(id, value) {
    const response = await axios.put(API_URL + "courses/" + id, value)
    return response
}

async function createPhoto(value) {
    const response = await axios.post(API_URL + "courses_objects", value,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
    )
    return response
}

async function removeCourse(id) {
    const response = await axios.delete(API_URL + "courses/" + id)
    return response
}

async function getFilteredCourses() {
    const response = await axios.get(API_URL + "courses?order[dateCreated]&itemsPerPage=3&published=true")
    return response
}



export default { createCourse, getCourses, removeCourse, getCourse, modifyCourse, createPhoto, getPhoto, getFilteredCourses, getCoursesInstructor, getPublishedCourses }