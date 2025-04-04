


export default async function LoginUsuario({ email, password }: { email: string, password: string }): Promise<{ status: 'ok' | 'error', data: any }> {

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

        return { status: 'ok', data: data }
    }

    return { status: 'error', data: null }
}