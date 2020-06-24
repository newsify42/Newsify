const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const app = express();
const port = process.env.PORT || 5000;

// Middleware stack
app.use(cors());
app.use(express.json());
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

// Establish a connection to the MongoDB
mongoose.connect(process.env.ATLAS_URI, {
    // These options remove deprecation warnings in the MongoDB Node.js driver
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
});

mongoose.connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
});
