import { Link } from "react-router-dom";
import { getInitials } from "../utils/helper";

const ProfileInfo = ({ userInfo, handleLogout }) => {
    return (
        userInfo && <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold ">{getInitials(userInfo.fullname)}</div>
            <div className="flex flex-col gap-1">
                <h1 className="font-medium ">{userInfo.fullname}</h1>
                <Link className="underline text-cyan-500 font-bold" to="/login" onClick={handleLogout}>Logout</Link>
            </div>
        </div>
    )
}

export default ProfileInfo;