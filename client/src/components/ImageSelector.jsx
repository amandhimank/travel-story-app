import { useEffect, useRef, useState } from "react";
import { FaRegFileImage } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const ImageSelector = ({ image, setImage, handleImageDelete }) => {
    const inputRef = useRef(null);
    const [ previewUrl, setPreviewUrl ] = useState(null);
    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    }

    const onChooseFile = () => {
        inputRef.current.click();
    }

    const handleImageRemove = () => {
        setImage(null);

    }

    useEffect(() => {
        if (typeof image === "string") {
            setPreviewUrl(image);
        }
        else if (image) {
            setPreviewUrl(URL.createObjectURL(image));
        }
        else {
            setPreviewUrl(null);
        }

        return () => {
            if (previewUrl && typeof previewUrl === "string" && !image) {
                URL.revokeObjectURL(previewUrl);
            }
        }
    }, [image])

    return (
        <div className="">
            <input 
                type="file" 
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {!image ? (
                <button className="w-full h-48 flex flex-col items-center justify-center gap-1 bg-slate-50 border rounded border-slate-200" onClick={onChooseFile}>
                <div className="size-14 rounded-full flex items-center justify-center bg-cyan-100">
                    <FaRegFileImage className="text-xl text-cyan-500" />
                </div>
                <p className="text-slate-900">Browser image files to upload</p>
            </button>
            ) : (
                <div className="w-full h-48 relative">
                    <img src={previewUrl} alt="" className="w-full h-full object-cover rounded" />
                    <button className="size-9 bg-rose-50 rounded-lg flex items-center justify-center absolute top-2 right-2 hover:bg-rose-600 hover:border-2 hover:border-rose-50 text-rose-500 hover:text-rose-50 transition" onClick={handleImageRemove}>
                        <MdDeleteOutline className="text-xl" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ImageSelector;
