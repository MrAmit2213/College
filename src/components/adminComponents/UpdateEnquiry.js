import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const koderma = 'enquiry';
const khaga = 'enquiryKhagha'
const host = "http://localhost:5000"

const UpdateEnquiry = () => {
    const authData = useSelector(state => state.Reducer);
    const [enquiry, setEnquiry] = useState([]);
    const [search, setSearch] = useState('')

    const fetchEnquiry = () => {
        fetch(`${host}/api/${authData.campus==='khaga'?khaga:koderma}/allEnquiry`)
            .then((res) => res.json())
            .then((data) => setEnquiry(data))
    };

    useEffect(() => {
        fetchEnquiry();
    }, [enquiry]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/${authData.campus==='khaga'?khaga:koderma}/deleteEnquiry/${id}`);

            // After deletion, fetch updated data
            fetchEnquiry();
        } catch (error) {
            alert('Error deleting class details');
        }
    };

    return (
        <div>
            <h2>Enquiries</h2>
            <div className='mt-4'>
                <Form>
                    <InputGroup className='my-3 gap-2'>
                        <Form.Control className='rounded' onChange={(e) => setSearch(e.target.value)} placeholder='Search' />
                    </InputGroup>
                </Form>
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th>Contact</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Date</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enquiry.filter((eq) => {
                            return search.toLowerCase() === '' ? eq : eq.name.toLowerCase().includes(search.toLowerCase())
                        }).map((eq) => (
                            <tr key={eq._id}>
                                <td>{eq.name.substring(0, 1).toUpperCase().concat(eq.name.substring(1))}</td>
                                <td>{eq.mail}</td>
                                <td>{eq.contact}</td>
                                <td>{eq.subject.substring(0, 1).toUpperCase().concat(eq.subject.substring(1))}</td>
                                <td>{eq.message.substring(0, 1).toUpperCase().concat(eq.message.substring(1))}</td>
                                <td>{eq.date.substring(0, 10)}</td>
                                <td>
                                    <i className="fa-solid fa-trash mx-2" onClick={() => { handleDelete(eq._id) }} ></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UpdateEnquiry
