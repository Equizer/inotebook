import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem'
import { useNavigate } from 'react-router-dom'
import LoadingPlaceholder from './LoadingPlaceholder';

const Notes = (props) => {

  const context = useContext(NoteContext);
  const { notes, getAllNotes, editNote } = context;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // useEffect can be used as a replacement for componentDidMount
  useEffect(() => {
    if (localStorage.getItem('token')) {
      //using timeout to give user  loading experience we will show the loading card and then we will show them their notes if any
      setTimeout(() => {
        getAllNotes();
        setLoading(false);
      }, 1000)

    }
    else {
      navigate('/login');
    }
  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }
  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  }

  const handleClickEditNote = (event) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert('Note edited!', 'info');
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />
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
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title:</label>
                  <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter a Title..." required minLength={3} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label" >Description:</label>
                  <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onChange} placeholder="Enter a Description..." required minLength={5} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag:</label>
                  <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onChange} placeholder="Enter a Tag..." />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClickEditNote} disabled={note.etitle < 3 || note.edescription < 5}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container text-center">{notes.length === 0 && !loading && 'No notes to display'}</div>

        {
          loading ? <LoadingPlaceholder /> : notes.map((note) => {
            return (
              <NoteItem note={note} key={note._id} updateNote={updateNote} showAlert={props.showAlert} />
            )
          })}
      </div>
    </>
  )
}

export default Notes
