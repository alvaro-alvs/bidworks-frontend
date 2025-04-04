import { GoogleOAuthProvider } from "@react-oauth/google"
import { useState } from "react"
import LoginForm from "./LoginForm"




//* Componente wrapper do Formulario de Login, contento a logica do componente
export default function LoginProvider({ google_client_id }: { google_client_id: string }) {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
        viewP: false
    })

    return (
        <GoogleOAuthProvider clientId={google_client_id}>
            <LoginForm loginForm={loginForm} setLoginForm={setLoginForm} />
        </GoogleOAuthProvider>
    )
}