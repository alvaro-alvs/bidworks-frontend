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

    return next();
});