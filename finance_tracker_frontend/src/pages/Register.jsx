import { Link } from "react-router-dom";
import RegisterForm from "../components/forms/auth/RegisterForm";

const Register = () => {

    return (
        <div
            className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-slate-50
                px-4
            "
        >

            <div
                className="
                    w-full
                    max-w-md
                    rounded-2xl
                    bg-white
                    border border-slate-200
                    shadow-sm
                    p-8
                "
            >

                <div className="mb-6 text-center">

                    <h1
                        className="
                            text-2xl
                            font-bold
                            text-slate-800
                        "
                    >
                        Create Account
                    </h1>

                    <p
                        className="
                            mt-2
                            text-sm
                            text-slate-500
                        "
                    >
                        Register to start managing your finances.
                    </p>

                </div>


                <RegisterForm />


                <div
                    className="
                        mt-6
                        text-center
                        text-sm
                        text-slate-500
                    "
                >
                    Already have an account?

                    <Link
                        to="/login"
                        className="
                            ml-1
                            font-medium
                            text-blue-600
                            hover:text-blue-700
                        "
                    >
                        Login
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default Register;