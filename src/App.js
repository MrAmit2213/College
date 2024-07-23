import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Admission from './components/Admission';
import FeeStructure from './components/FeeStructure';
import NoticeBoard from './components/NoticeBoard';
import Gallary from './components/Gallary';
import Facilities from './components/Facilities';
import Alumni from './components/Alumni';
import ContactUs from './components/ContactUs';
import Faculty from './components/Faculty';
import TimeTable from './components/TimeTable';
import Footer from './components/Footer';
import Alert from './components/Alert';
import Login from './components/Login';
import UpdateNoticeBoard from './components/adminComponents/UpdateNoticeBoard';
import AdminNavbar from './components/adminComponents/AdminNavbar';
import UpdateBanner from './components/adminComponents/UpdateBanner';
import UpdateFaculty from './components/adminComponents/UpdateFaculty';
import UpdateFacilities from './components/adminComponents/UpdateFacilities';
import UpdateGallary from './components/adminComponents/UpdateGallary';
import UpdateAlumni from './components/adminComponents/UpdateAlumni';
import UpdateTimeTable from './components/adminComponents/UpdateTimeTable';
import BannerState from './context/banner/BannerState';
import NoticeState from './context/notice/NoticeState';
import { useSelector } from 'react-redux';
import FacultyState from './context/faculty/FacultyState';
import FacilitiesState from './context/Facilities/FacilitiesState';
import GallaryState from './context/gallary/GallaryState';
import AlumniState from './context/alumni/AlumniState';
import TimeTableState from './context/timeTable/TimeTableState';
import UpdateFeeStructure from './components/adminComponents/UpdateFeeStructure';
import AddAdmin from './components/adminComponents/AddAdmin';
import AdminState from './context/admin/AdminState';
import LandingPage from './components/LandingPage';
import UpdateEnquiry from './components/adminComponents/UpdateEnquiry';

const App = () => {
  const authData = useSelector(state => state.Reducer);
  const [alert, setAlert] = useState(null);
  // const []

  const showAlert = (type, message) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert('');
    }, 2000);
  }
  return (
    <>
      <AdminState>
        <BannerState campus={authData.campus} >
          <NoticeState campus={authData.campus} >
            <FacultyState campus={authData.campus}>
              <FacilitiesState campus={authData.campus}>
                <GallaryState campus={authData.campus}>
                  <AlumniState campus={authData.campus}>
                    <TimeTableState campus={authData.campus}>
                      {authData.isLoggedIn ?
                        <BrowserRouter>
                          {authData.isLoggedIn && <AdminNavbar />}
                          <div className='container ' style={{ marginTop: '70px' }}>
                            <Routes>
                              <Route exact path="/admin/updateBanner" element={<UpdateBanner />} />
                              <Route exact path="/admin/updateFeeStructure" element={<UpdateFeeStructure />} />
                              <Route exact path="/admin/updateNoticeBoard" element={<UpdateNoticeBoard />} />
                              <Route exact path="/admin/updateFaculty" element={<UpdateFaculty />} />
                              <Route exact path="/admin/updateGallary" element={<UpdateGallary />} />
                              <Route exact path="/admin/updateFacilities" element={<UpdateFacilities />} />
                              <Route exact path="/admin/updateAlumni" element={<UpdateAlumni />} />
                              <Route exact path="/admin/updateTimeTable" element={<UpdateTimeTable />} />
                              <Route exact path="/admin/enquiry" element={<UpdateEnquiry />} />
                              {authData.role === 'owner' && <Route exact path="/admin/addAdmin" element={<AddAdmin />} />}
                            </Routes>
                          </div>
                        </BrowserRouter>
                        :
                        <BrowserRouter>
                          <div style={{ height: '55px' }}>
                            <Navbar />
                            <Alert alert={alert} />
                          </div>
                          <Routes>
                            <Route exact path="/" element={<LandingPage />} />
                            <Route exact path="/kodemaHome" element={<Home />} />
                            <Route exact path="/khagaHome" element={<Home campus='khaga' />} />
                            <Route exact path="/admin/login" element={<Login showAlert={showAlert} />} />
                            <Route exact path="/admission" element={<Admission />} />
                            <Route exact path="/khagaAdmission" element={<Admission />} />
                            <Route exact path="/feeStructure" element={<FeeStructure title='Fee Structure' />} />
                            <Route exact path="/khagaFeeStructure" element={<FeeStructure campus="khaga" title='Fee Structure' />} />
                            <Route exact path="/noticeBoard" element={<NoticeBoard />} />
                            <Route exact path="/khagaNoticeBoard" element={<NoticeBoard campus='khaga' />} />
                            <Route exact path="/faculty" element={<Faculty />} />
                            <Route exact path="/khagaFaculty" element={<Faculty campus='khaga' />} />
                            <Route exact path="/gallary" element={<Gallary />} />
                            <Route exact path="/khagaGallary" element={<Gallary campus='khaga' />} />
                            <Route exact path="/facilities" element={<Facilities />} />
                            <Route exact path="/khagaFacilities" element={<Facilities campus='khaga' />} />
                            <Route exact path="/alumni" element={<Alumni />} />
                            <Route exact path="/khagaAlumni" element={<Alumni campus='khaga' />} />
                            <Route exact path="/timeTable" element={<TimeTable />} />
                            <Route exact path="/khagaTimeTable" element={<TimeTable campus='khaga' />} />
                            <Route exact path="/contactUs" element={<ContactUs address='Plot No.-249, Village - Aragaro, Gajhandi Road, Near- Chanda Flour Mill, Dist.- Koderma, Jharkhand.' contact='72091-72091-99615 | 09811677417 | 08084309202 | 09204623722 | 09693606096' email='basukalaiti.koderma@gmail.com' map='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3632.5139359643485!2d85.48518892044565!3d24.432948394726743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f3731f40ac3bc9%3A0xc93d1d3e4198bbde!2sBASUKALA%20ITI!5e0!3m2!1sen!2sin!4v1716184902457!5m2!1sen!2sin' />} />
                            <Route exact path="/khagaContactUs" element={<ContactUs address='Vill- Ghuri, Dohri ka Purba, Naubasta Road, Tehsil- Khaga, PO+PS+PS+Block- Airaya, Dist.- Fatehpur, UP.' contact='7209199516/616 | 8960170730 | 8127859580 | 9931197070 | 7503979555' email='basukalaiti.khaga@gmail.com, soundarya_kumar@yahoo.com' map='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3632.5139359643485!2d85.48518892044565!3d24.432948394726743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f3731f40ac3bc9%3A0xc93d1d3e4198bbde!2sBASUKALA%20ITI!5e0!3m2!1sen!2sin!4v1716184902457!5m2!1sen!2sin' />} />
                          </Routes>
                          <Footer />
                        </BrowserRouter>
                      }
                    </TimeTableState>
                  </AlumniState>
                </GallaryState>
              </FacilitiesState>
            </FacultyState>
          </NoticeState>
        </BannerState>
      </AdminState>
    </>
  );
};

export default App;