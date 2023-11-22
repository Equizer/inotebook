import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext'

const AddNote = () => {

  //initaializing the state of note that will hold a note
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  //destrucuturing the values that i passed from the context
  const { addNote } = useContext(NoteContext);

  const handleClick = (event) => {
    event.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""});
    
  }
  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  }

  return (
    <div className="container my-3">
      <h1>Add a Note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input value={note.title} type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter a Title..." required minLength={3}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label" >Description:</label>
          <input value={note.description} type="text" className="form-control" id="description" name="description" onChange={onChange} placeholder="Enter a Description..." required minLength={5}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag:</label>
          <input value={note.tag} type="text" className="form-control" id="tag" name="tag" onChange={onChange} placeholder="Enter a Tag..."/>
        </div>
        <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNote
