import React, { useState } from 'react'
import "../css/contactUs.css"
const koderma = 'enquiry';
const khaga = 'enquiryKhagha'

const ContactForm = (props) => {
    const [enquiry, setEnquiry] = useState({ name: '', mail: '', contact: '', subject: '', message: '' })

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await fetch(`http://localhost:5000/api/${props.campus==='khaga'?khaga:koderma}/addEnquiry`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(enquiry)
        });
        setEnquiry({ name: '', mail: '', contact: '', subject: '', message: '' })
    }
    const onChange = (e)=>{
        setEnquiry({ ...enquiry, [e.target.name]: e.target.value });
    }
    return (
        <div className='d-flex justify-content-center' >
            <form action="" className='border p-4 py-3 form enquiry'>
                <h4 className='border-bottom text-center pb-3 mb-0'>Enquiry</h4>
                <div className='mt-3 container d-flex flex-column gap-2'>
                    <div className='d-flex page enquiryDetail'>
                        <span>
                            <label htmlFor="name">Name<span className='text-danger'>*</span></label>
                            <br />
                            <input className='adj' type="text" id='name' name='name' placeholder='Name' value={enquiry.name} onChange={onChange} required />
                        </span>
                        <span>
                            <label htmlFor="email">Email<span className='text-danger'>*</span></label>
                            <br />
                            <input className='adj' type="email" id='mail' name='mail' placeholder='Email' value={enquiry.mail} onChange={onChange} required />
                        </span>
                    </div>
                    <div className='d-flex page enquiryDetail'>
                        <span>
                            <label htmlFor="contact">Number<span className='text-danger'>*</span></label>
                            <br />
                            <input className='adj' type="text" id='contact' name='contact' pattern='[0-9]{10}' placeholder='Number' value={enquiry.contact} onChange={onChange} required />
                        </span>
                        <span>
                            <label htmlFor="subject">Subject<span className='text-danger'>*</span></label>
                            <br />
                            <input className='adj' type="subject" id='subject' name='subject' placeholder='Subject' value={enquiry.subject} onChange={onChange} required />
                        </span>
                    </div>
                    <div>
                        <label htmlFor="message">Message<span className='text-danger'>*</span></label>
                        <br />
                        <textarea className='message' name="message" id="message" placeholder='Write your Message' value={enquiry.message} onChange={onChange} required></textarea>
                    </div>
                    <div>
                        <button disabled={(enquiry.name && enquiry.mail && enquiry.contact && enquiry.subject && enquiry.message)===''?true:false} className='bt' type="submit" value="Send" onClick={handleSubmit} >Submit</button>
                        <p className={`text-danger text-center mb-0 pb-0`} >*Someone from our team will contact you soon.</p>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default ContactForm
