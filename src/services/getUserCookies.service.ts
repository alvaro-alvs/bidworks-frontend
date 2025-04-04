import type { AstroCookies } from "astro";


export default async function getUserCookie({ cookies }: { cookies: AstroCookies }) {

    if (cookies.get('usuario')) {

        return JSON.parse(cookies.get('usuario').value)
    }
}