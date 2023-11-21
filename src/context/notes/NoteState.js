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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZmUyZDE3NGI1ZTQ0YmIwMDk1NjE1In0sImlhdCI6MTY5OTczNDIyNX0.2h3zCG2qmwJwQG4rtWiWwgfvi3FNT9cKZ66PWFiGXDs"
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZmUyZDE3NGI1ZTQ0YmIwMDk1NjE1In0sImlhdCI6MTY5OTczNDIyNX0.2h3zCG2qmwJwQG4rtWiWwgfvi3FNT9cKZ66PWFiGXDs"
      },
      body: JSON.stringify(data)
    });

    const json = await response.json();
    console.log(json);

    //Logic to add a new note in client side
    const note = {
      "_id": json._id,
      "user": "654fe2d174b5e44bb0095615",
      "title": title,
      "description": description,
      "tag": tag,
      "date": json.date,
      "__v": 0
    }
    setNotes(notes.concat(note));

    // showAlert('Note added!', 'success');
  }

  // Delete a note

  const deleteNote = async (id, title, description, tag) => {
    // API CALL
    const data = { title, description, tag }
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZmUyZDE3NGI1ZTQ0YmIwMDk1NjE1In0sImlhdCI6MTY5OTczNDIyNX0.2h3zCG2qmwJwQG4rtWiWwgfvi3FNT9cKZ66PWFiGXDs"
      },
      body: JSON.stringify(data)
    });

    const json = response.json();

    //Logic to delete a note in client side
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote);
    
    // showAlert('Note deleted!', 'danger');

  }

  //Edit a note

  const editNote = async (id, title, description, tag) => {
    //API CALL
    const data = { title, description, tag }
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZmUyZDE3NGI1ZTQ0YmIwMDk1NjE1In0sImlhdCI6MTY5OTczNDIyNX0.2h3zCG2qmwJwQG4rtWiWwgfvi3FNT9cKZ66PWFiGXDs"
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
    console.log(newNotes);
    setNotes(newNotes);

    // showAlert('Note edited!', 'info');
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;