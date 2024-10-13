import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logoipsum.svg";
import ProfileInfo from "./ProfileInfo";
import axios from "axios";
import { API_URL } from "../utils/constants";

const Navbar = ({ userInfo }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const response = await axios.get(API_URL + "/user/logout", { withCredentials: true });
        console.log(response);
        if(response && response.data.success) {
            navigate("/login");
        }
    }

    return (
        <div className="bg-white shadow-md flex items-center justify-between px-4 py-2">
            <img className="h-6 " src={logo} alt="logo" />
            <ProfileInfo userInfo={userInfo} handleLogout={handleLogout} />
        </div>
    )   
}

export default Navbar;