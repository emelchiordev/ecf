import axios from "axios"

const setLogin = async (credentials) => {
    const response = await axios.post("http://localhost:8000/api/login_check", credentials)
    return response

}

export default { setLogin }