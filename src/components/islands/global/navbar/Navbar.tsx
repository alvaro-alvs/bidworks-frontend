import BidWorksMark from "@/assets/mark/BidWorks.svg"
import LoginModal from "../../cta-modal/login/LoginModal";
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

export default function Navbar() {
    const [open, setOpen] = useState(false)


    const NavContent = () => {
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

        return (
            <ul className="flex md:flex-row flex-col md:space-x-5 space-y-5 md:space-y-0 w-full *:hover:text-neutral-500 *:cursor-pointer">
                <NavButton href="/" label="Home" icon={<GoHomeFill />} />

                <NavButton label="Encontrar trabalhos" icon={<BiSolidFileFind />} />

                <NavButton label="Contratar freelancers" icon={<MdWorkHistory />} />

                <NavButton label="Sobre nós" icon={<MdWorkHistory />} />

                <NavButton href="/login" className="border rounded-lg p-2 px-4 border-neutral-700 text-neutral-900 hover:text-neutral-200 hover:-translate-y-2 hover:shadow-[0_8px_0_#737373] active:shadow-[0_0_0_#737373] active:hover:translate-y-0 transition cursor-pointer" label="Entrar" icon={<FiLogIn />} />
            </ul>
        )
    }

    return (
        <nav className="bg-[#ddd6cc] fixed flex h-18 w-full items-center justify-between backdrop-blur-xl border-b border-neutral-400 shadow z-40">
            <div className="w-full flex items-center md:justify-around justify-between p-3">
                <img onClick={() => window.location.href = "/"} className="w-full max-w-[8rem] hover:brightness-125 hover:scale-105 transition ease-in-out cursor-pointer " src={BidWorksMark.src} alt="" />

                <div className="md:block hidden">
                    <NavContent />
                </div>

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