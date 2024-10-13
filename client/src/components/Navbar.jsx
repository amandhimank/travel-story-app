import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logoipsum.svg";
import ProfileInfo from "./ProfileInfo";
import axios from "axios";
import { API_URL } from "../utils/constants";
import SearchBar from "./SearchBar";
import { useAuth } from "../utils/AuthContext";

const Navbar = ({ userInfo, searchQuery, setSearchQuery, onSearchStory, handleClearSearch }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        logout();
        navigate("/login");
    }

    const handleSearch = () => {
        if (searchQuery) {
            onSearchStory(searchQuery);
        }
    }

    const OnClearSearch = () => {
        handleClearSearch();
        setSearchQuery("");
    }

    return (
        <div className="bg-white shadow-md flex items-center justify-between px-4 py-2">
            <h1 className="text-2xl font-bold text-cyan-500 tracking-tighter cursor-pointer select-none" onClick={() => navigate("/")}>Travel<span className="italic">Story</span></h1>
            <SearchBar 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                handleSearch={handleSearch} 
                onClearSearch={OnClearSearch} 
            />
            <ProfileInfo userInfo={userInfo} handleLogout={handleLogout} />
    
        </div>
    )   
}

export default Navbar;