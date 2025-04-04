import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies }) => {
    const authToken = cookies.get('auth_token')?.value

    if (!authToken) {
        return new Response(JSON.stringify({ 'auth': false }))
    }

    try {
        const res = await fetch(`${import.meta.env.DEV_URL}validate-token`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Accept': 'application/json'
            }
        })

        if (res.ok) {
            return new Response(JSON.stringify({ 'auth': true }))

        } else {
            return new Response(JSON.stringify({ 'auth': false }))
        
        }
    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({ 'auth': false }))
    }
}