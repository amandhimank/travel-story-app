const TravelStory = require("../models/travelStory.model");
const path = require("path");
const fs = require("fs");
const User = require("../models/user.model");

// To add a new story
const addStory = async (req, res) => {
    const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
    const userId = req.user.id;

    // validate required fields
    if(!title || !story || !visitedLocation || !visitedDate) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    // Convert visitedDate from miliseconds to date object
    const parsedVisitedData = new Date(parseInt(visitedDate));

    try {
        const travelstory = await TravelStory.findOne({ title, userId });
        if(travelstory) {
            return res.status(403).json({ message: "title already exists", success: false });
        }

        // create a new story
        const newStory = new TravelStory({
            title, 
            story,
            visitedLocation,
            imageUrl,
            userId,
            visitedDate: parsedVisitedData
        });

        // save it
        const response = await newStory.save();
        const user = await User.findByIdAndUpdate(userId, { $push: { storyId: response._id } });
        res.status(200).json({ message: "Story created successfully", success: true, story: response, user });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error", success: false });
    }
};

const getAllStories = async (req, res) => {
    const userId = req.user.id;
    console.log(userId);
    try {
        const stories = await TravelStory.find({ userId: userId }).sort({ isFavourite: -1 });
        res.status(200).json({ message: "Stories fetched successfully", success: true, stories });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error", success: false });
    }
};

// Image upload 
const imageUpload = async (req, res) => {
    try {
        if(!req.file) {
            res.status(400).json({ message: "No file uploaded", success: false });
        }

        const imageUrl = `http://localhost:8000/uploads/${req.file.filename}`;
        res.status(200).json({ message: "Image uploaded successfully", success: true, imageUrl });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error", success: false });
    }
};

// Delete image
const deleteImage = async (req, res) => {
    const { imageUrl } = req.query;

    if(!imageUrl) {
        return res.status(400).json({ message: "Image URL is required", success: false });
    }

    try {
        // extract filename from the image url
        const filename = path.basename(imageUrl);
        console.log(filename);

        // Define the file path
        const filePath = path.join(__dirname, ".." , "uploads", filename);
        console.log(filePath);

        // Check if the file exists
        if(fs.existsSync(filePath)) {
            // Delete the file from uploads folder
            fs.unlinkSync(filePath);
            return res.status(200).json({ message: "Image deleted successfully", success: true });
        }
        else {
            return res.status(404).json({ message: "Image not found", success: false });
        }
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error", success: false });
    }
};

// Edit travel story
const editStory = async (req, res) => {
    const { id } = req.params;
    const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
    const userId = req.user.id;

    // validate required fields
    if(!title || !story || !visitedLocation || !visitedDate) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    // Convert visitedDate from miliseconds to date object
    const parsedVisitedData = new Date(parseInt(visitedDate));

    try {
        // Find the story by id and ensure it belongs to the authenticated user
        const travelStory = await TravelStory.findOne({ _id: id, userId: userId });
        if(!travelStory) {
            return res.status(404).json({ message: "Story not found", success: false });
        }

        const placeholderImageUrl = "http://localhost:8000/assets/image.png";

        travelStory.title = title;
        travelStory.story = story;
        travelStory.visitedLocation = visitedLocation;
        travelStory.imageUrl = imageUrl || placeholderImageUrl;
        travelStory.visitedDate = parsedVisitedData;

        await travelStory.save();
        return res.status(200).json({ message: "Story updated successfully", success: true, story: travelStory });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error", success: false });
    }
};

// Delete travel story
const deleteStory = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        // Find the story by id and ensure it belongs to the authenticated user
        const travelStory = await TravelStory.findOne({ _id: id, userId: userId });
        if(!travelStory) {
            return res.status(404).json({ message: "Story not found", success: false });
        }

        // Delete the story
        await TravelStory.deleteOne({ _id: id, userId: userId });
        const user = await User.findById(userId);
        user.storyId = user.storyId.filter((item) => item.toString !== id)
        await user.save();

        // Extract the filename from the imageUrl
        const imageUrl = travelStory.imageUrl;
        const filename = path.basename(imageUrl);

        // Define the file path
        const filepath = path.join(__dirname, "..", "uploads", filename);

        // Delete the image from the uploads folder
        fs.unlinkSync(filepath, (err) => {
            if(err) {
                console.error("Failed to delete image:", err);
            }
        })

        res.status(200).json({ message: "Story deleted successfully", success: true });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error", success: false });
    }
};

// Update isFavourite
const updateIsFavourite = async (req, res) => {
    const { id } = req.params;
    const { isFavourite } = req.body;
    const userId = req.user.id;

    try {
        // Find the story by id and ensure it belongs to the authenticated user
        const travelStory = await TravelStory.findOne({ _id: id, userId: userId });
        if(!travelStory) {
            return res.status(404).json({ message: "Story not found", success: false });
        }

        // Update the isFavourite field
        travelStory.isFavourite = isFavourite;
        await travelStory.save();
        return res.status(200).json({ message: "Favourite updated successfully", success: true, story: travelStory });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error", success: false });
    }
}

// Search travel stories
const searchStories = async (req, res) => {
    const { searchQuery } = req.query;
    const userId = req.user.id;

    if(!searchQuery) {
        return res.status(400).json({ message: "Search query is required", success: false });
    }

    try {
        const searchResults = await TravelStory.find({
            userId: userId,
            $or: [
                { title: { $regex: searchQuery, $options: "i" } },
                { story: { $regex: searchQuery, $options: "i" } },
                { visitedLocation: { $regex: searchQuery, $options: "i" } },
            ],
        }).sort({ isFavourite: -1 });
        console.log(searchResults);

        res.status(200).json({ stories: searchResults, success: true });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error", success: false });
    }
};

// Filter stories by date range
const filterStoriesByDateRange = async (req, res) => {
    const { startDate, endDate } = req.query;
    const userId = req.user.id;

    try {
        // Convert startDate and endDate from miliseconds to date objects
        const start = new Date(parseInt(startDate));
        const end = new Date(parseInt(endDate));

        // Find travel stories that belongs to the authenticated user and are within the specified date range
        const filteredStories = await TravelStory.find({
            userId: userId,
            visitedDate: { $gte: start, $lte: end },
        }).sort({ isFavourite: -1 });

        return res.status(200).json({ stories: filteredStories, success: true });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error", success: false });
    }
};

module.exports = { addStory, getAllStories, imageUpload, deleteImage, editStory, deleteStory, updateIsFavourite, searchStories, filterStoriesByDateRange };