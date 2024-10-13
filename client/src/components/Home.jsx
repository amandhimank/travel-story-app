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
import EmptyCard from "./EmptyCard";
import { Day, DayPicker } from "react-day-picker";
import moment from "moment";
import FilterInfoTitle from "./FilterInfoTitle";
import { getEmptyCardImage, getEmptyCardMessage } from "../utils/helper";

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

    const [ searchQuery, setSearchQuery ] = useState('');
    const [ filterType, setFilterType ] = useState('');

    const [ dateRange, setDateRange ] = useState({ from: null, to: null });

    // Get User Info
    const getUserInfo = async () => {
        try {
            const response = await axios.get(API_URL + "/user/get-user", { withCredentials: true });
            if( response && response.data ) {
                setUserInfo(response.data.user);
            }
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
                toast.success("Story updated successfully");
                if (filterType === "search" && searchQuery) {
                    onSearchStory(searchQuery);
                } else if (filterType === "date") {
                    filterStoriesByDate(dateRange);
                } else {
                    getAllStories();
                }
            }
        }
        catch(err) {
            toast.error("An unexpected error occurred");
            console.log(err);
        }
    };

    const handleViewStory = (storyData) => {
        setOpenViewModal({ isShown: true, data: storyData });
    };

    const handleEdit = (data) => {
        setOpenAddEditModal({ isShown: true, type: "edit", data: data });
    }

    // Delete Story
    const deleteTravelStory = async (data) => {
        const storyId = data?._id;

        try {
            const response = await axios.delete(API_URL + "/story/delete-story/" + storyId, { withCredentials: true })
            if (response.data && !response.data.error) {
                toast.error("Story Deleted Successfully");
                setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))
                getAllStories();
            }
        }
        catch(err) {
            console.log(err);
            
        }
    }

    // Story Search
    const onSearchStory = async (query) => {
        try {
            const response = await axios.get(API_URL + "/story/search", {
                params: {
                    searchQuery: query,
                },
            }, { withCredentials: true });

            if (response.data && response.data.stories) {
                setFilterType("search");
                setAllStories(response.data.stories);
            }
        }
        catch (err) {
            console.log("An Unexpected error occurred, Please try again.");
            
        }
    }

    const handleClearSearch = () => {
        setFilterType("");
        getAllStories();
    }

    // handle filter stories by date range
    const filterStoriesByDate = async (day) => {
        try {
            const startDate = day.from ? moment(day.from).valueOf() : null;
            const endDate = day.to ? moment(day.to).valueOf() : null;

            if ( startDate && endDate ) {
                const response = await axios.get(API_URL + "/story/filter", {
                    params: {
                        startDate,
                        endDate
                    }
                }, { withCredentials: true });

                if (response.data && response.data.stories ) {
                    setFilterType("date");
                    setAllStories(response.data.stories);
                }
            }
        } catch (err) {
            console.log("An Unexpected error occurred, Please try again.");
        }
    }

    // Handle Date Range select
    const handleDayClick = (day) => {
        setDateRange(day);
        filterStoriesByDate(day);
    }

    const resetFilter = () => {
        setDateRange({ from: null, to: null });
        setFilterType("");
        getAllStories();
    }

    useEffect(() => {
        getAllStories();
        getUserInfo();
    }, [])

    return (
        <>
        <Navbar userInfo={userInfo} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearchStory={onSearchStory} handleClearSearch={handleClearSearch} />

            <div className="container mx-auto py-14">

                <FilterInfoTitle 
                    filterType={filterType}
                    filterDates={dateRange}
                    onClear={() => {
                        resetFilter();
                    }}
                />

                <div className="flex">
                    <div className="flex w-[70vw] pl-12">
                        {allStories.length > 0 ? (
                            <div className="flex flex-wrap gap-8 justify-start">
                                {allStories.map((item) => (
                                    <TravelStoryCard 
                                        key={item._id} 
                                        storyData={item} 
                                        isFavouriteClick={handleIsFavourite}  
                                        onClick={() => handleViewStory(item)}   
                                    />
                                ))}
                            </div>
                        ) : <EmptyCard image={getEmptyCardImage(filterType)} message={getEmptyCardMessage(filterType)} />}
                    </div>
                    <div className="">
                        <div className="bg-white border border-slate-300 shadow-lg shadow-slate-200/60 rounded-lg">
                            <div className="p-3">
                                <DayPicker
                                    mode="range"
                                    selected={dateRange}
                                    onSelect={handleDayClick}
                                    pagedNavigation
                                />
                            </div>
                        </div>
                    </div>
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

                    onDeleteClick={() => {
                        deleteTravelStory(openViewModal.data || null);
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