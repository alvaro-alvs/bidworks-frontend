import googleOAuthService from "@/services/google-oauth.service";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "@/assets/icons/Google.svg"


export default function GoogleLoginButton() {

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async codeData => {
            const { status, data } = await googleOAuthService({ access_token: codeData.access_token })

            if (status === 'ok') {
                console.log(data);
            } else {
                window.alert('Login Failed')
            }
        },
        onError: () => {
            console.log('Login Failed');
            window.alert('Login Failed 2')
        },
    });

    return (
        <div onClick={() => handleGoogleLogin()} className="p-3 border-neutral-800 border-2 rounded hover:fill-white hover:shadow-[0_8px_0_#737373] hover:-translate-y-2 active:translate-y-0 active:shadow-[0_0_0_#737373] transition cursor-pointer">
            <img className="w-6" src={GoogleIcon.src} alt="" />
        </div>
    )
}