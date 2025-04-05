import type { AstroCookies } from "astro";
import jwt from "jsonwebtoken"


export default async function getUserCookie({ cookies }: { cookies: AstroCookies }) {

    if (cookies.get('u')) {
        const data = jwt.decode(cookies.get('u').value, import.meta.env.JWT_SECRET)

        return data
    }
}