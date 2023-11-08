const fs = require("fs");
const path = require("path");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = process.env.PORT || 3001;

//initialize an array to store notes
const allNotes = [];

//setting up middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

//set up API routes
//API route to read db.json in db file and returns saved notes as json
app.get("/api/notes", (req, res) => {
    fs.readFile("db/db.json", "utf8", (err,data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.json(JSON.parse(data));
    });
});


//write function to create new notes
function writeNote(body, notesArr) {
    const newNote = {
        ...body,
        id: uuidv4(),
    };
    notesArr.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(notesArr, null, 2)
    );
    return newNote;
}

//post route to recieve new notes and save them
app.post("/api/notes", (req, res) => {
    const newNote = writeNote(req.body, allNotes);
    res.json(newNote);
});

//set up DELETE route
//write function to delete notes
//was not able to figure out how to get the delete function to work correctly
function deleteNote(id, notesArr) {
    const deletedNote = notesArr.filter((note) => note.id !== id);
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(deletedNote, null , 2)
    );
    return deletedNote;
}

app.delete("/api/notes/:id", (req, res) => {
    const deletedNote = deleteNote(req.params.id, allNotes);
    res.json(deletedNote);
});


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


