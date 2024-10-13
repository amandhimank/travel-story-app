import { MdAdd, MdCancel, MdClose, MdDeleteOutline, MdUpdate } from "react-icons/md";
import DateSelector from "./DateSelector";
import { useState } from "react";
import ImageSelector from "./ImageSelector";
import TagInput from "./TagInput";
import axios from "axios";
axios.defaults.withCredentials = true;
import moment from "moment";
import { toast } from "react-toastify";
import uploadImage from "../utils/uploadImage";
import { API_URL } from "../utils/constants";

const AddEditTravelStory = ({ storyInfo, type, onClose, getAllStories }) => {
    const [ title, setTitle ] = useState(storyInfo?.title || "");
    const [ story, setStory ] = useState(storyInfo?.story || "");
    const [ storyImage, setStoryImage ] = useState(storyInfo?.imageUrl || "");
    const [ visitedLocation, setVisitedLocation ] = useState(storyInfo?.visitedLocation || []);
    const [ error, setError ] = useState(null);
    const [ visitedDate, setVisitedDate ] = useState(null);

    // Delete story image and update the story
    const handleImageDelete = async () => {
        // deleteing the img
        const deleteImg = await axios.delete(API_URL + "/story/delete-image", {
            params: {
                imageUrl: storyInfo.imageUrl,
            },
        }, { withCredentials: true })

        if (deleteImg.data) {
            const storyId = storyInfo._id;

            const postData = {
                title,
                story,
                visitedLocation,
                visitedDate: moment().valueOf(),
                imageUrl: "",
            };

            // updating story
            const response = await axios.post(API_URL + "/story/edit-story/" + storyId, postData, { withCredentials: true });
            setStoryImage(null);    
        }
    }

    const addNewTravelStory = async () => {
        try {
            let imageUrl = "";
            // upload image if present
            if (storyImage) {
                const imgUploadRes = await uploadImage(storyImage);
                // Get image URL
                imageUrl = imgUploadRes.imageUrl || "";
            }

            const response = await axios.post(API_URL + "/story/add-travel-story", {
                title, 
                story, 
                imageUrl: imageUrl || "", 
                visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(), 
                visitedLocation
            }, { withCredentials: true });

            if (response.data && response.data.story) {
                toast.success("Travel story added successfully");
                // Refresh stories
                getAllStories();
                // Close the modal
                onClose();
            }
        }
        catch (error) {
            console.error("Error adding new travel story:", error);
            toast.error("Failed to add new travel story. Please try again.");
        }
    }

    const updateTravelStory = async () => {
        try {
            let imageUrl = "";
            
            var postData = {
                title, 
                story, 
                imageUrl: storyInfo.imageUrl || "", 
                visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(), 
                visitedLocation
            }

            if(typeof storyImage === "object") {
                // upload new image
                const imgUploadRes = await uploadImage(storyImage);
                // Get image URL
                imageUrl = imgUploadRes.imageUrl || "";

                postData = {...postData, imageUrl: imageUrl};
            }

            const response = await axios.post(API_URL + `/story/edit-story/${storyInfo._id}`, postData, { withCredentials: true });

            if (response.data && response.data.story) {
                toast.success("Travel story updated successfully");
                // Refresh stories
                getAllStories();
                // Close the modal
                onClose();
            }
        }
        catch (error) {
            console.error("Error adding new travel story:", error);
            toast.error(error?.message);
        }
    }

    const handleAddOrUpdateStory = () => {
        console.log("Input Data:", {title, story, storyImage, visitedDate, visitedLocation});

        if(!title) {
            setError("Title is required");
            return;
        }

        if(!story) {
            setError("Story is required");
            return;
        }

        if (type === "add") {
            addNewTravelStory();
        } else {
            updateTravelStory();
        }
    }

    return (
        <div className="model-box">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold text-slate-900">{ type === "add" ? "Add New Travel Story" : "Edit Travel Story" }</h1>

                <div className="flex items-center gap-2">
                {type === "add" ? (
                    <button className="flex items-center gap-1 bg-cyan-50 py-1 px-2 text-cyan-500 hover:bg-cyan-500 hover:text-white transition font-semibold rounded-md" onClick={() => {handleAddOrUpdateStory()}}>
                    <MdAdd className="text-lg" /> ADD STORY
                </button>
                ) : (
                    <>
                        <button className="flex items-center gap-1 bg-cyan-50 py-1 px-2 text-cyan-500 font-semibold rounded-md hover:bg-cyan-500 hover:text-white transition" onClick={() => {handleAddOrUpdateStory()}}>
                            <MdUpdate className="text-lg" /> UPDATE STORY
                        </button>

                        <button className="flex items-center gap-1 bg-rose-50 py-1 px-2 text-rose-500 font-semibold rounded-md hover:bg-rose-500 hover:text-white transition" onClick={onClose}>
                            <MdDeleteOutline className="text-lg" /> DELETE
                        </button>
                        
                    </>
                )}

                <button className="text-2xl cursor-pointer bg-cyan-50 p-1 text-cyan-600" onClick={onClose}>
                <MdClose className="" />
                </button>
                </div>
                
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div>
                <div className="flex-1 flex flex-col gap-1 pt-4">
                    <label className="font-bold text-slate-400">TITLE</label>
                    <input className="outline-none border-b-2 text-slate-950 text-xl font-medium" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="A day at great wall" />
                </div>
                

                <div className="my-3">
                    <DateSelector date={visitedDate} setDate={setVisitedDate} />
                </div>
            </div>

            <ImageSelector image={storyImage} setImage={setStoryImage} handleImageDelete={handleImageDelete} />

            <div className="flex flex-col gap-1 mt-6">
                <label className="font-bold text-slate-400">STORY</label>
                <textarea className="p-2 outline-none text-slate-950 text-xl font-medium bg-slate-50" type="text" value={story} onChange={(e) => setStory(e.target.value)} placeholder="Your Story" rows={5} />
            </div>

            <div className="pt-3">
                <label className="font-semibold">VISITED LOCATIONS</label>
                <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
            </div>
        </div>
    )
}

export default AddEditTravelStory;