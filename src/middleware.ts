import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ request, cookies, redirect }, next) => {
    const protectedRoutes = ['/perfil', '/trabalhos']; // Rotas que exigem auth
    const currentPath = new URL(request.url).pathname;

    console.log("Middleware hello")

    // Ignora rotas públicas
    if (!protectedRoutes.some(route => currentPath.startsWith(route))) {
        return next();
    }

    // 1. Verifica token no cookie
    const authToken = cookies.get('auth_token')?.value;

    if (!authToken) {
        return redirect('/login?status=unauthorized');
    }

    // 2. Valida token com o backend
    try {
        const validationRes = await fetch(`${import.meta.env.DEV_URL}validate-token`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Accept': 'application/json'
            }
        });

        if (!validationRes.ok) {
            cookies.delete('auth_token');
            return redirect('/login');
        }

        // 3. Se válido, injeta dados no locals (opcional)
        const userData = await validationRes.json();
        // locals.user = userData;
        cookies.set('user', JSON.stringify(userData));

    } catch (error) {
        console.error('Token validation failed:', error);
        return new Response(
            JSON.stringify({ error: 'Authentication service unavailable' }),
            { status: 503 }
        );
    }

    return next();
});