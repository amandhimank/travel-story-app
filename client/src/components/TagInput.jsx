import { useState } from "react";
import { MdAdd, MdClose, MdLocationOn } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
    const [ inputValue, setInputValue ] = useState("");

    const addNewTag = () => {
        if (inputValue.trim() !== "") {
            setTags([ ...tags, inputValue.trim() ]);
            setInputValue("");
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter") {
            addNewTag();
        }
    }

    const handleRemoveTag = (tag) => {
        const newTags = tags.filter((t) => t !== tag);
        setTags(newTags);
    }

    return (
        <div>
            {tags.length > 0 && (
                <div className="flex gap-2">
                    {tags.map((tag, index) => {
                        return <h1 key={index} className="bg-cyan-100 flex gap-1 items-center text-cyan-500 px-2 py-1 rounded-md w-fit font-semibold">
                            <MdLocationOn className="text-xl" />
                            { tag }
                            <button onClick={() => handleRemoveTag(tag)}>
                                <MdClose />
                            </button>
                        </h1>
                    })}
                </div>
            )}
            <div className="flex items-center gap-2 mt-3">
                <input type="text" className="bg-transparent border px-2 py-2 rounded outline-none font-medium" placeholder="Add Location" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} />

                <button className="border-2 border-cyan-500 hover:text-white text-cyan-500 rounded transition hover:bg-cyan-500 px-2 py-2" onClick={addNewTag}>
                    <MdAdd className="text-2xl " />
                </button>
            </div>
        </div>
    )
}

export default TagInput;