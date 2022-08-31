import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext"
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
    const context = useContext(noteContext);
    const {notes, addNote} = context;
  return (
    <>

    <AddNote/>


<div>
      <h2>Your Notes</h2>

     <div className="flex flex-wrap my-8 justify-center gap-20">
     {notes.map((note) => {
        return <NoteItem key={note._id} note={note}/>
      })}
     </div>
     </div>
    </>
  );
};

export default Notes;
