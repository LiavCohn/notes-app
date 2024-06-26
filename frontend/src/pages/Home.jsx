import { useState,useEffect} from "react"
import api from "../api"
import Note from "../components/Note"
import "../styles/home.css"

function Home() {
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [title , setTitle] = useState("")

    useEffect(() => {
        getNotes()
    },[])

    const getNotes = async () => {
        try {
            const res = await api.get("/api/notes/")
            const data = await res.data
            setNotes(data)
        } catch (error) {
            alert("Failed to fetch notes ",error)
        }
    }

    const deleteNote = async (id) => {
        try {
            const res = await api.delete(`api/notes/delete/${id}/`)
            if (res.status == 204) {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== id)); // Remove note from state
                alert("Note deleted!")
            }
            else {
                alert("Failed to delete note")
            }
        } catch (error) {
            alert("Failed to delete note ",error)
        }
    }

    const createNote = async (e) => {
        e.preventDefault()
        setTitle(''); // Clear the title field
        setContent('');
        try {
            const res = await api.post(`/api/notes/`, { content, title })
            if (res.status == 201) {
                alert("Note created!");
                const newNote = await res.data; // Get the new note data from response
                setNotes((prevNotes) => [...prevNotes, newNote]); // Add new note to state
            }
            else {
                alert("Failed to create note")
            }
            
        } catch (error) {
            alert("Failed to create note ",error)
        }
    }

    return <div>

        <div>
            <h2>Notes</h2>
            {notes.map((note) => <Note note={note} onDelete={deleteNote} key={ note.id} />)}
        </div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title:</label>
            <br></br>
            <input
                type="text"
                id="title"
                name="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}>
            </input>
            <label htmlFor="content">Content:</label>
            <textarea
                id="content"
                name="content"
                required
                onChange={(e) => setContent(e.target.value)}
                value={content}>
            </textarea>
            <br></br>
            <input type="submit" value="Submit"></input>
        </form>

    </div>
}

export default Home