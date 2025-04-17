import { BidWorksButton } from "@/components/islands/global/ui-assets/BidworksButton"
import { UserRegisterFields } from "./1-user-form/UserRegisterFields"
import { FaArrowRight } from "react-icons/fa";
import ProviderRegisterForm from "./[provider]RegisterForm";
import { useState } from "react";
import { toast } from "sonner";
import RegisterDataTest from "./RegisterData.test";
import GoogleLoginButton from "../../login/google/GoogleLoginButton";
import GoogleLoginProvider from "../../login/google/GoogleLoginProvider";
import { registerUsuarioService } from "@/services/register.service";
import { RegisterFinish } from "./2-continue/RegisterFinish";

export type RegContextType = {
    userData: UserType,
    etapa: number,
    isDev: boolean,
    isCliente: boolean
}

export default function RegisterForm({ google_client_id }: { google_client_id: string }) {
    const [regData, setRegData] = useState<RegContextType>({ //* todo: Gambiarra no tipo
        userData: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
        },
        etapa: 0,
        isDev: false,
        isCliente: false
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleChange = ({ e, field }: { e: string, field: string }) => {
        setRegData({ ...regData, userData: { ...regData.userData, [field]: e } })
    }

    const validateReg = (): boolean => {
        const email_reges = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (regData.etapa === 0) {
            if (!regData.userData.first_name) {
                toast.warning('Preencha o campo de nome')
                return false
            }
            if (regData.userData.first_name.length <= 3) {
                toast.warning('Nome muito curto, tente outro')
                return false
            }
            if (!regData.userData.last_name) {
                toast.warning('Preencha o campo de sobrenome')
                return false
            }
            if (regData.userData.last_name.length <= 3) {
                toast.warning('Sobrenome muito curto, tente outro')
                return false
            }
            if (!regData.userData.email) {
                toast.warning('Preencha o campo de email')
                return false
            }
            if (regData.userData.email.length <= 5) {
                toast.warning('Email inválido, tente outro')
                return false
            }
            if (!email_reges.test(String(regData.userData.email).toLowerCase())) {
                toast.warning('Email inválido, tente outro')
                return false
            }
            return true
        }

        return false
    }

    const handleContinue = async () => {
        setIsLoading(true)
        if (!validateReg()) {
            setIsLoading(false)
            return
        }

        const res = await registerUsuarioService(regData.userData)

        if (res.status === 'error') {
            toast.warning(res.message)
            setIsLoading(false)
            return
        }

        if (res.status === 'ok') {
            setRegData({ ...regData, etapa: 1 })
            window.location.replace("/perfil")
        }

        setIsLoading(false)
    }

    return (
        <ProviderRegisterForm regData={regData} setRegData={setRegData}>
            <div className="bg-white text-neutral-900 flex flex-col gap-5 p-5 border-neutral-400 rounded-lg shadow-lg shadow-black/20">
                {regData.etapa === 0 && (
                    <>
                        <header className="space-y-2 mb-2.5">
                            <h1 className="text-2xl font-bold text-neutral-800">Crie sua conta</h1>
                            <p className="text-neutral-600 text-xs">Cadastre-se e comece a usar nossos serviços</p>
                        </header>

                        <UserRegisterFields handleChange={handleChange} />

                        <footer className="w-full flex flex-col gap-2 items-center">
                            <GoogleLoginProvider google_client_id={google_client_id}>
                                <BidWorksButton
                                    className={`font-bold text-xl p-2 border-2 border-neutral-900 w-full rounded hover:bg-neutral-800 hover:text-white transition cursor-pointer ${regData.etapa > 0 && 'justify-center'}`}
                                    onClick={handleContinue}
                                    isLoading={isLoading}
                                    label="Continuar"
                                />

                                <p className="text-sm">Ou cadastre-se com google</p>

                                <GoogleLoginButton />
                            </GoogleLoginProvider>

                            <a className="text-neutral-800 underline text-xs text-center mt-5" href="/login">Já possui uma conta? Faça Login</a>
                        </footer>
                    </>
                )}

                {regData.etapa === 1 && <RegisterFinish />}

                <article className="hidden">
                    {/* Ferramentas do dev */}
                    <BidWorksButton onClick={() => setRegData({ ...regData, etapa: 0 })} label="[DEBUG] Reset" />

                    <RegisterDataTest />
                </article>
            </div>
        </ProviderRegisterForm>
    )
}