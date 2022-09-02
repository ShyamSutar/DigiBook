import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {

  const context = useContext(noteContext);

  const {deleteNote} = context;

  const { note, updateNote } = props;



  return (
    <div className="">
      <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <a href="/">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {note.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {note.description}
        </p>
        <a
          
          className="mr-4 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={()=>{
            deleteNote(note._id)
          }}
        >
          Delete Note
          <i className="fa fa-trash-o mx-2"></i>
        </a>

        <a
        onClick={()=>{updateNote(note)}}
        
          
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update Note
          <i className="fa fa-pencil-square-o mx-2"></i>
        </a>
      </div>
    </div>
  );
};

export default NoteItem;
