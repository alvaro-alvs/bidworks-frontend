import GoogleIcon from "@/assets/icons/Google.svg"
import { useState } from "react"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import googleOAuthService from "@/services/google-oauth.service";
import LoginUsuario from "@/services/login.service";
import { toast } from "sonner";


export default function LoginForm({ loginForm, setLoginForm }: { loginForm: { email: string, password: string, viewP: boolean }, setLoginForm: any }) {


    const handleChange = ({ e, field }: { e: string, field: string }) => {
        setLoginForm({ ...loginForm, [field]: e })
    }

    const handleEmailLogin = async () => {
        const { status, data } = await LoginUsuario({ email: loginForm.email, password: loginForm.password })

        if (status === 'ok') {

            console.log(data);
            toast.success('Login efetuado com sucesso', { position: 'top-center' })
        } else {
            toast.warning('Email não cadastrado', { position: 'top-center' })
        }
    }

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async codeData => {
            const { status, data } = await googleOAuthService({ access_token: codeData.access_token })

            if (status === 'ok') {
                console.log(data);
            } else {
                window.alert('Login Failed')
            }
        },
        onError: () => {
            console.log('Login Failed');
            window.alert('Login Failed 2')
        },
    });

    return (
        <div className="flex flex-col gap-5 p-5 border border-dashed border-neutral-400 rounded-lg shadow">
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
                    className="p-2 bg-neutral-700 rounded text-white"
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
                        className="p-2 w-full bg-neutral-700 rounded-l text-white"
                    />
                    <button
                        onClick={() => setLoginForm({ ...loginForm, viewP: !loginForm.viewP })}
                        className="h-full p-3 bg-neutral-700 rounded-r text-white cursor-pointer"
                    >
                        {loginForm.viewP ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </span>
            </div>

            <footer className="flex justify-between gap-5">
                <button onClick={() => handleEmailLogin()} className="font-bold text-xl border-2 p-2 border-neutral-800 w-full rounded hover:bg-neutral-800 hover:text-white transition cursor-pointer">
                    Entrar
                </button>

                <div onClick={() => handleGoogleLogin()} className="p-3 border-neutral-800 border-2 rounded hover:bg-red-400 hover:fill-white transition cursor-pointer">
                    <img className="w-6" src={GoogleIcon.src} alt="" />
                </div>
            </footer>

            <a href="" className="text-neutral-800 underline text-xs text-center">Cadastre-se agora</a>

        </div>
    )
}