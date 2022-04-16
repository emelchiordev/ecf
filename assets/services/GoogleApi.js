import axios from "axios"

async function createCourseStudent(value) {
    const response = await axios.post("https://www.google.com/recaptcha/api/siteverify", value,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'


            }

        },
    )
    return response
}

export default { createCourseStudent }