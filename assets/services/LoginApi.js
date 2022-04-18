import axios from "axios"
import { API_URL } from "./config"

const setLogin = async (credentials) => {
    const response = await axios.post(API_URL + "login_check", credentials)
    return response

}

export default { setLogin }