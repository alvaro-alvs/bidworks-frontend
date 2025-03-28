import Navbar from "../global/navbar/Navbar"
import HeroSection from "./HeroSection"
import FreelasSection from "./main-freelas/FreelasSection"


export default function HomeLayout() {

    return (
        <section className="w-full h-full min-h-screen">
            <Navbar />

            <article className="space-y-24">
                <HeroSection />

                <FreelasSection />
            </article>
        </section>
    )
}