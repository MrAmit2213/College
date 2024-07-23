import React from 'react';
import adminContext from './adminContext';
import { useState } from 'react';

const host = "http://localhost:5000";

const AdminState = (props) => {
    const notesInitial = []
    const [admins, setAdmins] = useState(notesInitial)

    //Get all the notice
    const getAdmins = async () => {
        //API Call
        const response = await fetch(`${host}/api/auth/getUser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        setAdmins(json)
    }

    // Add a notice
    const addAdmin = async (name, email, contact, address, campus, role, password) => {
        //API Call
        const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, contact, address, campus, role, password })
        });
        const json = await response.json();

        setAdmins(admins.concat(json))
    }

    // Delete notice
    const deleteAdmin = async (id) => {
        const response = await fetch(`${host}/api/auth/deleteAdmin/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        // eslint-disable-next-line
        const json = response.json();

        const newNote = admins.filter((admins) => { return admins._id !== id })
        setAdmins(newNote)
    }

    //Edit notice
    const editAdmin = async (id, name, email, contact, address, role) => {

        //API Call
        const response = await fetch(`${host}/api/auth/updateUser/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, contact, address, role }),
        });
        // eslint-disable-next-line
        const json = await response.json();


        //Logic to update the note
        let newNotes = JSON.parse(JSON.stringify(admins))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].name = name;
                break;
            }
            if (element._id === id) {
                newNotes[index].email = email;
                break;
            }
            if (element._id === id) {
                newNotes[index].contact = contact;
                break;
            }
            if (element._id === id) {
                newNotes[index].address = address;
                break;
            }
            if (element._id === id) {
                newNotes[index].role = role;
                break;
            }
        }
        setAdmins(newNotes)
    }

    return (
        <adminContext.Provider value={{ admins, getAdmins, addAdmin, deleteAdmin, editAdmin }} >
            {props.children}
        </adminContext.Provider>
    )
}

export default AdminState