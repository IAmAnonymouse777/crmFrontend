import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit
    } = useForm();

    const onSubmit = async (data) => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/user/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    credentials: "include",

                    body: JSON.stringify(data)
                }
            );

            const result = await response.text();

            if (!response.ok) {
                alert(result);
                return;
            }

            alert("Registration successful!");

            navigate("/login");

        } catch (error) {

            alert("Server error");

        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">

            {/* Background Glow */}

            <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>

            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>


            {/* Register Card */}

            <div className="relative w-full max-w-md">

                <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-8">

                    {/* Logo / Heading */}

                    <div className="text-center mb-8">

                        <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">

                            <span className="text-2xl font-bold text-white">
                                C
                            </span>

                        </div>

                        <h1 className="text-3xl font-bold text-white">
                            Create Account
                        </h1>

                        <p className="text-slate-400 mt-2 text-sm">
                            Create your CRM account to get started
                        </p>

                    </div>


                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Name */}

                        <div className="mb-5">

                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full h-12 px-4 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                {...register("name", {
                                    required: true
                                })}
                            />

                        </div>


                        {/* Email */}

                        <div className="mb-5">

                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full h-12 px-4 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                {...register("email", {
                                    required: true
                                })}
                            />

                        </div>


                        {/* Password */}

                        <div className="mb-6">

                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Create a strong password"
                                className="w-full h-12 px-4 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                {...register("password", {
                                    required: true
                                })}
                            />

                        </div>


                        {/* Register Button */}

                        <button
                            type="submit"
                            className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition duration-200 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30"
                        >
                            Create Account
                        </button>

                    </form>


                    {/* Login */}

                    <div className="text-center mt-7 pt-6 border-t border-slate-800">

                        <p className="text-sm text-slate-400">

                            Already have an account?

                            <button
                                className="ml-2 text-indigo-400 hover:text-indigo-300 font-semibold transition"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </button>

                        </p>

                    </div>

                </div>


                {/* Bottom Text */}

                <p className="text-center text-xs text-slate-600 mt-5">
                    Secure CRM • Manage your customers with ease
                </p>

            </div>

        </div>
    );
}

export default Register;

