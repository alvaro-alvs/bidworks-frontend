import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"


export default function HomeLayout({ children, onMouseEnter, className }: { children: React.ReactNode, onMouseEnter?: () => void, className?: string }) {
    const [open, setOpen] = useState(false)


    const reset = () => { //! chora

    }

    //* chama a api intermediaria
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (

        <Dialog>
            <DialogTrigger onMouseEnter={onMouseEnter} className={className}>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Login
                    </DialogTitle>
                    <DialogDescription>
                        Entre com seu email, em seguida a senha de cadastro.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={e => handleSubmit(e)}>
                    <fieldset>
                        <span>
                            <label htmlFor="">Email</label>
                            <Input className="w-full max-w-lg" type="text" placeholder="melhor@email" />
                        </span>
                    </fieldset>
                </form>
            </DialogContent>
        </Dialog>
    )
}