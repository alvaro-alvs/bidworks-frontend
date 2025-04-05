import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
    const body = await request.json()

    if (body) {
        const res = await fetch(import.meta.env.DEV_URL + "sign-up/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const userData = await res.json()

        if (res.ok) {

            cookies.set('userData', userData, {
                path: '/',
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                secure: true,
                httpOnly: true
            })

            return new Response(JSON.stringify(userData), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json'
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
                errorDetails: userData.status // Opcional: enviar detalhes para debug
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