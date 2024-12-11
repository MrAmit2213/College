import React, { useEffect, useState } from 'react'
import FetchImages from '../Functions/FetchImages';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useLocation } from 'react-router-dom';
import '../css/facility.css'

const FacilityCard = (props) => {
    let location = useLocation();
    const { images, fetchImages } = FetchImages(props.For, props.Function);
    const [img, setImg] = useState({ id: '', etitle: '', edescription: '' })
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const updateImg = (currentImg) => {
        handleShow();
        setImg({ id: currentImg._id, etitle: currentImg.title, edescription: currentImg.description })
    }

    useEffect(() => {
        fetchImages();
        // eslint-disable-next-line
    }, [images]);

    const handleDelete = (id) => {
        props.deleteImage(id);
        fetchImages();
    };

    const handleSaveChanges = async () => {
        try {
            await props.editImage(img.id, img.etitle, img.edescription);

            // // Fetch updated images after saving changes
            fetchImages();
            handleClose();
        } catch (error) {
            console.error('Error updating image:', error);
        }
    };

    const onChange = (e) => {
        setImg({ ...img, [e.target.name]: e.target.value });
    };

    return (
        <div className='container mt-4'>
            <h1 className='mb-5 ms-2 titl'>{props.title}</h1>
            <div className='gap-4 cen' style={{ display: 'flex', flexWrap: 'wrap' }}>
                {images.map((im) => (
                    <div key={im._id} className="card wid">
                        <img src={`data:image/jpeg;base64,${im.imgData}`} className="card-img-top img object-fit-cover" alt="facility img" />
                        <div className="card-body d-flex justify-content-between flex-column">
                            <div className='details'>
                                <p className="card-title title"><b>{im.title}</b></p>
                                <p className="card-text text-secondary">{im.description}</p>
                            </div>
                            <div>
                                <i style={{ display: location.pathname === "/admin/updateFacilities" ? 'inline' : 'none' }} className="fa-solid fa-trash mx-2" onClick={() => { handleDelete(im._id) }} ></i>
                                <i style={{ display: location.pathname === "/admin/updateFacilities" ? 'inline' : 'none' }} className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateImg(im) }}></i>
                            </div>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Update Faculty Details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" id="etitle" name="etitle" value={img.etitle} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" id="edescription" name="edescription" value={img.edescription} onChange={onChange} />
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleSaveChanges}>
                                        Update
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FacilityCard
