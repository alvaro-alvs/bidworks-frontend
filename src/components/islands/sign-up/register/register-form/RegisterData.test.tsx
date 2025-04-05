import { useReg } from "./[provider]RegisterForm"




export default function RegisterDataTest() {
    const { regData, setRegData } = useReg()

    return (
        <div className="flex w-full max-w-md rounded text-white bg-neutral-900 p-5 my-3">

            <code>
                {Object.entries(regData).map(([key, value]) => (
                    <div key={key}>{`${key}: ${JSON.stringify(value)}`}</div>
                ))}
            </code>
        </div>
    )
}