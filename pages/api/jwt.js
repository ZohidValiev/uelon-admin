
import { getToken } from "next-auth/jwt"

const secret = process.env.JWT_SECRET

const endpoint = async (req, res) => {
    const token = await getToken({ req, secret })
    console.log("JWT Token: ", token)
    res.end()
}

export default endpoint