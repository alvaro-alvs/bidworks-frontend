import { useState } from "react"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import googleOAuthService from "@/services/google-oauth.service";
import LoginUsuario from "@/services/login.service";
import { toast } from "sonner";
import GoogleLoginButton from "../google/GoogleLoginButton";
import GoogleLoginProvider from "../google/GoogleLoginProvider";


export default function LoginForm({ loginForm, setLoginForm, google_client_id }: { loginForm: { email: string, password: string, viewP: boolean }, setLoginForm: any, google_client_id: string }) {
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = ({ e, field }: { e: string, field: string }) => {
        setLoginForm({ ...loginForm, [field]: e })
    }

    const handleEmailLogin = async () => {
        try {
            setIsLoading(true)
            const { status, user } = await LoginUsuario({ email: loginForm.email, password: loginForm.password })

            if (status === 'success') {
                window.location.href = '/perfil'
                toast.success(`Bem vindo(a), ${user.nome} ${user.sobrenome}`, { position: 'top-center' })
            } else {
                toast.warning('Email não cadastrado', { position: 'top-center' })
            }
        } catch (error) {
            console.error('Login error:', error)
            toast.error('Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.', { position: 'top-center' })
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div className="bg-white text-neutral-900 flex flex-col gap-5 p-5 border-neutral-400 rounded-lg shadow-lg shadow-black/20">
            <header className="space-y-2 mb-2.5">
                <h1 className="text-2xl font-bold text-neutral-800">Entre com email e senha</h1>
                <p className="text-neutral-600 text-xs">Faça login e comece a usar nossos serviços</p>
            </header>

            {/* Input de email */}
            <div className="flex flex-col">
                <label htmlFor="email" className="text-xl">Email</label>
                <input
                    onChange={(e) => handleChange({ e: e.target.value, field: "email" })}
                    value={loginForm.email}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Seu email"
                    className="p-2 bg-white border-b border-neutral-900 focus:outline-none"
                />
            </div>

            {/* Input de senha */}
            <div className="flex flex-col">
                <label htmlFor="password" className="text-xl">Senha</label>
                <span className="flex items-center">
                    <input
                        onChange={(e) => handleChange({ e: e.target.value, field: "password" })}
                        value={loginForm.password}
                        type={loginForm.viewP ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Sua senha"
                        className="p-2 w-full bg-white border-b border-neutral-900 focus:outline-none"
                    />
                    <button
                        onClick={() => setLoginForm({ ...loginForm, viewP: !loginForm.viewP })}
                        className="h-full p-3 bg-white border-b border-neutral-900 cursor-pointer"
                    >
                        {loginForm.viewP ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </span>
            </div>

            <footer className="flex justify-between gap-5 mt-5">
                <button 
                    onClick={() => handleEmailLogin()} 
                    disabled={isLoading}
                    className={`font-bold text-xl p-2 border-2 border-neutral-900 w-full rounded hover:bg-neutral-800 hover:text-white transition cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                </button>

                <GoogleLoginProvider google_client_id={google_client_id}>
                    <GoogleLoginButton />
                </GoogleLoginProvider>
            </footer>

            <a href="/registro" className="text-neutral-800 underline text-xs text-center">Cadastre-se agora</a>

        </div>
    )
}