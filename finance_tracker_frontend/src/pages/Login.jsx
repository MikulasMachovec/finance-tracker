import { Link, Navigate } from "react-router-dom";
import { useSession } from "../context/sessionProvider";
import BackgroundCard from "../components/ui/BackgroundCard";
import LoginForm from "../components/forms/auth/LoginForm";


const Login = () => {

    const { session } = useSession();

    if (session.status === "authenticated"){
        return <Navigate to="/" replace />
    }
        return (
            <div
            className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-slate-50
                px-4
            "
        >
            <BackgroundCard
                className="w-full max-w-md"
                title="Welcome Back"
                subtitle="Sign in to your Finance Tracker account."
            >
                <div className="mt-6">
                    <LoginForm />
                </div>

                <p className="mt-6 text-center text-sm text-slate-500">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="
                            font-medium
                            text-blue-600
                            hover:text-blue-700
                        "
                    >
                        Create one
                    </Link>
                </p>
            </BackgroundCard>
        </div>  
        )

}
export default Login;