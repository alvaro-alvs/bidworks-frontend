import type { AstroCookies } from "astro";
import jwt from "jsonwebtoken"


export default function getUserCookie({ cookies }: { cookies: AstroCookies }) {

    
    if (cookies.get('u')) {
        const data = jwt.decode(cookies.get('u').value, import.meta.env.JWT_SECRET)
        // console.log(data)

        if (!data) {
            const parsedData = JSON.parse(cookies.get('u').value)

            return parsedData
        }

        return data
    }
}