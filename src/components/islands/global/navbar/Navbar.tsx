import BidWorkMark from "@/assets/mark/bid-work-mark.svg";
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
        const NavButton = ({ label, className, icon }: { label: string, className?: any, icon?: React.ReactNode }) => {
            return (
                <button className={`flex items-center gap-2 ${className} text-amber-900`}>
                    {icon}
                    <p>{label}</p>
                </button>
            )
        }
        return (
            <ul className="flex md:flex-row flex-col md:space-x-5 space-y-5 md:space-y-0 w-full *:underline *:hover:text-blue-500 *:cursor-pointer">
                <NavButton label="Home" icon={<GoHomeFill />} />

                <NavButton label="Encontrar trabalhos" icon={<BiSolidFileFind />} />

                <NavButton label="Contratar freelancers" icon={<MdWorkHistory />} />

                <LoginModal>
                    <NavButton className="border rounded-lg p-2 px-4 border-blue-600 text-blue-600 hover:text-blue-500 hover:border-blue-600 transition cursor-pointer" label="Entrar" icon={<FiLogIn />} />
                </LoginModal>
            </ul>
        )
    }

    return (
        <nav className="bg-[#ddd6cc] fixed flex h-18 w-full items-center justify-between backdrop-blur-xl border-b border-neutral-400 shadow z-40">
            <div className="w-full flex items-center md:justify-around justify-between p-3">
                <img className="w-full max-w-[8rem] hover:brightness-125 hover:scale-105 transition ease-in-out cursor-pointer " src={BidWorkMark.src} alt="" />

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