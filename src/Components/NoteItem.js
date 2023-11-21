import react, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <span className="badge bg-dark" style={{ height: "25px", fontSize: "14px", cursor: "default" }} title="Tag">{note.tag}</span>
          </div>
          <p className="card-text">{note.description}</p>
          <div className="d-flex justify-content-between">
            <div className="card-text" style={{ fontSize: "12px" }}>{new Date(note.date).toGMTString()}</div>
            <div>
              <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id, note.title, note.description, note.tag) }}></i>
              <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}

export default NoteItem