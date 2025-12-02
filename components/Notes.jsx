import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import { AddNote } from './AddNote';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

export const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes = [], getNotes, editNote } = context;
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({id: "", title: "", description: "", tag: "" });
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')) {
            getNotes();
        }
        else {
            props.showAlert("Please log in to view your notes", "warning");
             navigate('/login');
         }
        // getNotes();
      // eslint-disable-next-line react-hooks/exhaustive-deps
            }, []);

    const updateNote = (currentNote) => {
        setNote({
            id: currentNote._id,
            title: currentNote.title,
            description: currentNote.description,
            tag: currentNote.tag
        });
        ref.current.click();
    };

    const handleClick = async (e) => {
        e.preventDefault();
        editNote(note.id, note.title, note.description, note.tag);
        refClose.current.click();
        props.showAlert("Note updated successfully", "success");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}/> 

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                {Array.isArray(notes) && notes.length > 0 ? (
                    notes.map((note) => (
                        <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                    ))
                ) : (
                    <p>No notes to display</p>
                )}
            </div>
        </>
    );
};

export default Notes;
