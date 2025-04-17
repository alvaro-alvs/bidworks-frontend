import type { APIRoute } from "astro";
import jwt from "jsonwebtoken"


export const POST: APIRoute = async ({ request, cookies }) => {
    const body = await request.json()
    const PROD_URL = import.meta.env.PROD_URL
    const DEV_URL = import.meta.env.DEV_URL

    if (body) {
        const res = await fetch(PROD_URL + "sign-up/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const userData = await res.json()

        // console.log(userData)

        if (res.ok) {

            cookies.set('u', jwt.sign(userData.usuario, import.meta.env.JWT_SECRET), {
                path: '/',
                httpOnly: true,
            })

            cookies.set('auth_token', userData.tokens.access, {
                path: '/',
                httpOnly: true,
                secure: true,
            })

            return new Response(JSON.stringify(userData), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
                statusText: 'Created'
            })
        } else {
            // Mapeamento de erros possíveis
            const errorMessages = {
                email: 'Email já cadastrado',
                //* se necessario adicionar mais campos unicos
            };

            // Mensagem padrão
            let error_msg = 'Tente novamente mais tarde';

            // Verifica cada possível erro no status
            for (const [key, message] of Object.entries(errorMessages)) {
                if (userData.status?.includes(key)) {
                    error_msg = message;
                    break; // Pega o primeiro erro encontrado
                }
            }

            return new Response(JSON.stringify({
                message: error_msg,
                errorDetails: userData.status // detalhes para debug
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } else {
        return new Response(JSON.stringify({}), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }
}