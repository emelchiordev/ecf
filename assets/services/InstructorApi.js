import axios from "axios"

async function createInstructor(instructor) {
    const response = await axios.post("http://localhost:8000/api/instructors", { ...instructor })
    return response
}
export default { createInstructor }