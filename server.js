const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const PORT = 3001;

//setting up middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());



//write function to create new notes


//set up DELETE route
//write function to delete notes


//set up HTML routes
//GET notes should return the notes.html file.
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//GET * should return the index.html file.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Listen for connections
app.listen(PORT, () =>
  console.info(`Server now listening at http://localhost:${PORT}`)
);


