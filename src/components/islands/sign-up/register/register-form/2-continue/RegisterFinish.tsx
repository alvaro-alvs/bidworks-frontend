import { useReg } from "../[provider]RegisterForm"




export const RegisterFinish = () => {
    const { regData, setRegData } = useReg()

    return (
        <>
            <h1 className="text-center text-3xl">Tudo certo!</h1>

            <a href="/perfil" className="text-center text-sm underline text-neutral-900">
                Acesse já o seu perfil
            </a>
        </>
    )
}