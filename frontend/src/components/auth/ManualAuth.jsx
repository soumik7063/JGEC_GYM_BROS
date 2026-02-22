import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const ManualAuth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { loginManual } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const endpoint = isLogin ? "/manual-login" : "/register";
        const payload = isLogin
            ? { email: formData.email, password: formData.password }
            : formData;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data.success) {
                toast.success(data.message);
                if (isLogin || endpoint === "/register") {
                    loginManual(data.user, data.token);
                }
            } else {
                toast.error(data.message || "Authentication failed");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="panel mt-6 w-full max-w-md p-8 shadow-2xl">
            <div className="mb-8 text-center">
                <h2 className="section-title mb-2 text-2xl font-bold">
                    {isLogin ? "Welcome Back" : "Join the Gym Bros"}
                </h2>
                <p className="text-muted text-sm">
                    {isLogin
                        ? "Sign in to continue your progress"
                        : "Create an account to start tracking"}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                    <div>
                        <label className="mb-2 block text-sm font-semibold">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800/50"
                            placeholder="Enter Your Name"
                        />
                    </div>
                )}

                <div>
                    <label className="mb-2 block text-sm font-semibold">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800/50"
                        placeholder="gym@jgec.edu"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800/50"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="primary-btn w-full py-3 text-lg transition-all active:scale-95 disabled:opacity-70"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        isLogin ? "Sign In" : "Create Account"
                    )}
                </button>
            </form>

            <div className="mt-6 text-center text-sm">
                <span className="text-muted">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                </span>
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="font-bold text-blue-500 hover:underline"
                >
                    {isLogin ? "Sign Up" : "Sign In"}
                </button>
            </div>
        </div>
    );
};

export default ManualAuth;
