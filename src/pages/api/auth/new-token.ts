import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
    const body = await request.json()

    if (body) {
        const token = await fetch(import.meta.env.DEV_URL + "get-token/")

        if (token.ok) {
            const token_data = await token.json()

            cookies.set('auth_token', token_data.token, {
                path: '/',
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24)

            })
        }
    }

    return new Response(JSON.stringify({}), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}