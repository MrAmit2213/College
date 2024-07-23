import React, { useEffect, useState } from 'react';
import FetchImages from '../Functions/FetchImages';
import '../css/banner.css'

const Banner = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { images } = FetchImages(`${props.campus?'bannerKhagha':'banner'}`,'bannerImage');

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [images]);

    // Function to handle manual slide change of the banner
    const handleSlideChange = (index) => {
        setActiveIndex(index);
    };

    return (
        <div id="carouselExampleCaptions" className="carousel slide banner">
            <div className="carousel-indicators">
                {images.map((item, index) => (
                    <button key={index} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} className={index === activeIndex ? 'active' : ''} onClick={() => handleSlideChange(index)} aria-current={index === activeIndex ? 'true' : 'false'} aria-label={`Slide ${index + 1}`} ></button>
                ))}
            </div>
            <div className="carousel-inner" style={{ height: '100%' }}>
                {images.map((image, index) => (
                    <div key={index} className={index === activeIndex ? 'carousel-item active' : 'carousel-item'} style={{ height: '100%', textAlign: 'center' }}>
                        <img src={`data:image/jpeg;base64,${image.imgData}`} className="d-block w-100 image-fluid" style={{ height: '100%', maxWidth: '100%' }} alt={image.description} />
                        <div className="carousel-caption d-none d-md-block">
                            {/* <h5>This is title</h5> */}
                            <h5 className='pb-3'>{image.description}</h5>
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev" onClick={() => handleSlideChange((activeIndex - 1 + images.length) % images.length)}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next" onClick={() => handleSlideChange((activeIndex + 1) % images.length)}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Banner;
