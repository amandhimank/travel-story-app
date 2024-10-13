import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <div className="w-80 h-full py-1 flex items-center justify-between px-4 bg-slate-100 rounded-md">
            <input type="text" placeholder="Search Stories..." className="w-full bg-transparent outline-none py-1 font-medium" onChange={onChange} value={value} />

            {
                value && <MdClose className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3" onClick={onClearSearch} />
            }

            <FaMagnifyingGlass className="text-slate-500 cursor-pointer hover:text-black" onClick={handleSearch} />            
        </div>
    )
}

export default SearchBar;