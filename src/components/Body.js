import React from 'react'
import Members from './Members';
import '../css/body.css'
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Body = (props) => {
    return (
        <>
            <div className='d-flex justify-content-around align-items-center fix'>
                <div className='btns1 btns' >
                    {/* <Link className="navbar-brand link" to='/faculty'>Faculty</Link>
                    <Link className="navbar-brand link" to='/infrastructure'>Infrastructure</Link>
                    <Link className="navbar-brand link" to='/facilities'>Facility</Link> */}
                    <Link className="navbar-brand link" to='/placement'>Placement</Link>
                    <Link className="navbar-brand link" to='/industryLinkage'>Industry Linkage</Link>
                    <Link className="navbar-brand link" to='/extraCurricularActivity'>Extra Curricular Activity</Link>
                    <Link className="navbar-brand link" to='/achievement'>Achievement by Trai</Link>
                    <Link className="navbar-brand link" to='/certifications'>Other Certifications</Link>
                </div>
                <div className="mb-3 container clgDtl" >
                    <div className=" d-flex row justify-content-center align-items-center g-5 " >
                        <div className="col-md-5 imgDiv">
                            <img src={`./images/${props.campus ? 'BASUKALA ITI 038.jpg' : 'BASUKALA ITI 038.jpg'}`} className="img-fluid rounded mainImg" alt="Some pic" />
                        </div>
                        <div className="col-md-8 dtl" >
                            <div className="card-body" >
                                {props.campus ?
                                    <h5 className="card-title mb-2 pb-2 border-bottom border-3">Welcome to Basukala ITI - Khaga, Fatehpur</h5>
                                    :
                                    <h5 className="card-title mb-2 pb-2 border-bottom border-3">Welcome to Basukala ITI -  Koderma, Jharkhand</h5>
                                }
                                <p className="card-text">Welcome to the interesting, challenging and adventurous world of skill development.  The word “skill” in its extreme sense and context (as Lord Krishna talks to Arjuna in Bhagavad Gita Chapter 2 Verse 50 about “Yogah Karmasu Kaushalam”) means “excellence at work”.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='btns2 btns'>
                    <Link className='navbar-brand link'>Courses Approvals</Link>
                    <NavDropdown
                        id="nav-dropdown-dark-example"
                        title="Latest Notification"
                        className='link'
                    >
                        <NavDropdown.Item href="#action/3.1" className='bb sublink'>DGET/NCVT</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2" className='bb sublink'>QCI</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3" className='bb sublink'>SCVT</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                        id="nav-dropdown-dark-example"
                        title="Our Sister Concerns"
                        className='link'
                    >
                        <NavDropdown.Item href="#action/3.1" className='bb sublink'>PESCONS</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2" className='bb sublink'>CAPS</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3" className='bb sublink'>ASM</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                        id="nav-dropdown-dark-example"
                        title="Other Links"
                        className='link'
                    >
                        <NavDropdown.Item href="#action/3.1" className='bb sublink' >Min. of Labor</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2" className='bb sublink' >DGET/NCVT</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3" className='bb sublink' >DOJT/SCVT</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3" className='bb sublink' >NOIS</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3" className='bb sublink' >AICTE</NavDropdown.Item>
                    </NavDropdown>
                    <Link className="navbar-brand link" to='/rating'>Institute Rating</Link>
                </div>
            </div>
            <Members campus={props.campus} />
            <div className='container text-center p-4' style={{ backgroundColor: 'rgb(140 153 165 / 73%)' }}>
                <h3 className='p-3'>Why Basukala ITI?</h3>
                <p>Welcome to the interesting, challenging and adventurous world of skill development.  The word “skill” in its extreme sense and context (as Lord Krishna talks to Arjuna in Bhagavad Gita Chapter 2 Verse 50 about “Yogah Karmasu Kaushalam”) means “excellence at work”. A more practical explanation of the word Skill means, a quality/specialty that makes someone more efficient, more productive and  more organized. This is the philosophy and approach of skill development followed at BASUKALA ITI.</p>
                <p>We develop skill in you, so as to make you more productive, more efficient and more organized. It is your skill, that would differentiate you from others, will enable you to find a place in the job market and will help you in moving up in your carrier and growth. We have all the necessary resources, expertise, and infrastructure to impart best skill training program. With this I, once again welcome you at BASUKALA ITI to explore the  interesting, challenging and adventurous world of skill development.  Inside pages would give you more information about other aspects.</p>
            </div>
        </>
    )
}

export default Body;
