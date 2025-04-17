import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ cookies }) => {
    // Remove authentication cookies
    cookies.delete('auth_token', {
        path: '/'
    })
    
    cookies.delete('u', {
        path: '/'
    })

    return new Response(JSON.stringify({ 
        status: 'success',
        message: 'Logged out successfully'
    }), {
        status: 302, // Changed to 302 for redirect
        headers: {
            'Content-Type': 'application/json',
            'Location': '/' // Add redirect header to home
        }
    })
}
