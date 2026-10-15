const express = require('express');
const app = express();

app.use(express.json());

const notes = [];
app.post('/notes', (req, res) => {
    notes.push(req.body);

    res.status(201).json({
        message: 'Note created successfully'
    })
})

app.get('/notes', (req, res) => {
    res.status(200).json({
        message : "Notes fetched successfully",
        notes : notes
    })
})

app.delete('/notes/:index', (req, res) => {
    const index = req.params.index;
    delete notes[index];

    res.status(200).json({
        message : "Note deleted successfully"
    })
})

app.patch('/notes/:index', (req, res) => {
    const index = req.params.index;
    const description = req.body.description;
    const title = req.body.title;

    notes[index].description = description;
    notes[index].title = title;

    res.status(200).json({
        message : "Note updated successfully"
    })
})

module.exports = app;