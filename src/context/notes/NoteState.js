import { useState } from 'react'
import NoteContext from './noteContext'


const NoteState = (props) => {

  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const getAllNotes = async () => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "content-type": "applciation/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(json);
  }

  // Add a note 
  const addNote = async (title, description, tag) => {
    // API CALL
    const data = { title, description, tag }
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  }

  // Delete a note

  const deleteNote = async (id, title, description, tag) => {
    // API CALL
    const data = { title, description, tag }
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    });

    const json = await response.json();

    //Logic to delete a note in client side
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote);
  }

  //Edit a note

  const editNote = async (id, title, description, tag) => {
    //API CALL
    const data = { title, description, tag }
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    const json = await response.json(); // parses JSON response into native JavaScript objects

    //Logic to edit a note in client side
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }



  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;