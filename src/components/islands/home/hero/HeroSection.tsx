
import BidWorkMark from "@/assets/mark/bid-work-mark.svg";
import BidWorksMark from "@/assets/mark/BidWorks.svg"
import { useState } from "react";
import LoginModal from "../../cta-modal/login/LoginModal";



export default function HeroSection() {
    const [hoverStates, setHoverStates] = useState({
        ctaFreela: true,
        ctaContrate: false
    })


    return (
        <main className="w-full flex flex-col justify-center h-[90vh] pt-24">
            <figure
                className="w-full flex flex-col items-center justify-center mt-24 h-max p-3"
            >
                <img
                    className="w-full md:max-w-md max-w-sm select-none mb-24"
                    src={BidWorksMark.src}
                    alt=""
                />

                <div
                    className="relative flex md:flex-row flex-col w-full items-center justify-center py-12 text-center font-bold md:space-x-8 space-x-0 md:space-y-0 space-y-3 *:transition-all *:duration"
                >
                    <div onMouseEnter={() => setHoverStates({ ctaContrate: false, ctaFreela: true })} className={`flex flex-col items-center gap-5`}>
                        <span className={`z-10 ease-in-out text-2xl max-w-md`}>
                            Conquiste liberdade e flexibilidade trabalhando em projetos globais
                        </span>

                        <LoginModal >
                            <p className="rounded-lg p-2 px-4 text-white text-sm border-2 border-blue-600 bg-blue-600 hover:brightness-125 transition cursor-pointer">Encontre trabalhos</p>
                        </LoginModal>
                    </div>

                    <div className={`z-0 md:h-36 h-px md:w-px w-full mx-10 bg-neutral-900`}></div>

                    <div onMouseEnter={() => setHoverStates({ ctaContrate: true, ctaFreela: false })} className="flex flex-col items-center gap-5">
                        <span className={`z-10 ease-in-out text-2xl max-w-md`}>
                            Contrate freelancers especializados e obtenha resultados excepcionais
                        </span>

                        <button
                            className="rounded-lg border-2 text-orange-600 border-orange-600 p-2 px-4 hover:bg-orange-600 hover:text-white transition"
                        >
                            Contratar freelancers
                        </button>
                    </div>
                </div>
                <nav
                    className="flex w-full max-w-lg justify-around md:text-md text-sm gap-3 font-bold *:cursor-pointer"
                >


                </nav>
            </figure>
        </main>
    )
}