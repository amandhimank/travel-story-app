const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const path = require('path');
const db = require('./connection');

const PORT = process.env.PORT || 8000;

app.use(cors({ origin: "*" }));

app.use(bodyParser.json());
app.use(cookieParser());

// serve static files from the uploads and assets directort
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello World'});
})

// import routers
const userRoutes = require('./routes/user.route');
const storyRoutes = require('./routes/travel.route');

// use routes
app.use("/user", userRoutes);
app.use("/story", storyRoutes);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})
