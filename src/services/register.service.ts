


export const registerUsuarioService = async ({ usuario }: { usuario: UserType }) => {

    const res = await fetch('api/cadastro/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario })
    })

    console.log(res)
    const data = await res.json()

    if (res.ok) {

        return { status: 'ok', data: data, message: data.message }
    }


    return { status: 'error', data: null, message: data.message }
}