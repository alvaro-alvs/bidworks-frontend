import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CiMenuFries } from "react-icons/ci";
import { GoHomeFill } from "react-icons/go";
import { BiSolidFileFind } from "react-icons/bi";
import { MdWorkHistory } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { IoMdPerson } from "react-icons/io";

interface UsuarioProp {
    first_name: string,
    last_name: string,
    email: string,
    foto: string
}

export default function Navbar({ usuario }: { usuario: UsuarioProp }) {
    const [open, setOpen] = useState(false)
    
    const NavButton = ({ label, className, icon, href }: { label: string, className?: any, icon?: React.ReactNode, href?: string }) => {
        const handleRedirect = (href: string) => {
            window.location.href = href
        }

        return (
            <button onClick={href ? () => handleRedirect(href) : () => { }} className={`flex items-center gap-2 ${className} text-neutral-900`}>
                {icon}
                <p>{label}</p>
            </button>
        )
    }

    const NavContent = () => {
        return (
            <ul className="flex md:flex-row flex-col md:space-x-5 space-y-5 md:space-y-0 w-full *:hover:text-neutral-500 *:cursor-pointer">
                <NavButton href="/" label="Home" icon={<GoHomeFill />} />

                <NavButton label="Encontrar trabalhos" icon={<BiSolidFileFind />} />

                <NavButton label="Contratar freelancers" icon={<MdWorkHistory />} />

                <NavButton label="Sobre nós" icon={<MdWorkHistory />} />

            </ul>
        )
    }

    return (
        <nav className="bg-[#ddd6cc] fixed flex h-18 w-full items-center justify-between backdrop-blur-xl border-b border-neutral-400 shadow z-40">
            <div className="w-full flex items-center md:justify-around justify-between p-3">
                <span onClick={() => {
                    window.location.replace("/");
                }} className="space-y-1 hover:scale-105 transition ease-in-out cursor-pointer hover:brightness-125">
                    <img className="w-full max-w-[8rem]" src="https://placehold.co/200x50/ddd6cc/000000?text=BidWorks" alt="BidWorks Logo" />
                    <p className="text-black text-xs">
                        {usuario && `Saudações, ${usuario.first_name} ${usuario.last_name}`}
                    </p>
                </span>

                <div className="md:block hidden">
                    <NavContent />
                </div>

                {
                    usuario ?
                        <div onClick={() => {
                            window.location.replace("/perfil");
                        }} className="relative flex items-center justify-center w-10 h-10 rounded-full border border-neutral-900 hover:-translate-y-2 hover:shadow-[0_8px_0_#737373] active:shadow-[0_0_0_#737373] active:hover:translate-y-0 transition">
                            <IoMdPerson className="w-6 h-6 text-neutral-900 absolute" />
                            <img className="rounded-full w-full z-10" src={usuario.foto} alt="" />
                        </div>
                        :
                        <NavButton href="/login" className="border rounded-lg p-2 px-4 border-neutral-700 text-neutral-900 hover:text-neutral-200 hover:-translate-y-2 hover:shadow-[0_8px_0_#737373] active:shadow-[0_0_0_#737373] active:hover:translate-y-0 transition cursor-pointer" label="Entrar" icon={<FiLogIn />} />
                }

                <Popover>
                    <PopoverTrigger className="md:hidden block">
                        <CiMenuFries />
                    </PopoverTrigger>
                    <PopoverContent className="w-full max-w-xs border border-dashed border-black">
                        <NavContent />
                    </PopoverContent>
                </Popover>
            </div>
        </nav>
    )
}