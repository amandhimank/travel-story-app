const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log("connected to mongodb successfully");
})
db.on('disconnected', () => {
    console.log("disconnected to mongodb successfully");
})
db.on('error', (error) => {
    console.log("error connecting to mongodb", error);
})

module.exports = db;
