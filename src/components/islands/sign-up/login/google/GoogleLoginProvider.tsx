import { GoogleOAuthProvider } from "@react-oauth/google";




export default function GoogleLoginProvider({ children, google_client_id }: { children: React.ReactNode, google_client_id: string }) {

    return (
        <GoogleOAuthProvider clientId={google_client_id}>
            {children}
        </GoogleOAuthProvider>
    )
}