import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerRequest } from "../../../api/authApi";


const RegisterForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

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

    const validate = () => {

        const validationErrors = {};
    
        if (!formData.firstName.trim()) {
            validationErrors.firstName = "First name is required.";
        }
    
        if (!formData.lastName.trim()) {
            validationErrors.lastName = "Last name is required.";
        }
    
        if (!formData.email.trim()) {
            validationErrors.email = "Email is required.";
        }
    
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = "Invalid email.";
        }
    
        if (formData.password.length < 8) {
            validationErrors.password =
                "Password must be at least 8 characters.";
        }
    
        if (formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword =
                "Passwords do not match.";
        }
    
        setErrors(validationErrors);
    
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validate()) {
            return;
        }
    
        try {
    
            setLoading(true);
    
            await registerRequest({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
            });
    
            toast.success("Account created successfully.");
    
            navigate("/login");
    
        } catch (error) {
            console.log("Error has occuerd" + error)
            if (error.response?.status === 409) {
                toast.error("Email already exists.");
            } else {
                toast.error("Registration failed.");
            }
    
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >

            {/* First name */}
            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                    First Name
                </label>

                <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="
                        w-full
                        rounded-xl
                        border border-slate-300
                        px-4 py-2
                        outline-none
                        focus:border-blue-500
                    "
                />

                {errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.firstName}
                    </p>
                )}
            </div>


            {/* Last name */}
            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                    Last Name
                </label>

                <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="
                        w-full
                        rounded-xl
                        border border-slate-300
                        px-4 py-2
                        outline-none
                        focus:border-blue-500
                    "
                />

                {errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.lastName}
                    </p>
                )}
            </div>


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
                        border border-slate-300
                        px-4 py-2
                        outline-none
                        focus:border-blue-500
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
                        border border-slate-300
                        px-4 py-2
                        outline-none
                        focus:border-blue-500
                    "
                />

                {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.password}
                    </p>
                )}
            </div>


            {/* Confirm password */}
            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                    Confirm Password
                </label>

                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="
                        w-full
                        rounded-xl
                        border border-slate-300
                        px-4 py-2
                        outline-none
                        focus:border-blue-500
                    "
                />

                {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.confirmPassword}
                    </p>
                )}
            </div>


            <button
                type="submit"
                disabled={loading}
                className="
                    w-full
                    rounded-xl
                    bg-blue-600
                    py-2.5
                    font-medium
                    text-white
                    transition
                    hover:bg-blue-700
                    disabled:opacity-50
                "
            >
                {loading
                    ? "Creating account..."
                    : "Create Account"
                }
            </button>

        </form>
    );
};

export default RegisterForm;