import moment from "moment";
import { GrMapLocation } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";

const TravelStoryCard = ({ storyData, isFavouriteClick, onClick }) => {
    const { _id, title, story, imageUrl, isFavourite, visitedDate, visitedLocation } = storyData;
    return (
        <div className="relative border rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition cursor-pointer w-[30vw]" onClick={onClick}>
            <img src={imageUrl} alt="" className="w-full h-56 object-cover rounded-lg" />

            <button className= {`absolute top-3 right-3 text-xl text-white hover:bg-gray-300/40 p-3 transition duration-200 rounded-full z-[10]`} onClick={(e) => {
                e.stopPropagation();
                isFavouriteClick(storyData)
            }}>
                <FaHeart color={isFavourite ? "red" : "white"} />
            </button>

            <div className="p-4">
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <h1 className="font-semibold">{title}</h1> 
                        <h1 className="text-slate-500 font-medium text-sm">{visitedDate ? moment(visitedDate).format("DD MMM YYYY") : "-"}</h1>
                    </div>
                </div>
                <p className="text-slate-600 font-medium mt-2 truncate">{story?.slice(0, 60)}</p>
                <div className="flex gap-2 items-center mt-3 font-semibold text-cyan-600 bg-cyan-200/40 w-fit px-2">
                    <GrMapLocation />
                    {visitedLocation.join(", ")}
                </div>
            </div>
        </div>
    )
}

export default TravelStoryCard;