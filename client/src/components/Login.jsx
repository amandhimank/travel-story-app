import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";

const Login = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");

    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if(!email || !password) {
            setError("All fields are required");
            return;
        }
        setError("");

        // LOGIN API CALL
        try {
            const response = await axios.post(API_URL + "/user/login", { 
                email, password
            }, { withCredentials: true });

            // handle successful login response
            if (response.data && response.data.token) {
                navigate("/");
            }
        }
        catch(error) {
            console.log(error);
            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message); 
            }
            else {
                setError("An error occurred. Please try again.");
            }
        }
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-blue-900 to-sky-500">
            <div className="w-2/3 h-[80vh] bg-gray-900 bg-opacity-50 rounded-xl overflow-hidden flex flex-col md:flex-row shadow-xl">
                <div className="h-full w-[45%]">
                    <img src="https://i.pinimg.com/736x/47/0f/7d/470f7d88fbc00cb0420eea8cbde340c6.jpg" className="w-full h-full object-cover" />
                </div>
                <div className="h-full p-10 w-[50%]">
                    <h1 className="text-blue-600 text-5xl mb-9 font-bold">Login</h1>
                    <form onSubmit={handleLoginSubmit}>
                        <input className="border text-lg rounded-full outline-none bg-transparent focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 font-bold text-white py-3 px-4 w-full mb-8 transition duration-200" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <PasswordInput password={password} setPassword={setPassword} />
                        {error && <h1 className="text-lg text-red-500 font-semibold">{error}</h1>}
                        <button type="submit" className="w-full bg-blue-600 text-white text-xl rounded mt-3 mb-6 py-3 font-bold">LOGIN</button>
                    </form>
                    {/* <h1 className="text-xl text-white font-semibold">New User? <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link></h1> */}
                    <h1 className="text-xl text-white font-semibold text-center">or</h1>

                    <button className="w-full bg-white text-blue-600 text-xl rounded mt-3 mb-6 py-3 font-bold"><Link to="/signup">CREATE ACCOUNT</Link></button>
                </div>
            </div>
        </div>
    )
}

export default Login;