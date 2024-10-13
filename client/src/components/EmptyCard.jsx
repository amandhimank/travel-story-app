const EmptyCard = ({ image, message }) => {
    return (
        <div className="mt-20 w-full flex flex-col items-center justify-center">
            {/* <div className="p-7 rounded-full bg-cyan-200/50 flex justify-center items-center">
            </div> */}
            <img className="size-24" src={image} alt="no notes" />
            <p className="text-slate-700 text-center mt-4 font-medium w-1/2">{message}</p>
        </div>
    )
}

export default EmptyCard;