import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/footer.css';

const Footer = () => {
    let location = useLocation();
    return (
        <div className={`mt-5 ${location.pathname === '/admin/login' || location.pathname === ('/') ? 'd-none' : 'd-block'}`}>
            <footer className="pb-4 text-center text-lg-start bg-body-secondary text-muted">
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>

                    <div>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.google.com/search?q=basukala+iti&rlz=1C1RXQR_enIN1071IN1074&oq=basukala+iti&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigATIHCAIQIRigATIHCAMQIRigATIHCAQQIRigAdIBCDU4MjdqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8&lqi=CgxiYXN1a2FsYSBpdGlI7b2IvJmvgIAIWhYQABABGAAYASIMYmFzdWthbGEgaXRpkgEXZWR1Y2F0aW9uYWxfaW5zdGl0dXRpb26qATUQATIfEAEiG0_jSNTug4HHPG5qdgTQPHJpUnDEQ6IsJjs0GzIQEAIiDGJhc3VrYWxhIGl0aQ#rlimm=14500778528428571614" className="me-4 text-reset">
                            <i className="fab fa-google"></i>
                        </a>
                    </div>
                </section>

                <section className='d-flex justify-content-start mainFooter'>
                    <div className='d-flex align-items-center'>
                        <div className="mx-auto company " style={{ maxWidth: '400px' }} >
                            {location.pathname.includes('khaga') ?
                                <div>
                                    <h5 className="text-uppercase fw-bold mb-4">Basukala ITI - Khaga</h5>
                                    <div className='footerTxt'>
                                        <div>
                                            <i className="fa-solid fa-location-dot"></i><span> : Vill- Ghuri, Dohri ka Purba, Naubasta Road, Tehsil- Khaga, PO+PS+PS+Block- Airaya, Dist.- Fatehpur, UP.</span>
                                        </div>
                                        <div>
                                            <i className="fa-solid fa-phone"></i><span> : 7209199516/616 | 8960170730 | 8127859580 | 9931197070 | 7503979555</span>
                                        </div>
                                        <div>
                                            <i className="fa-solid fa-envelope"></i><span> : basukalaiti.khaga@gmail.com | soundarya_kumar@yahoo.com</span>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <h5 className="text-uppercase fw-bold mb-4">Basukala ITI - Koderma</h5>
                                    <div className='footerTxt'>
                                        <div>
                                            <i className="fa-solid fa-location-dot"></i><span> : Plot No.-249, Village - Aragaro, Gajhandi Road, Near- Chanda Flour Mill, Dist.- Koderma, Jharkhand.</span>
                                        </div>
                                        <div>
                                            <i className="fa-solid fa-phone"></i><span> : 72091-72091-99615 | 09811677417 | 08084309202 | 09204623722 | 09693606096</span>
                                        </div>
                                        <div>
                                            <i className="fa-solid fa-envelope"></i><span> : basukalaiti.koderma@gmail.com</span>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div style={{ width: '100%' }}>
                        <div>
                            <div className="container text-center text-md-start mt-3">
                                <div className="row mt-3">
                                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto">
                                        <p>
                                            <Link to="/kodemaHome" className="text-reset navbar-brand">Home</Link>
                                        </p>
                                        <p>
                                            <Link to="/admission" className="text-reset navbar-brand">Admission</Link>
                                        </p>
                                        <p>
                                            {/* <Link to="/feeStructure" className="text-reset navbar-brand">Fee Structure</Link> */}
                                        </p>
                                        <p>
                                            <Link to="/noticeBoard" className="text-reset navbar-brand">Notice Board</Link>
                                        </p>
                                        <p>
                                            <Link to="/faculty" className="text-reset navbar-brand">Faculty</Link>
                                        </p>
                                    </div>

                                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto">
                                        <p>
                                            <Link to="/gallary" className="text-reset navbar-brand">Gallary</Link>
                                        </p>
                                        <p>
                                            <Link to="/facilities" className="text-reset navbar-brand">Facilities</Link>
                                        </p>
                                        <p>
                                            <Link to="/alumni" className="text-reset navbar-brand">Alumni</Link>
                                        </p>
                                        <p>
                                            {/* <Link to="/timeTable" className="text-reset navbar-brand">Time Table</Link> */}
                                        </p>
                                        <p>
                                            <Link to="/contactUs" className="text-reset navbar-brand">Contact Us</Link>
                                        </p>
                                    </div>

                                    <div className="col-md-4 col-lg-3 col-xl-3 d-flex flex-column justify-content-around" >
                                        <p>Grievance handling</p>
                                        <p>RTI</p>
                                        <p>Feedback & Suggestions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </footer>
        </div>
    )
}

export default Footer
