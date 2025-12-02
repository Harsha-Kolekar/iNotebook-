import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //get all notes
  const getNotes = async () => {
    console.log("Attempting to fetch notes...");
    try {
      const token = localStorage.getItem("token");

      console.log("Sending request with token:", token);

      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        credentials: "include", // Important for sending cookies if needed
      });

      console.log("Response status:", response.status);
      //       try {
      //   const res = await fetch("/api/notes");
      //   if (!res.ok) {
      //     const errorData = await res.json();
      //     throw new Error(errorData.message || "Unknown error");
      //   }
      // } catch (error) {
      //   console.error("Error response:", error.message);
      // }

      const data = await response.json();
      console.log("Response data:", data);

      setNotes(data);
      console.log("Notes set successfully");
    } catch (error) {
      console.error("Error in getNotes:", error.message);
      // You might want to set an error state here to show in the UI
    }
  };
  //add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //delete a note
  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");

      // Call the API to delete the note
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      const json = await response.json();
      console.log(json);

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      // Update the frontend state after successful deletion
      const deleteNotes = notes.filter((note) => note._id !== id);
      setNotes(deleteNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        // break;
      }
    }
    setNotes([...newNotes]);
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
