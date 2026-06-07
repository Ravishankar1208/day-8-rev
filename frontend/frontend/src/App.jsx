import { useState , useEffect } from 'react'
import axios from 'axios';


function App() {

  const [notes, setNotes] = useState([ ])

  console.log("hello ravi")


  function  fetchnotes(){
         axios.get('https://day-8-rev.onrender.com/api/notes')
  .then(res=>{
    setNotes(res.data.notes)
  })
  }


  useEffect(()=>{
    fetchnotes()
  },[])

  function handleSubmit(e){
    e.preventDefault()

    const {title, description} = e.target.elements
    console.log(title.value , description.value)


    axios.post('https://day-8-rev.onrender.com/api/notes',{
      title:title.value,
      description : description.value
    })
    .then((res)=>{
      console.log(res.data)
      fetchnotes()
    })
  }

function handleDeleteNote(noteID){
  axios.delete('https://day-8-rev.onrender.com/api/notes/'+noteID)
  .then(res=>{
    console.log(res.data)
    fetchnotes()
  })
  
}

function handleUpdateNote(noteID){

  const newTitle = prompt("Enter new title")
  const newDescription = prompt("Enter new description")


  axios.patch(
    'https://day-8-rev.onrender.com/api/notes/'+noteID,
    {
      title: newTitle, 
      description: newDescription
    }
  )
  .then(res=>{
    console.log(res.data)
    fetchnotes()
  })

}

  return (
   <>

   <form className='note-create-form' onSubmit={handleSubmit}>

    <input name='title' type="text" placeholder='Enter Title' />
    <input name='description' type="text"  placeholder='Enter Description'/>
    <button>Create note</button>
   </form>


   <div className='notes'>
    {
      notes.map(note =>{
     return  <div className='note'>
      <h1>{note.title}</h1>
      <p>{note.description}</p>


      <button onClick={()=>{
        handleUpdateNote(note._id)
       }}>
         Update
      </button>



     <button onClick={()=>{
        handleDeleteNote(note._id)
    }}>
      Delete
   </button>
    </div>

      })
      
    }

   </div>
   </>
  )
}

export default App
