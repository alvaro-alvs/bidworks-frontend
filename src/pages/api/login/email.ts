import jwt from "jsonwebtoken"
import type { APIRoute } from "astro"


export const POST: APIRoute = async ({ request, cookies }) => {
    const body = await request.json()

    if (body) {

        const res = await fetch(import.meta.env.DEV_URL + "login/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        if (res.ok) {
            const res_data = await res.json()

            
            const token = jwt.sign(res_data.user, res_data.token)
            
            console.log('novo jwt: ', token)
            
            cookies.set('usuario', token, {
                path: '/',
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                secure: true,
                httpOnly: true
            })

            return new Response(JSON.stringify(res_data))
        } else {
            return new Response(JSON.stringify({ 'auth': false, message: res.statusText }), { status: 401 })
        }

    }

    return new Response(JSON.stringify({ 'auth': false }))
}