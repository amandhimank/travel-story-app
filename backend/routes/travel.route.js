const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware } = require('../jwt');
const { addStory, getAllStories, imageUpload, deleteImage, editStory, deleteStory, updateIsFavourite, searchStories, filterStoriesByDateRange } = require('../controllers/travel.controller');
const upload = require('../multer');

// Add Travel Story
router.post("/add-travel-story", jwtAuthMiddleware, addStory);

// get all stories
router.get("/get-all-stories", jwtAuthMiddleware, getAllStories);

// route to handle image upload
router.post('/image-upload', upload.single('image'), imageUpload);

// detele image
router.delete('/delete-image', deleteImage);

// edit travel story
router.post('/edit-story/:id', jwtAuthMiddleware, editStory);

// delete travel story
router.delete('/delete-story/:id', jwtAuthMiddleware, deleteStory);

// update isFavourite
router.put('/update-is-favourite/:id', jwtAuthMiddleware, updateIsFavourite);

// search travel stories
router.get('/search', jwtAuthMiddleware, searchStories);

// filter stories by date range
router.get('/filter', jwtAuthMiddleware, filterStoriesByDateRange);

module.exports = router;

