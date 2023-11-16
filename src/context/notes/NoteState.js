import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "65514c9bbf65b6617a3dba65",
      "user": "654fe2d174b5e44bb0095615",
      "title": "Intention",
      "description": "Train with intent of proving everyone wrong.",
      "tag": "Personal",
      "date": "2023-11-12T22:07:23.462Z",
      "__v": 0
    },
    {
      "_id": "65514ceab677f65b6617a3dba67",
      "user": "654fe2d174b5e44bb0095615",
      "title": "Impossible",
      "description": "It's impossible because no one ever did it, not because no one can ever do it",
      "tag": "Personal",
      "date": "2023-11-12T22:08:42.332Z",
      "__v": 0
    },
    {
      "_id": "65514ddcbf65b77776617a3dba6f",
      "user": "654fe2d174b5e44bb0095615",
      "title": "Mentality",
      "description": "There is no one who can match me, I am the best my bloodline has ever seen, Nothing can stop me, I will destroy all of my enemies, I am a f*cking warrior, There is nobody like me, I am the best ever.",
      "tag": "Personal",
      "date": "2023-11-12T22:12:44.312Z",
      "__v": 0
    }, {
      "_id": "65514c9bbf65b67676617a3dba65",
      "user": "654fe2d174b5e44bb0095615",
      "title": "Intention",
      "description": "Train with intent of proving everyone wrong.",
      "tag": "Personal",
      "date": "2023-11-12T22:07:23.462Z",
      "__v": 0
    },
    {
      "_id": "65514c3eabf65b24466417a3dba67",
      "user": "654fe2d174b5e44bb0095615",
      "title": "Impossible",
      "description": "It's impossible because no one ever did it, not because no one can ever do it",
      "tag": "Personal",
      "date": "2023-11-12T22:08:42.332Z",
      "__v": 0
    },
    {
      "_id": "65514ddc2424bf65b6617a3dba6f",
      "user": "654fe2d174b5e44bb0095615",
      "title": "Mentality",
      "description": "There is no one who can match me, I am the best my bloodline has ever seen, Nothing can stop me, I will destroy all of my enemies, I am a f*cking warrior, There is nobody like me, I am the best ever.",
      "tag": "Personal",
      "date": "2023-11-12T22:12:44.312Z",
      "__v": 0
    }, {
      "_id": "65514c9bbf444465b6617a3dba65",
      "user": "654fe2d174b5e44bb0095615",
      "title": "Intention",
      "description": "Train with intent of proving everyone wrong.",
      "tag": "Personal",
      "date": "2023-11-12T22:07:23.462Z",
      "__v": 0
    },
    {
      "_id": "65514ceabf55343565b6617a3dba67",
      "user": "654fe2d174b5e44bb0095615",
      "title": "Impossible",
      "description": "It's impossible because no one ever did it, not because no one can ever do it",
      "tag": "Personal",
      "date": "2023-11-12T22:08:42.332Z",
      "__v": 0
    },
    {
      "_id": "65514ddcbf6566775b6617a3dba6f",
      "user": "654fe2d174b5e44bb0095615",
      "title": "Mentality",
      "description": "There is no one who can match me, I am the best my bloodline has ever seen, Nothing can stop me, I will destroy all of my enemies, I am a f*cking warrior, There is nobody like me, I am the best ever.",
      "tag": "Personal",
      "date": "2023-11-12T22:12:44.312Z",
      "__v": 0
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  // Add a note 
  const addNote = (title, description, tag) => {
const note = {
  "_id": "65514ddcbf6566775b6617a3dba566f",
  "user": "654fe2d174b5e44bb0095615",
  "title": "Mentality [added]",
  "description": "There is no one who can match me, I am the best my bloodline has ever seen, Nothing can stop me, I will destroy all of my enemies, I am a f*cking warrior, There is nobody like me, I am the best ever [added].",
  "tag": "Personal",
  "date": "2023-11-12T22:12:44.312Z",
  "__v": 0
};
console.log("Adding a new note")
    setNotes(notes.concat(note));
  }

  // Delete a note

  const deleteNote = () => {

  }

  //Edit a note

  const editNote = () => {

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;