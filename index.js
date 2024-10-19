// Import the express module
const express = require('express');

// Import mongo db and the webhook router
const mongoose = require("mongoose");
const webHookRouter = require("./routes/webhook");
const cors = require('cors');

// Create an instance for express server
const app = express();
// Allow cross-origin requests
app.use(cors());
// Middleware to parse incoming JSON requests
app.use(express.json());

// Use the webhook routes, with a base URL for webhooks
app.use('/webhooks', webHookRouter);

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

// MongoDB connection URL
const DB = "mongodb+srv://hunaispc8468:WLPDs3LxslKv1HZ0@cluster0.vsxgc.mongodb.net/";

// Connect to MongoDB (no need for useNewUrlParser and useUnifiedTopology)
mongoose.connect(DB).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.error("MongoDB connection error: ", err);
});

// Start the server and listen on the specified port
app.listen(PORT, "0.0.0.0", function () {
    console.log(`Server is running on port ${PORT}`);
});
