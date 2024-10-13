const mongoose = require('mongoose');

const travelStorySchema = new mongoose.Schema({
    // title, story, visistedLocation, isFavourite, userId, imageUrl, visitedDate
    title: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true
    },
    visitedLocation: {
        type: [String],
        default: []
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    imageUrl: {
        type: String,
        default: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    visitedDate: {
        type: Date,
        required: true
    }
    
}, { timestamps: true });


const TravelStory = mongoose.model("TravelStory", travelStorySchema);
module.exports = TravelStory;