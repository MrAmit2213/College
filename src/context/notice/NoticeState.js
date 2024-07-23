import React from 'react';
import noticeContext from './noticeContext';
import { useState } from 'react';

const host = "http://localhost:5000";
const koderma = 'news';
const khaga = 'newsKhagha';

const NoticeState = (props) => {
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    //Get all the notice
    const getNotes = async () => {
        //API Call
        const response = await fetch(`${host}/api/${props.campus==='khaga'?khaga:koderma}/allNews`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        const invertedData = json.reverse();
        setNotes(invertedData)
      }

      // Add a notice
      const addNote = async (title, news) => {
        //API Call
        const response = await fetch(`${host}/api/${props.campus==='khaga'?khaga:koderma}/addNews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({title,news}),
        });
    
        const note = await response.json();
        setNotes(notes.concat(note))
      }

      // Delete notice
      const deleteNote = async(id) => {
        //TODO: API Call
        const response = await fetch(`${host}/api/${props.campus==='khaga'?khaga:koderma}/deleteNews/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        // eslint-disable-next-line
        const json = response.json();
    
        const newNote = notes.filter((notes) => { return notes._id !== id })
        setNotes(newNote)
      }

      //Edit notice
      const editNote = async (id, title, news) => {

        //API Call
        const response = await fetch(`${host}/api/${props.campus==='khaga'?khaga:koderma}/updateNews/${id}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({title, news}),
        });
        // eslint-disable-next-line    
        const json = await response.json();
    
        //Logic to update the note
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if (element._id === id) {
            newNotes[index].title = title;
            break;
          }
          if (element._id === id) {
            newNotes[index].news = news;
            break;
          }
        }
        setNotes(newNotes)
      }

    return (
        <noticeContext.Provider value={{ notes, getNotes,  addNote, deleteNote, editNote }} >
            {props.children}
        </noticeContext.Provider>
    )
}

export default NoticeState
