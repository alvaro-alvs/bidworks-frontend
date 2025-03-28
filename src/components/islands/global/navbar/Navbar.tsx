import BidWorkMark from "@/assets/mark/bid-work-mark.svg";
import LoginModal from "../../cta-modal/login/LoginModal";
import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CiMenuFries } from "react-icons/ci";



export default function Navbar() {
    const [open, setOpen] = useState(false)

    const NavContent = () => {
        return (
            <ul className="flex md:flex-row flex-col md:space-x-5 space-y-5 md:space-y-0 w-full *:underline *:hover:text-blue-500 *:cursor-pointer">
                <button>
                    Home
                </button>

                <button>
                    Encontrar trabalhos
                </button>

                <button>
                    Contratar freelancers
                </button>

                <LoginModal className="border rounded-lg p-2 px-4 border-blue-600 text-blue-600 hover:text-blue-500 hover:border-blue-600 transition cursor-pointer">
                    Entrar
                </LoginModal>
            </ul>
        )
    }

    return (
        <nav className="fixed flex h-18 w-full items-center justify-between backdrop-blur-xl border-b border-neutral-400 shadow z-40">
            <div className="w-full flex items-center md:justify-around justify-between p-3">
                <img className="w-full max-w-[8rem] hover:brightness-125 hover:scale-105 transition ease-in-out cursor-pointer " src={BidWorkMark.src} alt="" />

                <div className="md:block hidden">
                    <NavContent />
                </div>

                <Popover>
                    <PopoverTrigger className="md:hidden block">
                        <CiMenuFries />
                    </PopoverTrigger>
                    <PopoverContent className="w-full max-w-xs">
                        <NavContent />
                    </PopoverContent>
                </Popover>
            </div>
        </nav>
    )
}