import { MdClose, MdOutlineDateRange } from "react-icons/md";
import moment from "moment";
import { DayPicker } from "react-day-picker";
import { useState } from "react";

const DateSelector = ({ date, setDate }) => {
    const [openDatePicker, setOpenDatePicker] = useState(false);

    return (
        <div className="">
            <button className="flex items-center gap-2 font-semibold text-sky-500  bg-sky-200/40 hover:bg-sky-200/60 rounded-md px-2 py-1" onClick={() => { setOpenDatePicker(!openDatePicker) }}>
                <MdOutlineDateRange className="text-xl " />
                {   
                    date ? moment(date).format("Do MMM YYYY") : moment().format("Do MMM YYYY") 
                }
            </button>

            {openDatePicker && <div className="overflow-y-scroll p-5 bg-sky-50/80 rounded-lg relative pt-12">
                <button className="text-xl absolute top-2 right-2 rounded-full bg-sky-100 w-8 h-8 flex items-center justify-center" onClick={() => setOpenDatePicker(false)}>
                    <MdClose className="text-lg text-sky-600" />
                </button>

                <DayPicker 
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={date}
                    onSelect={setDate}
                    pagedNavigation
                />
            </div>}
        </div>
    )
}

export default DateSelector;