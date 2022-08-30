import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext"
import NoteItem from "./NoteItem";

const Notes = () => {
    const context = useContext(noteContext);
    const {notes, setNotes} = context;
  return (
    <>
      <h2>Your Notes</h2>

     <div className="flex flex-wrap my-8 justify-center gap-20">
     {notes.map((note) => {
        return <NoteItem note={note}/>
      })}
     </div>
    </>
  );
};

export default Notes;
