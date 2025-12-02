import express from 'express';
const router = express.Router();
import fetchuser from '../middleware/fetchuser.js';
import Notes from '../models/Notes.js';
import { body, validationResult } from 'express-validator';

//Route1: Get all notes  using:GET "/api/notes/fetchallnotes".login required
router.get('/fetchallnotes',fetchuser, async (req, res) => {
 try {
   const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
 } 
 catch (error) {
   console.error(error);
   res.status(500).json({ error: 'Internal server error' });
 }
});

//Route2:add new notes  using:POST "/api/notes/addnote".login required
router.post('/addnote',fetchuser,[
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description must be at least 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, description, tag } = req.body;
  const note = new Notes({
    user: req.user.id,
    title,
    description,
    tag
  });
  const savedNote = await note.save();
  res.json(savedNote);
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Route3: update an existing note using:PUT "/api/notes/updatenote/:id".login required
router.put('/updatenote/:id', fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description must be at least 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //create a newNote object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag;}
    //find the note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized to update this note' });
    }
    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    res.json({note});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Route4: delete an existing note using:DELETE "/api/notes/deletenote/:id".login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  // const {title, description, tag} = req.body;
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized to delete this note' });
    }
    await Notes.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted successfully', note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;