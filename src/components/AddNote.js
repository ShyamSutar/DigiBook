import React, {useContext,useState} from "react";
import noteContext from "../context/notes/noteContext"

const AddNote = (props) => {

      
  const context = useContext(noteContext);
  const {addNote} = context;

  const [note, setNote] = useState({title: "", description: "", tag: ""})

  const handleClick = (e) =>{
      e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({title: "", description: "", tag: ""});
        props.showAlert("Added Successfully", "blue")
  }

  const onChange = (e) => {
      setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <div>
      <form onSubmit={handleClick}>
      <h1 className="text-3xl font-bold tracking-tight leading-tight mb-2">Add a Note</h1>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Title
          </label>
          <input
            
            type="text"
            id="title"
            name="title"
            onChange={onChange}
            required 
            value={note.title}
            className="peer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

          />
          <p className="invisible peer-invalid:visible text-red-700 font-light">Please Enter the Title</p>
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={onChange}
            required
            value={note.description}
            className="peer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           
          />
          <p className="invisible peer-invalid:visible text-red-700 font-light">Please Enter the Email</p>

        </div>

        <div className="mb-6">
          <label
            htmlFor="tag"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Tag
          </label>
          <input
            type="text"
            id="tag"
            name="tag"
            onChange={onChange}
            required
            value={note.tag}
            className="peer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           
          />
          <p className="invisible peer-invalid:visible text-red-700 font-light">Please Enter the Tag</p>

        </div>
        
        <button
          type="submit"
          // onClick={handleClick}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
