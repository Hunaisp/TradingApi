
//import the express module
//* express is a package in node
const express = require('express');
//import mongo db:-
const mongoose = require("mongoose");

// 2- create an instance for express server :-
const app = express();


app.use(express.json());


// 1- Define the port number the server will listen on :-
const PORT = 3000;
//mongo db url :-
const DB = "mongodb+srv://hunaispc8468:WLPDs3LxslKv1HZ0@cluster0.vsxgc.mongodb.net/";


//connect mongodb :-
mongoose.connect(DB).then(() => {
    console.log("mongo db connected");

});
// 3- start the server and listen the specified port :-
app.listen(PORT, "0.0.0.0", function () {
    //print the server log number
    console.log(`server is running on ${PORT}`);
})
