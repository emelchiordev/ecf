import axios from "axios"
import { API_URL } from "./config"

const getTeachers = async () => {
    const response = await axios.get(API_URL + "instructors")
    return response

}

const getTeacher = async (id) => {
    const response = await axios.get(API_URL + "instructors/" + id)
    return response

}

export default { getTeachers, getTeacher }