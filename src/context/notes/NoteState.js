import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) =>{
    
    const notesInitial = [
        {
          "_id": "6sd30a30e36749e14b4443cd1e",
          "user": "6308d4729368b7db68dd374e",
          "title": "My title3",
          "description": "Please wake up early3",
          "tag": "personal",
          "date": "2022-08-27T14:57:39.582Z",
          "__v": 0
        },
        {
          "_id": "630a3sadf15cb36e842b6a5bbd63",
          "user": "6308d4729368b7db68dd374e",
          "title": "My title5",
          "description": "Please wake up early5",
          "tag": "personal",
          "date": "2022-08-27T14:59:40.667Z",
          "__v": 0
        },
        {
          "_id": "630sdfa3aa0e36749e14b4443cd1e",
          "user": "6308d4729368b7db68dd374e",
          "title": "My title3",
          "description": "Please wake up early3",
          "tag": "personal",
          "date": "2022-08-27T14:57:39.582Z",
          "__v": 0
        },
        {
          "_id": "630a315cbysdf36e842b6a5bbd63",
          "user": "6308d4729368b7db68dd374e",
          "title": "My title5",
          "description": "Please wake up early5",
          "tag": "personal",
          "date": "2022-08-27T14:59:40.667Z",
          "__v": 0
        },
        {
          "_id": "630a30ujfke36749e14b4443cd1e",
          "user": "6308d4729368b7db68dd374e",
          "title": "My title3",
          "description": "Please wake up early3",
          "tag": "personal",
          "date": "2022-08-27T14:57:39.582Z",
          "__v": 0
        },
        {
          "_id": "630a315ckusb36e842b6a5bbd63",
          "user": "6308d4729368b7db68dd374e",
          "title": "My title5",
          "description": "Please wake up early5",
          "tag": "personal",
          "date": "2022-08-27T14:59:40.667Z",
          "__v": 0
        },
        {
          "_id": "630a30e36kfyu49e14b4443cd1e",
          "user": "6308d4729368b7db68dd374e",
          "title": "My title3",
          "description": "Please wake up early3",
          "tag": "personal",
          "date": "2022-08-27T14:57:39.582Z",
          "__v": 0
        },
      ]

      const [notes, setNotes] = useState(notesInitial)

    return(
        <NoteContext.Provider value = {{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;