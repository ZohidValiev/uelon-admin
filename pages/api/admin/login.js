
import axios from 'axios'

export default async (req, res) => {
    const { username, password } = req.body
    let response = null;
    const xhr = axios.create({
        baseUrl: 'http://localhost:8000/api',
        headers: {
            Origin: req.headers.origin
        },
        timeout: 60000,
        withCredentials: true,
    })

    try {
        response = await xhr.post('/admin/login_check', {
                username: username,
                password: password,
            })    
    } catch (error) {
        console.log('ERROR: ', error)
        return res.status(200).json(error)
    }

    console.log(response.data)
    return res.status(200).json(response)
}