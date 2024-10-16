const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const path = require('path');
const db = require('./connection');

const PORT = process.env.PORT || 8000;

app.use(cors({ 
    origin: "https://travel-story-app.onrender.com",
    credentials: true   
}));

app.use(bodyParser.json());
app.use(cookieParser());

const _dirname = path.resolve();

// serve static files from the uploads and assets directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

// import routers
const userRoutes = require('./routes/user.route');
const storyRoutes = require('./routes/travel.route');

// use routes
app.use("/user", userRoutes);
app.use("/story", storyRoutes);

app.use(express.static(path.join(_dirname, "/client/dist")))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})
