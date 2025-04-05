import { createContext, useContext } from "react"


interface ProviderRegisterFormProps {
    regData: { userData: UserType, etapa: number },
    setRegData: any,
    children: React.ReactNode
}

export const RegisterContext = createContext(null)

export default function ProviderRegisterForm({ regData, setRegData, children }: ProviderRegisterFormProps) {

    return (
        <RegisterContext.Provider value={{ regData, setRegData }}>
            {children}
        </RegisterContext.Provider>
    )
}

export const useReg = () => {
    const context = useContext(RegisterContext)

    return context
}