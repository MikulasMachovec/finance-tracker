import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useSession } from "../../../context/sessionProvider";
import Button from "../../ui/Button";

const LoginForm = () => {

    const navigate = useNavigate();
    const { login } = useSession();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        setErrors(prev => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (!formData.email.trim()) {
            validationErrors.email = "Email is required.";
        }

        if (!formData.password.trim()) {
            validationErrors.password = "Password is required.";
        }

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        try {

            const success = await login(formData);

            if (!success) {
                toast.error("Invalid email or password.");
                return;
            }

            toast.success("Welcome back!");

            navigate("/");

        } catch (error) {

            toast.error("Something went wrong.");

        } finally {

            setLoading(false);

        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >

            {/* Email */}

            <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">
                    Email
                </label>

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-2
                        focus:border-blue-500
                        focus:outline-none
                    "
                />

                {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.email}
                    </p>
                )}

            </div>

            {/* Password */}

            <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">
                    Password
                </label>

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-2
                        focus:border-blue-500
                        focus:outline-none
                    "
                />

                {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.password}
                    </p>
                )}

            </div>

            <Button
                type="submit"
                className="w-full"
                disabled={loading}
            >
                {loading ? "Signing in..." : "Sign In"}
            </Button>

        </form>
    );
};

export default LoginForm;