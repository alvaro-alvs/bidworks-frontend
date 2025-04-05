import { Switch } from "@/components/ui/switch"
import { useReg } from "../[provider]RegisterForm"
import { useState } from "react"
import { FaEyeSlash, FaEye } from "react-icons/fa"




export const UserRegisterFields = ({ handleChange }: { handleChange }) => {
    const { regData, setRegData } = useReg()
    const [viewP, setViewP] = useState(false)

    const name_value = regData.first_name
    const lastName_value = regData.last_name
    const email_value = regData.email
    const password_value = regData.password

    const isDev = regData.isDev
    const isCliente = regData.isCliente

    return (
        <>
            <h1 className="text-3xl font-semibold mb-5">Crie sua conta</h1>
            <span className="w-full flex gap-10">
                <fieldset>
                    <label htmlFor="">Nome</label>
                    <input onChange={(e) => handleChange({ e: e.target.value, field: "first_name" })} value={name_value} type="text" maxLength={15} />
                </fieldset>
                <fieldset>
                    <label htmlFor="">Sobrenome</label>
                    <input onChange={(e) => handleChange({ e: e.target.value, field: "last_name" })} value={lastName_value} type="text" maxLength={15} />
                </fieldset>
            </span>

            <fieldset>
                <label htmlFor="">Email</label>
                <input onChange={(e) => handleChange({ e: e.target.value, field: "email" })} value={email_value} type="email" />
            </fieldset>

            <fieldset>
                <label htmlFor="">Crie uma senha</label>
                <span className="flex items-center">
                    <input
                        onChange={(e) => handleChange({ e: e.target.value, field: "password" })}
                        value={password_value}
                        type={viewP ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Sua senha"
                        className="p-2 w-full rounded-l !rounded-r-none text-white"
                    />
                    <button
                        onClick={() => setViewP(!viewP)}
                        className="h-full p-2 bg-[#bdb7ae] rounded-r text-white cursor-pointer"
                    >
                        {viewP ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </span>
            </fieldset>

            <fieldset>
                <h3>Qual o seu objetivo?</h3>

                <span className="flex items-center gap-2 mb-2">
                    <Switch value={isDev} onCheckedChange={() => setRegData({ ...regData, isDev: !regData.isDev })} />
                    <label htmlFor="" className="text-sm font-normal">Buscar trabalhos</label>
                </span>
                <span className="flex items-center gap-2">
                    <Switch value={isCliente} onCheckedChange={() => setRegData({ ...regData, isCliente: !regData.isCliente })} />
                    <label htmlFor="" className="text-sm font-normal">Contratar desenvolvedores freelancers</label>
                </span>
            </fieldset>
        </>
    )
}