import jwt from "jsonwebtoken"
import type { APIRoute } from "astro"


export const POST: APIRoute = async ({ request, cookies }) => {
    const body = await request.json()

    if (body) {
        console.log(body)
        const res = await fetch(import.meta.env.DEV_URL + "login/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        if (res.ok) {
            const res_data = await res.json()

            // console.log(res_data)
            cookies.set('auth_token', res_data.tokens.access, {
                httpOnly: true,
                secure: true,
                path: "/",
            })

            cookies.set('u', jwt.sign(res_data.user, import.meta.env.JWT_SECRET), {
                httpOnly: true,
                secure: true,
                path: "/",
            })
            
            return new Response(JSON.stringify(res_data))
        } else {
            return new Response(JSON.stringify({ 'auth': false, message: res.statusText }), { status: 401 })
        }

    }

    return new Response(JSON.stringify({ 'auth': false }))
}