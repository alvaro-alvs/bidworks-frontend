


export default async function getAuthToken() {

    const res = await fetch('/api/auth/token', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
   })

    if (res.ok) {
        const data = await res.json()

        return data.token
    }

    return null
}