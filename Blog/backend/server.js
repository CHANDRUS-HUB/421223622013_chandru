const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const postRoutes = require('./routes/posts')

const app = express();
const PORT = process.env.PORT || 8000;

//Middleware
app.use(bodyParser.json());

//connect to Mongodb
mongoose.connect("mongodb://localhost:27017/blog")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log('Db error', err));

// use routes
app.use('/api/posts', postRoutes)

app.listen(PORT, () => {
    console.log(`server is on port ${PORT}`);

})