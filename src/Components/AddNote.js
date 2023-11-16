import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext'

const AddNote = () => {

  const [note, setNote] = useState({title: "", description: "", tag: ""})
  const { addNote } = useContext(NoteContext);
  const handleClick = (event) => {
   event.preventDefault();
    addNote(note.title, note.description, note.tag);
  }
  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
    console.log(note);
  }
  return (
    <div className="container my-3">
      <h1>Add a Note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
      </form>
    </div>
  )
}

export default AddNote
