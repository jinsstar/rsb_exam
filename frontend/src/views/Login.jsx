import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // New state for toggling password visibility
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/login", {
                email,
                password,
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("userName", response.data.name);
            localStorage.setItem("id", response.data.id); // Save the user's name
    
            // Navigate based on role
            const roleRoutes = {
                Admin: "/admin",
                user: "/user",
            };
            navigate(roleRoutes[response.data.role] || "/"); // Default route if role is unknown
        } catch (err) {
            setError(err.response.data.error);
            setStatus(err.response.data?.status);
            setStudentID(err.response.data?.studentId)
            console.error(err.response.data);
        }
    };


    return (
        <div className="w-full h-full"> 
        <title>Login</title>
            <div className="w-full h-screen flex flex-col bg-[#25632D]">
                <form onSubmit={handleSubmit} className="flex">
                    <div className="w-1/2 h-full justify-center flex items-center flex-col">
                        <p className="text-white font-semibold text-4xl">Exam System</p>
                    </div>
                    <div className="w-1/2 h-screen flex flex-col justify-center items-center">
                        <div className="w-96 h-fit bg-white flex flex-col justify-center items-center gap-3 rounded-3xl p-14">

                            <p className="font-semibold text-black text-2xl">Login</p>
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-72 h-10 outline outline-slate-300 rounded-lg outline-1 p-3"
                            />
                            <div className="relative w-72">
                                <input
                                    type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full h-10 outline outline-slate-300 rounded-lg outline-1 p-3"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                                    className="absolute right-3 top-2 text-gray-500"
                                >
                                    {showPassword ? "Hide" : "Show"} {/* Button text changes dynamically */}
                                </button>
                            </div>
                            <button 
                                type="submit"
                                className="w-72 h-10 bg-[#E4CF3D] rounded-lg text-white hover:text-white hover:bg-blue-500"
                            >Login    
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default Login;
