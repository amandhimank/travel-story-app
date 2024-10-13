import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";
import TravelStoryCard from "./TravelStoryCard";
import { MdAdd } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import AddEditTravelStory from "./AddEditTravelStory";
import ViewTravelStory from "./ViewTravelStory";

const Home = () => {
    const [ userInfo, setUserInfo ] = useState(null);
    const [ allStories, setAllStories ] = useState([]);  
    const [ openAddEditModal, setOpenAddEditModal ] = useState({
        isShown: false,
        type: "add",
        data: null
    });
    const [ openViewModal, setOpenViewModal ] = useState({
        isShown: false,
        data: null
    });
    const navigate = useNavigate();

    // Get User Info
    const getUserInfo = async () => {
        try {
            const response = await axios.get(API_URL + "/user/get-user", { withCredentials: true });
            if( response && response.data ) {
                setUserInfo(response.data.user);
            }
            console.log(response);
        }
        catch(err) {
            console.log(err);
        }
    }

    // Get All Stories
    const getAllStories = async () => {
        try {
            const response = await axios.get(API_URL + "/story/get-all-stories", { withCredentials: true });
            if(response && response.data && response.data.stories) {
                setAllStories(response.data.stories);
            }
            console.log(response);
            console.log("Successfully fetched all stories");
        }
        catch(err) {
            console.log(err);
        }
    }

    const handleIsFavourite = async (storyData) => {
        const storyId = storyData._id;

        try {
            const response = await axios.put(API_URL + `/story/update-is-favourite/${storyId}`, { isFavourite: !storyData.isFavourite }, { withCredentials: true });

            if(response && response.data.story) {
                getAllStories();
                toast.success("Story updated successfully");
            }
        }
        catch(err) {
            toast.error("An unexpected error occurred");
            console.log(err);
        }
    };

    const handleViewStory = (storyData) => {
        console.log("Handle view");
        setOpenViewModal({ isShown: true, data: storyData });
    };

    const handleEdit = (data) => {
        setOpenAddEditModal({ isShown: true, type: "edit", data: data });
    }

    useEffect(() => {
        getAllStories();
        getUserInfo();
    }, [])

    return (
        <>
            <Navbar userInfo={userInfo} />

            <div className="container mx-auto py-14">
                <div className="flex justify-between">
                    <div className="flex w-[65vw] px-20">
                        {allStories.length > 0 ? (
                            <div className="flex flex-wrap gap-10 justify-start">
                                {allStories.map((item) => (
                                    <TravelStoryCard 
                                        key={item._id} 
                                        storyData={item} 
                                        isFavouriteClick={handleIsFavourite}  
                                        onClick={() => handleViewStory(item)}   
                                    />
                                ))}
                            </div>
                        ) : <h1>No stories found</h1>}
                    </div>
                    <div className="w-[35vw]"></div>
                </div>
            </div>
            
            {/* Add and Edit Travel Story Modal */}
            <Modal 
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => {}}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex:999
                    }
                }}
                appElement={document.getElementById("root")}
                className="modal-box"
            >
                <AddEditTravelStory 
                    type={openAddEditModal.type}
                    storyInfo={openAddEditModal.data}
                    onClose={() =>{
                        setOpenAddEditModal({ isShown: false, type: "add", data: null });
                    }}
                    getAllStories={getAllStories}
                />
            </Modal>

            {/* View Travel Story Modal */}
            <Modal 
                isOpen={openViewModal.isShown}
                onRequestClose={() => {}}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex:999
                    }
                }}
                appElement={document.getElementById("root")}
                className="modal-box"
            >
                <ViewTravelStory 
                    storyInfo={openViewModal.data || null}
                    onClose={() =>{
                        setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
                    }} 
                    
                    onEditClick={() => {
                        setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
                        handleEdit(openViewModal.data || null);
                    }}
                />
            </Modal>

            <button className="h-16 w-16 flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-600 fixed bottom-10 right-10 transition duration-200" onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}>
                <MdAdd className="text-[32px] text-white" />
            </button>

            <ToastContainer />
        </>
    )
}

export default Home;