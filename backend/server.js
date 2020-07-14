const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const app = express();

// Middleware stack
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

app.use('/users', usersRouter);
app.use('/posts', postsRouter);

// Establish a connection to the MongoDB database
mongoose.connect(process.env.ATLAS_URI, {
        // These options remove deprecation warnings in the MongoDB Node.js 
        // driver
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true
    })
    .then(() => console.log("MongoDB connection successfully established"))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
});
