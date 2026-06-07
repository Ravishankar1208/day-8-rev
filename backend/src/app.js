const express = require('express');
const notesmodel = require('./modals/notes.modals');
const cors = require('cors');
const path = require('path')


const app = express();
app.use(express.json());
app.use(cors())
app.use(express.static("./public"))

app.post('/api/notes' , async (req, res) => {

  const {title, description, age} = req.body;

  const note = await notesmodel.create({
    title , description , age
  })

  res.status(201).json({
    message : 'Note created successfully',
    note
  })
})


app.get('/api/notes' , async (req, res) => {

  const notes = await notesmodel.find();

  res.status(200).json({
    message : 'Notes fetched successfully',
    notes
  })
})

app.delete('/api/notes/:id' , async (req, res) => {

  const {id} = req.params;
  await notesmodel.findByIdAndDelete(id);

  res.status(200).json({
    message : 'Note deleted successfully',
  })
})

app.patch('/api/notes/:id' , async (req, res) => {

  const id = req.params.id;

  const {title , description} = req.body;
  const notes =  await notesmodel.findByIdAndUpdate(id, {title, description});



  res.status(200).json({
    message : 'Note updated successfully',
    
  })
})

app.use('*name', (req,res)=>{
  res.sendFile(
    path.join(__dirname,"..",'/public/index.html')
  )
})


module.exports = app;