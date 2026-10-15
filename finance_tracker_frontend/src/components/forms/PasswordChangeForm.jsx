import { useState } from "react"

const PasswordChangeForm = ({
    onSubmit
}) => {
    
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState({});

    const handleChange = (e) =>{
        
        const {
            name,
            value
        } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        setErrors(prev => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = (e) =>{
        
        e.preventDefault();

        const validationErrors = {};

        if(!formData.oldPassword.trim()){
            validationErrors.oldPassword = 
                "Current password is required"
        }

        if (!formData.newPassword.trim()) { 
            validationErrors.newPassword = "New password is required"; 
        } else if (formData.newPassword.length < 8) { 
            validationErrors.newPassword = "Password must be at least 8 characters"; 
        }

        if (!formData.confirmPassword.trim()) { 
            validationErrors.confirmPassword = "Please confirm your new password"; 
        } else if (formData.newPassword !== formData.confirmPassword) { 
            validationErrors.confirmPassword = "Passwords do not match"; }


        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        onSubmit({
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword
        });
    };

    return(
        <form
            id="change-password-form"
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            {/* Old password */}
            <label className="mb-1 block text-sm font-medium text-slate-700">
                Old password:
            </label>

            <input
                type="password" 
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
             />

            {/* Old password error message*/}
            {errors.oldPassword && (
                <p className="mt-1 text-sm text-red-500">
                    {errors.oldPassword}
                </p>
            )}

            {/* New password */}
            <label className="mb-1 block text-sm font-medium text-slate-700">
                New password:
            </label>

            <input
                type="password" 
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
             />

            {/* Last name error message*/}
            {errors.newPassword && (
                <p className="mt-1 text-sm text-red-500">
                    {errors.newPassword}
                </p>
            )}

            {/* Confirm new password */}
            <label className="mb-1 block text-sm font-medium text-slate-700">
                Confirm new password:
            </label>

            <input 
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
             />

            {/* Email error message*/}
            {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword}
                </p>
            )}

            <button type="submit" hidden></button>

        </form>
    )
}
export default PasswordChangeForm;