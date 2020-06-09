const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
});