import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'


const AdminNavbar = () => {
    // const authData = useSelector(state => state.Reducer);
    const authData = useSelector(state => state.Reducer);
    const dispatch = useDispatch();
    let location = useLocation();
    let navigate = useNavigate();
    const handleLogout = () => {
        // redirect to Home page
        navigate(authData.campus==='khaga'?'khagaHome':'/kodemaHome');
        // Call the provided onLogout function
        dispatch({type:"ADNIN_LOGOUT",
                userId: '',
                name : '',
                email : '',
                token : '',
                isLoggedIn: false})
      };
      
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/admin/updateBanner">LOGO</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto ms-5 mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/admin/updateBanner" ? "active" : ""}`} aria-current="page" to="/admin/updateBanner">Banner</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/admin/updateFeeStructure" ? "active" : ""}`} aria-current="page" to="/admin/updateFeeStructure">Fee Structure</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/admin/updateNoticeBoard" ? "active" : ""}`} aria-current="page" to="/admin/updateNoticeBoard">Notice Board</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/admin/updateFaculty" ? "active" : ""}`} aria-current="page" to="/admin/updateFaculty">Faculty</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/admin/updateGallary" ? "active" : ""}`} aria-current="page" to="/admin/updateGallary">Gallery</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/admin/updateFacilities" ? "active" : ""}`} aria-current="page" to="/admin/updateFacilities">Infrastructure</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/admin/updateAlumni" ? "active" : ""}`} aria-current="page" to="/admin/updateAlumni">Alumni</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/admin/updateTimeTable" ? "active" : ""}`} aria-current="page" to="/admin/updateTimeTable">Time Table</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/admin/enquiry" ? "active" : ""}`} aria-current="page" to="/admin/enquiry">Enquiry</Link>
                            </li>
                            {authData.role==='owner' && <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/admin/addAdmin" ? "active" : ""}`} aria-current="page" to="/admin/addAdmin">Admins</Link>
                            </li>}
                        </ul>
                        <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default AdminNavbar