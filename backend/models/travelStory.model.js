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
        default: "https://img.freepik.com/free-photo/open-book-with-fairytale-scene_52683-107844.jpg?t=st=1727929313~exp=1727932913~hmac=895a409d65a3b56a3e23a99467202235d879351956ccdd7a6bfa2d5cf7934826&w=996"
    },
    visitedDate: {
        type: Date,
        required: true
    }
    
}, { timestamps: true });


const TravelStory = mongoose.model("TravelStory", travelStorySchema);
module.exports = TravelStory;