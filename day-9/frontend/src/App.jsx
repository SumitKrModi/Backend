import React from 'react'
import { useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';


const App = () => {

  const [notes, setnotes] = useState([])

function fetchNotes(){
  axios.get("http://localhost:3000/api/notes").then(res =>{
    setnotes(res.data.note)
    console.log(res.data);
    
  })
}
function handleSubmit(e){
  e.preventDefault()
  console.log(e);
  const {title , description} = e.target.elements

  console.log(title.value, description.value)

  axios.post("http://localhost:3000/api/notes",{
    title:title.value,
    description:description.value
  }).then(res => {
    console.log(res.data)
  })

  fetchNotes()
}

function handleDeleteNote(noteId){
    axios.delete("http://localhost:3000/api/notes/"+noteId)
    .then(res=>{
      console.log(res.data)
      fetchNotes()
    })
  }

  function handleUpdate(noteId){
    
    const newDescription = prompt("Enter new description")
    
    
    axios.patch("http://localhost:3000/api/notes/"+noteId,{description:newDescription})
    .then(res=>{
      console.log(res.data)
      fetchNotes()
    })
  }

useEffect(()=>{
  fetchNotes()
},[])

  return (
    <>
    <form className="note-create-form" onSubmit={handleSubmit}>
      <input name='title' type="text" placeholder='Enter title' />
      <input name='description' type="text" placeholder='Enter description' />
      <button>Create Note</button>
    </form>

    <div className="notes">
    {
      notes.map(note => {
        return <div className="note">
      <h1>{note.title}</h1>
      <p>{note.description}</p>
      <div>
        <button onClick={()=>{handleDeleteNote(note._id)}}>delete</button>
      <button onClick={()=>{handleUpdate(note._id)}}>update</button>
      </div>

    </div>
      })
    }
    </div>
    </>
  )
}

export default App