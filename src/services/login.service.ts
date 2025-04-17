


export default async function LoginUsuario({ email, password }: { email: string, password: string }): Promise<{ status: 'success' | 'error', user: any, message?: string }> {

    const res = await fetch('/api/login/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })

    if (res.ok) {
        const data = await res.json()

        return { status: data.status, user: data.usuario }
    }

    return { status: 'error', user: null, message: 'Email ou senha incorretos' }
}