import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../css/contactUs.css'

const ContactUs = (props) => {

  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_lqms9qt', 'template_239m3x7', form.current, {
        publicKey: 'dcJUqw5OeMaSQD4YO',
      })
      .then(
        () => {
          alert('Email Sent Successfully')
          document.getElementById('name').value = '';
          document.getElementById('phone').value = '';
          document.getElementById('email').value = '';
          document.getElementById('subject').value = '';
          document.getElementById('message').value = '';
        },
        (error) => {
          alert('Not Sent')
        },
      );
  };

  return (
    <div className='container mt-4'>
      <h1 className='mx-3'>Contact Us</h1>
      <div className='d-flex page contactPage justify-content-around'>
        <form action="" className='border p-4 form' ref={form} onSubmit={sendEmail} >
          <h5 className='border-bottom text-center pb-3'>Get in touch with us.</h5>
          <div className='mt-3 container d-flex flex-column gap-2'>
            <div className='d-flex page'>
              <span>
                <label htmlFor="name">Name<span className='text-danger'>*</span></label>
                <br />
                <input type="text" id='name' name='name' placeholder='Name' required />
              </span>
              <span>
                <label htmlFor="email">Email<span className='text-danger'>*</span></label>
                <br />
                <input type="email" id='email' name='email' placeholder='Email' required />
              </span>
            </div>
            <div className='d-flex page'>
              <span>
                <label htmlFor="phone">Number<span className='text-danger'>*</span></label>
                <br />
                <input type="text" id='phone' name='phone' pattern='[0-9]{10}' placeholder='Number' required />
              </span>
              <span>
                <label htmlFor="subject">Subject<span className='text-danger'>*</span></label>
                <br />
                <input type="subject" id='subject' name='subject' placeholder='Subject' required />
              </span>
            </div>
            <div>
              <label htmlFor="message">Message<span className='text-danger'>*</span></label>
              <br />
              <textarea name="message" id="message" placeholder='Write your Message' required></textarea>
            </div>
            <div>
              <button className='bt' type="submit" value="Send" >Submit</button>
            </div>

          </div>
        </form>
        <div>
          <div className='next'>
            <div className='d-flex details r text-center gap-4 justify-content-around'>
              <div className='border'>
                <i className="fa-solid fa-location-dot icon d-flex justify-content-center pb-2"></i>
                <p>{props.address}</p>
              </div>
              <div className='border'>
                <i className="fa-solid fa-phone icon d-flex justify-content-center pb-2"></i>
                <p>{props.contact}</p>
              </div>
              <div className='border'>
                <i className="fa-solid fa-envelope icon d-flex justify-content-center pb-2"></i>
                <p>{props.email}</p>
              </div>
            </div>
            <div className='map'>
              <iframe src={props.map} width="100%" height="320px" style={{ border: '2px solid grey' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Maps" ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
