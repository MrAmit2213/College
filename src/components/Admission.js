import React from 'react'
import ContactForm from './ContactForm'
import { useLocation } from 'react-router-dom'

const Admission = () => {
  const location = useLocation();
  return (
    <div className='container'>
      <h1 className='text-center pt-4 mb-4'><u>Admission</u></h1>
      <div className='p-4'>
        <div>
          <h4>FILLED IN ADMISSION FORM SHOULD BE SUBMITTED IN THE OFFICE ALONG WITH.</h4>
          <ul>
            <li>Latest colored passport size photograph of the student.</li>
            <li>Photograph of the parent with the child in [5cm x 3.5cm]</li>
            <li>Photocopy of Birth Certificate (attested).</li>
            <li>Original Medical certificate of student.</li>
            <li>Attested photocopy of previous year result.</li>
            <li>In case the registration form is filled by guardians other than parents, it should be clearly indicated.</li>
            <li>Address Proof - Pan card/Driving license /Electricity Bill/Aadhar card/Voter ID of parents.</li>
            <li>TC from the previous school must be submitted within 15 days after the commencement of the academic session.</li>
          </ul>
        </div>
      </div>
      <div>
        <div className='p-4'>
          <h4>ADMISSION PROCEDURE & PAYMENT OF FEE</h4>
          <div className='px-3'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero obcaecati asperiores, harum soluta aperiam impedit dolor, vel qui, hic sapiente earum aut consequuntur. Sint in ipsa inventore nobis. Ullam, pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit harum non totam sint? Similique, unde a earum culpa ut deleniti officia omnis, magnam dicta atque ducimus provident impedit, quisquam repudiandae.</p>
          <h6>Age Criteria</h6>
          <p className='px-3'>The basic age criteria for admission to classes KG. (informal education) and class I (formal education) is to be met as given here under.</p>
          <ul>
            <li>A basic admission test for KG to VIII will be conducted on specified date for eligibility for that particular class. Only those Candidates who clear the written test will be called for an interview, both parents are required to be present at the time of the interview.</li>
            <li>The admission test will cover English, Hindi, Maths & Science based questions from the syllabus of the preceding class to which admission is sought.</li>
            <li>The admission would be confirmed only after the final interview.</li>
            <li>Only meritorious students will be considered for mid term admission on grounds of transfer or change of school.</li>
            <li>The school reserves the right to admit a student in the appropriate class after examining the student. Even after the admission is granted the student can either be adjusted in a lower or higher class, which ever the case may be, depending upon the student's ability at the discretion of the authorities. Admission is strictly subject to fulfilling of all conditions and submission of requisite documents.</li>
          </ul>
          </div>
        </div>
      </div>
      <ContactForm campus={location.pathname.includes('khaga')?'khaga':''} />
    </div>
  )
}

export default Admission
