

type GoogleAccessDataType = {
    access_token: string,
    authuser: string,
    expires_i: number,
    prompt: string,
    scope: string,
    token_type: string
}


export default async function googleOAuthService({ access_token }): Promise<{ status: 'ok' | 'error', data: any }> {

    const res = await fetch('/api/login/google-oauth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ access_token: access_token })
    })

    if (res.ok) {
        const data = await res.json()

        return { status: 'ok', data: data }
    }

    return { status: 'error', data: null }
}