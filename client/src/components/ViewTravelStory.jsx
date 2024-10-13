import moment from "moment";
import { GrMapLocation } from "react-icons/gr";
import { MdClose, MdDeleteOutline, MdUpdate } from "react-icons/md";

const ViewTravelStory = ({ storyInfo, onClose, onEditClick, onDeleteClick }) => {
    return (
        <div className="model-box relative">
            <div className="flex justify-end items-center">
                <div className="flex items-center gap-2">     
                    <button className="flex items-center gap-1 bg-cyan-50 py-1 px-2 text-cyan-500 font-semibold rounded-md hover:bg-cyan-500 hover:text-white transition" onClick={onEditClick}>
                            <MdUpdate className="text-lg" /> UPDATE STORY
                        </button>

                        <button className="flex items-center gap-1 bg-rose-50 py-1 px-2 text-rose-500 font-semibold rounded-md hover:bg-rose-500 hover:text-white transition" onClick={onDeleteClick}>
                            <MdDeleteOutline className="text-lg" /> DELETE
                        </button>

                        <button className="text-2xl cursor-pointer bg-cyan-50 p-1 text-cyan-600" onClick={onClose}>
                            <MdClose className="" />
                        </button>
                    </div>
                
                </div>

            <div>
                <div className="flex flex-col gap-4 py-4">
                    <h1 className="text-2xl text-slate-950 font-medium">{storyInfo && storyInfo.title}</h1>

                    <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">{storyInfo && moment(storyInfo.visitedDate).format('Do MMM YYYY')}</span>

                        <div className="text-cyan-600 font-medium gap-2 flex items-center bg-cyan-200/40 rounded px-2 py-1">
                            <GrMapLocation className="text-lg" />
                            {storyInfo && storyInfo.visitedLocation.join(", ")}
                        </div>
                    </div>

                    <div className="w-full h-80 rounded-md overflow-hidden">
                        <img className="w-full h-full object-cover hover:scale-[1.02] transition duration-300" src={storyInfo && storyInfo.imageUrl} alt="" />
                    </div>

                    <p className="font-medium">{storyInfo && storyInfo.story}</p>
                </div>
            </div>
        </div>

    )
}

export default ViewTravelStory;