import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
axios.defaults.withCredentials = true;


const Signup = () => {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if(!name || !email || !password) {
            setError("All fields are required");
            return;
        }
        setError(""); 

        // LOGIN API CALL
        try {
            const response = await axios.post(API_URL + "/user/create-account", { 
                "fullname": name, 
                email, 
                password 
            }, { withCredentials: true });

            // handle successful signup response
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
                   <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1604156788856-2ce5f2171cce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>
                <div className="h-full p-10 w-[50%]">
                    <h1 className="text-blue-600 text-5xl mb-9 font-bold">Signup</h1>
                    <form onSubmit={handleSignup}>
                        <input className="border text-lg rounded-full outline-none bg-transparent focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 font-bold text-white py-3 px-4 w-full mb-6 transition duration-200" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input className="border text-lg rounded-full outline-none bg-transparent focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 font-bold text-white py-3 px-4 w-full mb-6 transition duration-200" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <PasswordInput password={password} setPassword={setPassword} />
                        {error && <h1 className="text-lg text-red-500 font-semibold">{error}</h1>}
                        <button type="submit" className="w-full bg-blue-600 text-white text-xl rounded mt-3 mb-4 py-3 font-bold">Signup</button>
                    </form>
                    <h1 className="text-xl text-white font-semibold">Already an user? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></h1>
                </div>
            </div>
        </div>
    )
}

export default Signup;