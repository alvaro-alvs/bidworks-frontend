
import BidWorkMark from "@/assets/mark/bid-work-mark.svg";
import { useState } from "react";
import LoginModal from "../cta-modal/login/LoginModal";



export default function HeroSection() {
    const [hoverStates, setHoverStates] = useState({
        ctaFreela: true,
        ctaContrate: false
    })


    return (
        <main className="w-full flex flex-col justify-center h-full pt-24">
            <figure
                className="w-full flex flex-col items-center justify-center mt-24 h-max p-3"
            >
                <img
                    className="w-full md:max-w-md max-w-sm select-none"
                    src={BidWorkMark.src}
                    alt=""
                />

                <div
                    className="relative flex md:flex-row flex-col w-full max-w-xl items-center justify-center py-12 text-center font-bold md:space-x-8 space-x-0 md:space-y-0 space-y-3 *:transition-all *:duration"
                >
                    <span className={`${hoverStates.ctaFreela ? "text-blue-600 md:text-2xl text-xl capitalize" : "text-md opacity-50"} z-10 ease-in-out`}>
                        Conquiste liberdade e flexibilidade trabalhando em projetos
                        globais
                    </span>

                    <div className={`z-0 md:h-36 h-px md:w-1 w-full md:rotate-45 mx-auto bg-neutral-900`}></div>

                    <span className={`${hoverStates.ctaContrate ? "text-orange-600 md:text-2xl text-xl capitalize" : "text-md opacity-50"} z-10 ease-in-out`}>
                        Contrate freelancers especializados e entregue resultados
                        excepcionais
                    </span>
                </div>
                <nav
                    className="flex w-full max-w-lg justify-around md:text-md text-sm gap-3 font-bold *:cursor-pointer"
                >
                    <LoginModal onMouseEnter={() => setHoverStates({ ctaContrate: false, ctaFreela: true })}>
                        <p className="rounded-lg p-2 px-4 text-white border-2 border-blue-600 bg-blue-600 hover:brightness-125 transition cursor-pointer">Encontre trabalhos</p>
                    </LoginModal>

                    <button
                        onMouseEnter={() => setHoverStates({ ctaContrate: true, ctaFreela: false })}
                        className="rounded-lg border-2 text-orange-600 border-orange-600 p-2 px-4 hover:bg-orange-600 hover:text-white transition"
                    >
                        Contrate freelancers
                    </button>
                </nav>
            </figure>
        </main>
    )
}