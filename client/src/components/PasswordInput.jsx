import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ password, setPassword }) => {
    const [ hide, setHide ] = useState(true);
    return (
        <div className="flex relative">
            <input className="border text-lg rounded-full outline-none bg-transparent focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 font-bold text-white py-3 px-4 w-full mb-5 transition duration-200" type={`${hide ? "password" : "text"}`} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {hide ? <span onClick={() => setHide(!hide)} className="absolute right-5 top-4 cursor-pointer text-xl text-white" ><FaEyeSlash /></span> : <span onClick={() => setHide(true)} className="absolute right-5 top-4 cursor-pointer text-xl text-white" ><FaEye /></span>}
        </div>
    )
}

export default PasswordInput;