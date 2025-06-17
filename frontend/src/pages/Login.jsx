import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

function Login() {
    const [identifier, setIdentifier] = useState(""); // Can be email or username
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data } = await axios.get("/api/v1/user/session", {
                    withCredentials: true,
                });

                if (data?.data?.user) {
                    navigate("/dashboard");
                }
            } catch (error) {
                console.log("User not logged in");
            }
        };

        checkSession();
    }, []);


    useEffect(() => {
        const token = document.cookie.split(";").find(row => row.startsWith("accessToken"));
        if (token) navigate('/invoice');
    }, [navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            const { data } = await axios.post(
                "/api/v1/user/login",
                {
                    email: identifier.includes("@") ? identifier : undefined,
                    username: identifier.includes("@") ? undefined : identifier,
                    password,
                },
                { withCredentials: true }
            );
            navigate("/dashboard");
        } catch (err) {
            console.error("Login error:", err);
            setErrorMsg(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-semibold mb-6 text-center">Login</h1>

                {errorMsg && (
                    <p className="text-red-500 text-center mb-4">{errorMsg}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Identifier Input */}
                    <div>
                        <label className="block text-lg mb-2">Email or Username:</label>
                        <input
                            type="text"
                            placeholder="Enter email or username"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password Input with Eye Icon */}
                    <div>
                        <label className="block text-lg mb-2">Password:</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                            >
                                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
