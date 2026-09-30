import { useState } from "react"

const EditProfileForm = ({
    data,
    onSubmit
}) => {
    
    const [formData, setFormData] = useState({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
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

        if(!formData.firstName.trim()){
            validationErrors.firstName = 
                "First name cannot be empty"
        }

        if(!formData.lastName.trim()){
            validationErrors.lastName = 
                "Last name cannot be empty"
        }

        if(!formData.email.trim()){
            validationErrors.email = 
                "Email cannot be empty"
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            validationErrors.email =
            "Please enter a valid email address";
        }

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        onSubmit({
            ...formData
        });
    };

    return(
        <form
            id="rename-form"
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            {/* First name */}
            <label className="mb-1 block text-sm font-medium text-slate-700">
                First name:
            </label>

            <input 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
             />

            {/* First name error message*/}
            {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                    {errors.firstName}
                </p>
            )}

            {/* Last name */}
            <label className="mb-1 block text-sm font-medium text-slate-700">
                Last name:
            </label>

            <input 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
             />

            {/* Last name error message*/}
            {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                    {errors.lastName}
                </p>
            )}

            {/* Email */}
            <label className="mb-1 block text-sm font-medium text-slate-700">
                Email:
            </label>

            <input 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
             />

            {/* Email error message*/}
            {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                    {errors.email}
                </p>
            )}

            <button type="submit" hidden></button>

        </form>
    )
}
export default EditProfileForm;