import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../css/body.css'

const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();
    let address = location.pathname;

    const clicked = () => {
        navigate('/admin/login')
    }
    return (
        <div className={`${address === '/admin/login' || address === '/' ? 'd-none' : 'd-block'}`} >
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="" to="/"><img className='navlogo' src={address.includes('khaga') ? "./images/logoKhagha.png" : "./images/logoKoderma.png"} alt="logo" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto ms-5 mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${address === "/kodemaHome" || address === "/khagaHome" ? "active" : ""}`} aria-current="page" to={address.includes('khaga') ? "/khagaHome" : "/kodemaHome"}>Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                {/* eslint-disable-next-line */}
                                <a className={`nav-link dropdown-toggle ${address==='/khagaFacilities' || address==='/facilities' || address==='/khagaFaculty' || address==='/faculty' || address==='/khagaGallary' || address==='/gallary' || address==='/khagaAlumni' || address==='/alumni' || address==='/khagaFeeStructure' || address==='/feeStructure' || address==='/khagaTimeTable' || address==='/timeTable'?'active':'' }`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">About Us</a>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <li><Link className="dropdown-item" to={address.includes('khaga') ? "/khagaFacilities" : "/facilities"} >Infrastructure</Link></li>
                                    <li><Link className="dropdown-item" to={address.includes('khaga') ? "/khagaFaculty" : "/faculty"} >Faculty</Link></li>
                                    <li><Link className="dropdown-item" to={address.includes('khaga') ? "/khagaGallary" : "/gallary"} >Gallery</Link></li>
                                    <li><Link className="dropdown-item" to={address.includes('khaga') ? "/khagaAlumni" : "/alumni"} >Alumni</Link></li>
                                    <li><Link className="dropdown-item" to={address.includes('khaga') ? "/khagaFeeStructure" : "/feeStructure"} >Fee Structure</Link></li>
                                    <li><Link className="dropdown-item" to={address.includes('khaga') ? "/khagaTimeTable" : "/timeTable"} >Time Table</Link></li>
                                    <li><Link className="dropdown-item" to='/' >Approval Details</Link></li>
                                    <li><Link className="dropdown-item" to='/' >Organization Details</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                {/* eslint-disable-next-line */}
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Courses</a>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <li><Link className="dropdown-item" to=''>Fitter</Link></li>
                                    <li><Link className="dropdown-item" to=''>Electrician</Link></li>
                                    <li><Link className="dropdown-item" to=''>Serveyor</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${address === "/admission" || address === "/khagaAdmission" ? "active" : ""}`} aria-current="page" to={address.includes('khaga') ? "/khagaAdmission" : "/admission"} >Admission Policy</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${address === "/noticeBoard" || address === "/khagaNoticeBoard" ? "active" : ""}`} aria-current="page" to={address.includes('khaga') ? "/khagaNoticeBoard" : "/noticeBoard"}>Notice Board</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${address === "/contactUs" || address === "/khagaContactUs" ? "active" : ""}`} aria-current="page" to={address.includes('khaga') ? "/khagaContactUs" : "/contactUs"}>Contact Us</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className={`nav-link ${address === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${address === "/admission" ? "active" : ""}`} aria-current="page" to="/admission">Admission</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${address === "/feeStructure" ? "active" : ""}`} aria-current="page" to="/feeStructure">Fee Structure</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${address === "/noticeBoard" ? "active" : ""}`} aria-current="page" to="/noticeBoard">Notice Board</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${address === "/faculty" ? "active" : ""}`} aria-current="page" to="/faculty">Faculty</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${address === "/gallary" ? "active" : ""}`} aria-current="page" to="/gallary">Gallery</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${address === "/facilities" ? "active" : ""}`} aria-current="page" to="/facilities">Facilities</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${address === "/alumni" ? "active" : ""}`} aria-current="page" to="/alumni">Alumni</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${address === "/timeTable" ? "active" : ""}`} aria-current="page" to="/timeTable">Time Table</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${address === "/contactUs" ? "active" : ""}`} aria-current="page" to="/contactUs">Contact Us</Link>
                            </li> */}
                        </ul>
                        <div className='sign'>
                            <Link className="text-reset navbar-brand " style={{ fontSize: '17px' }} to='/admin/login' onClick={clicked} ><b className='bg-primary p-2 rounded text-light'>Admin/Owner Login</b></Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
