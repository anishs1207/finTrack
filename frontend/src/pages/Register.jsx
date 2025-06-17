import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data } = await axios.get("/api/v1/user/session", {
                    withCredentials: true,
                });
                if (data) {
                    navigate("/dashboard");
                }
            } catch (error) {
                console.log("User not Registered in");
            }
        };

        checkSession();
    }, [navigate]);

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            const { data } = await axios.post(
                "/api/v1/user/register",
                {
                    email: email.includes("@") ? email : undefined,
                    fullName,
                    username,
                    password,
                },
                { withCredentials: true }
            );

           

            if (data.message == "User Already Exists") {
                setErrorMsg("User Already Exitsts")
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                navigate('/dashboard')
            }



        } catch (err) {
            console.log(err);
            setErrorMsg(err.response?.data?.message || "Register failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-semibold mb-6 text-center">Register</h1>

                {errorMsg && (
                    <p className="text-red-500 text-center mb-4">{errorMsg}</p>
                )}

                <form onSubmit={handleSubmitRegister} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-lg mb-2">Email:</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            name="email"
                            id="email"
                            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="fullName" className="block text-lg mb-2">Full Name:</label>
                        <input
                            type="text"
                            placeholder="Enter Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            name="fullName"
                            id="fullName"
                            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-lg mb-2">Username:</label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            name="username"
                            id="username"
                            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* 🔹 Password Field with Eye Toggle */}
                    <div>
                        <label htmlFor="password" className="block text-lg mb-2">Password:</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder=""
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                id="password"
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

                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
