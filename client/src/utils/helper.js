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