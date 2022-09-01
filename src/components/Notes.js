import React,{useContext, useEffect} from "react";
import noteContext from "../context/notes/noteContext"
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
    const context = useContext(noteContext);
    const {notes, getNotes} = context;

    useEffect(() => {
      getNotes()
    }, [])
    

  return (
    <>

    <AddNote/>
<div>
      <h2 className="text-3xl font-bold tracking-tight leading-tight mt-6">Your Notes</h2>

     <div className="flex flex-wrap my-8 justify-center gap-20">
     {notes.map((note) => {
        return <NoteItem key={note._id} note={note}/>
      })}
     </div>

    {/* {console.log(notes)} */}
     </div>
    </>
  );
};

export default Notes;
