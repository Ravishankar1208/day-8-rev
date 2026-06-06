const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  description : String,
  age : Number
});

const NoteModel = mongoose.model('Note', noteSchema);
module.exports = NoteModel;