import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  let notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  
  //Add a Note
  const addNote = async (title, description, tag) => {
    //API CALL
    
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMwOGQ0NzI5MzY4YjdkYjY4ZGQzNzRlIn0sImlhdCI6MTY2MTYwOTY0Nn0.c1nsMrb2wokrlBCRvXBOoxZW2E1SFym5WALpcjPswkY",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });

    //TODO: api call

    console.log("Adding a new note");

    const note = {
      _id: "630a30e36kfyu49e14b4443cd1e",
      user: "6308d4729368b7db68dd374e",
      title: title,
      description: description,
      tag: tag,
      date: "2022-08-27T14:57:39.582Z",
      __v: 0,
    };
    console.log(note);
    setNotes(notes.concat(note));
  };

  //get all Notes
  const getNotes = async () => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json", 
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMwOGQ0NzI5MzY4YjdkYjY4ZGQzNzRlIn0sImlhdCI6MTY2MTYwOTY0Nn0.c1nsMrb2wokrlBCRvXBOoxZW2E1SFym5WALpcjPswkY",
      
        }
    });

    //TODO: api call
    
    
    const json = await response.json()
    console.log(json);
    
    setNotes(json);
    
    // console.log(notes);
    

  };

  //Delete a Note
  const deleteNote = async(id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMwOGQ0NzI5MzY4YjdkYjY4ZGQzNzRlIn0sImlhdCI6MTY2MTYwOTY0Nn0.c1nsMrb2wokrlBCRvXBOoxZW2E1SFym5WALpcjPswkY",
      },
     
    });

    const json = response.json();
    console.log(json);



    console.log("Deleting the note with id: " + id);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    console.log(newNotes);

    setNotes(newNotes);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API CALL

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMwOGQ0NzI5MzY4YjdkYjY4ZGQzNzRlIn0sImlhdCI6MTY2MTYwOTY0Nn0.c1nsMrb2wokrlBCRvXBOoxZW2E1SFym5WALpcjPswkY",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });

    const json = response.json();

    //Logic to edit to client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
