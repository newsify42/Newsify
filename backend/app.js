const express = require("express");
const cors = require("cors");
const httpError = require("http-errors");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

const usersRouter = require("./routes/users");
const articlesRouter = require("./routes/articles");
const commentsRouter = require("./routes/comments");

const app = express();

// Middleware stack
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/users", usersRouter);
app.use("/articles", articlesRouter);
app.use("/comments", commentsRouter);

// Handles endpoints that aren't found
app.use((req, res, next) => {
  next(httpError(404, "Endpoint Not Found"));
});

// Custom error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;

  console.log("Error Status:", status);
  console.log("Error Message:", err.message);
  console.log("Error Stack:", err.stack);
  console.log();

  res.status(status).json({
    message: err.message
  });
});

// Establish a connection to the MongoDB database
mongoose
  .connect(process.env.ATLAS_URI, {
    // These options remove deprecation warnings in the MongoDB Node.js driver
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
