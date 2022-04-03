import axios from "axios"

const getTeachers = async () => {
    const response = await axios.get("http://localhost:8000/api/instructors")
    return response

}

export default { getTeachers }