import axios from "axios";
import { API_URL } from "./constants";
axios.defaults.withCredentials = true;

const uploadImage = async (image) => {
    const formData = new FormData();
    // Append image to form data
    formData.append("image", image);

    try {
        const response = await axios.post(API_URL + "/story/image-upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data" // set headers for file upload
            }
        }, { withCredentials: true });
        console.log(response);
        return response.data; // return response data
    } catch (error) {
        console.log("Error uploading image:", error);
        throw error; // rethrow error for handling
    }
}

export default uploadImage;
