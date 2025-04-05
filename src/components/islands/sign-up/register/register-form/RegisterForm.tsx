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
        etapa: 1,
        isDev: false,
        isCliente: false
    })


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
        if (!validateReg()) {
            return
        }

        const res = await registerUsuarioService({ usuario: regData.userData })

        if (res.status === 'error') {
            toast.warning(res.message)
            return
        }

        if (res.status === 'ok') {
            setRegData({ ...regData, etapa: 1 })
        }
    }

    return (
        <ProviderRegisterForm regData={regData} setRegData={setRegData}>
            <div className="p-5 flex flex-col gap-5 w-full max-w-md overflow-hidden text-black border border-dashed border-neutral-900 rounded">
                {regData.etapa === 0 && (
                    <>
                        <UserRegisterFields handleChange={handleChange} />

                        <footer className="w-full flex flex-col gap-2 items-center">
                            <GoogleLoginProvider google_client_id={google_client_id}>
                                <BidWorksButton
                                    className={regData.etapa > 0 && 'justify-center'}
                                    onClick={() => handleContinue()}
                                    label="Continuar"
                                >
                                    {regData.etapa === 0 &&
                                        <>
                                            <FaArrowRight />
                                            <span className="text-xs text-neutral-500">Continuar</span>
                                        </>
                                    }
                                </BidWorksButton>

                                <p className="text-sm">Ou cadastre-se com google</p>

                                <GoogleLoginButton />
                            </GoogleLoginProvider>

                            <a className="text-xs text-neutral-900 hover:underline mt-5" href="/login">Já possui uma conta? Faça Login</a>
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