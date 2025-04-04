import type { APIRoute } from "astro"


export const POST: APIRoute = async ({ request, cookies }) => {
    const body = await request.json()

    if (body) {
        let cookie_token = cookies.get('auth_token')

        if (!cookie_token) {
            const token = await fetch(import.meta.env.DEV_URL + "get-token/")

            if (token.ok) {
                const token_data = await token.json()

                cookies.set('auth_token', token_data.token, {
                    path: '/',
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24)

                })

                cookie_token = token_data.token
            }
        }

        const res = await fetch(import.meta.env.DEV_URL + "login/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie_token}`,
            },
            body: JSON.stringify(body)
        })

        if (res.ok) {
            const res_data = await res.json()

            cookies.set('user', JSON.stringify(res_data))
            
            return new Response(JSON.stringify({ 'auth': true }))
        } else {
            return new Response(JSON.stringify({ 'auth': false, message: res.statusText }))
        }

    }

    return new Response(JSON.stringify({ 'auth': false }))
}