import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
    const body = await request.json();

    if (!body.access_token) {
        return new Response(JSON.stringify({ 'auth': null }), { status: 400 });
    }

    try {
        const token = cookies.get('auth_token')?.value;
        // Requisição POST com o token
        const loginResponse = await fetch(import.meta.env.DEV_URL + "login/oauth/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body)
        });

        if (!loginResponse.ok) {
            throw new Error(`Login failed: ${loginResponse.status}`);
        }

        const data = await loginResponse.json();
        return new Response(JSON.stringify({ 'auth': data }));

    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({
            'auth': null,
            'error': error.message
        }), {
            status: 500
        });
    }
};