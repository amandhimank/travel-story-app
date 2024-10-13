import NO_RESULT_IMG from "../assets/no-result.png";
import NO_DATE_RESULT_IMG from "../assets/no-date-result.png";
import NOTES_IMG from "../assets/notes.png";

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const getInitials = (name) => {
    if(!name) return "";

    const words = name.split("");
    let initials = "";

    for(let i = 0; i < 2; i++) {
        initials += words[i];
    }
    return initials.toUpperCase();
};

export const getEmptyCardMessage = (filterType) => {
    switch (filterType) {
        case "search":
            return 'Oops! No Stories found matching your search';
        case "date":
            return 'Oops! No Stories found int the given date range';
        default:
            return "No travel stories yet. Start sharing your adventures! Click on the 'Add' button to write down your thoughts, ideas, and memories. Let's get started!";
    }
}

export const getEmptyCardImage = (filterType) => {
    switch (filterType) {
        case "search":
            return NO_RESULT_IMG;
        case "date":
            return NO_DATE_RESULT_IMG;
        default:
            return NOTES_IMG;
    }
}

