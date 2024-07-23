import { useState, useEffect } from "react";
import "../css/members.css";

const Members = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = 2 - 1;
        } else if (newIndex >= 2) {
            newIndex = 0;
        }
        setActiveIndex(newIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            updateIndex(activeIndex + 1);
        }, 10000);

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    });

    return (
        <>
            <div className="container mb-3 mem">
                <div className='p-3 border-bottom border-danger border-3'>
                    <h2 className='text-center pillar'>Pillars Of Our College</h2>
                    <p className='text-center' style={{ fontSize: '20px' }}>Following are the most important members of our institution.</p>
                </div>
                <div id="carouselExampleFade" className="p-4 mt-3 carousel slide carousel-fade slid" data-bs-ride="carousel" >
                    <div className="carousel-inner" >
                        <div className={`carousel-item ${activeIndex === 0 ? "active" : ""} `}>
                            <div style={{ display: "flex", justifyContent:'center', gap:'2vw' }} className="slide-box">
                                <div className="col" style={{ maxWidth: '250px' }}>
                                    <div className="card">
                                        <img src={`./images/${props.campus ? 'user2.png' : 'user.gif'}`} className="card-img-top" alt="Director" />
                                        <div className="card-body txts">
                                            <h5 className="card-title">Name</h5>
                                            <p>Director</p>
                                            <p className="card-text"><i>"This is a longer card with supporting text below as a natural lead-in to additional content."</i></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col" style={{ maxWidth: '250px' }}>
                                    <div className="card">
                                        <img src={`./images/${props.campus ? 'user2.png' : 'user.gif'}`} className="card-img-top" alt="Director" />
                                        <div className="card-body txts">
                                            <h5 className="card-title">Name</h5>
                                            <p>Director</p>
                                            <p className="card-text"><i>"This is a longer card with supporting text below as a natural lead-in to additional content."</i></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col" style={{ maxWidth: '250px' }}>
                                    <div className="card">
                                        <img src={`./images/${props.campus ? 'user2.png' : 'user.gif'}`} className="card-img-top" alt="Director" />
                                        <div className="card-body txts">
                                            <h5 className="card-title">Name</h5>
                                            <p>Director</p>
                                            <p className="card-text"><i>"This is a longer card with supporting text below as a natural lead-in to additional content."</i></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`carousel-item ${activeIndex === 1 ? "active" : ""}`}>
                            <div style={{ display: "flex", justifyContent:'center', gap:'2vw' }} className="slide-box">
                                <div className="col" style={{ maxWidth: '250px' }}>
                                    <div className="card">
                                        <img src={`./images/${props.campus ? 'user2.png' : 'user.gif'}`} className="card-img-top" alt="Director" />
                                        <div className="card-body txts">
                                            <h5 className="card-title">Name</h5>
                                            <p>Director</p>
                                            <p className="card-text"><i>"This is a longer card with supporting text below as a natural lead-in to additional content."</i></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col" style={{ maxWidth: '250px' }}>
                                    <div className="card">
                                        <img src={`./images/${props.campus ? 'user2.png' : 'user.gif'}`} className="card-img-top" alt="Director" />
                                        <div className="card-body txts">
                                            <h5 className="card-title">Name</h5>
                                            <p>Director</p>
                                            <p className="card-text"><i>"This is a longer card with supporting text below as a natural lead-in to additional content."</i></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col" style={{ maxWidth: '250px' }}>
                                    <div className="card">
                                        <img src={`./images/${props.campus ? 'user2.png' : 'user.gif'}`} className="card-img-top" alt="Director" />
                                        <div className="card-body txts">
                                            <h5 className="card-title">Name</h5>
                                            <p>Trusty</p>
                                            <p className="card-text"><i>"This is a longer card with supporting text below as a natural lead-in to additional content."</i></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button style={{backgroundColor:'#e0e6eba8'}} className="carousel-control-prev" onClick={() => { updateIndex(activeIndex - 1); }} type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" ></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button style={{backgroundColor:'#e0e6eba8'}} className="carousel-control-next" onClick={() => { updateIndex(activeIndex + 1); }} type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next" >
                        <span className="carousel-control-next-icon" aria-hidden="true" ></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Members;
