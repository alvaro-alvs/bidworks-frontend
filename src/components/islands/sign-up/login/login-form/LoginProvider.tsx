import { GoogleOAuthProvider } from "@react-oauth/google"
import { useState } from "react"
import LoginForm from "./LoginForm"




//* Componente wrapper do Formulario de Login, contento a logica do componente
export default function LoginProvider({ google_client_id }: { google_client_id: string }) { //* tamo circulando tamo circulando
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
        viewP: false
    })

    return (
        <LoginForm google_client_id={google_client_id} loginForm={loginForm} setLoginForm={setLoginForm} />
    )
}