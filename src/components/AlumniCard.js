import React, { useEffect, useState } from 'react'
import FetchImages from '../Functions/FetchImages';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useLocation } from 'react-router-dom';

function AlumniCard(props) {

    let location = useLocation();
    const { images, fetchImages } = FetchImages(props.For, props.Function);
    const [img, setImg] = useState({ id: '', ename: '', ebatch: '', emarks: '' })
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const updateImg = (currentImg) => {
        handleShow();
        setImg({ id: currentImg._id, ename: currentImg.name, ebatch: currentImg.batch, emarks: currentImg.marks })
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
            await props.editImage(img.id, img.ename, img.ebatch, img.emarks);
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
            <h1 className='mb-5 titl'>{props.title}</h1>
            <div className='gap-4 cen' style={{ display: 'flex', flexWrap: 'wrap' }}>
                {images.map((im) => (
                    <div key={im._id} className="card" style={{ width: '13rem' }}>
                        <img src={`data:image/jpeg;base64,${im.imgData}`} className="card-img-top" alt="Alumni img" />
                        <div className="card-body">
                            <div>
                                <p style={{fontSize:'13px'}} className="card-text mb-0"><b>{im.name}</b></p>
                                <p style={{fontSize:'13px'}} className="card-text mb-0">{im.batch}</p>
                                <p style={{fontSize:'13px'}} className="card-text mb-0">{im.marks}</p>
                                <i style={{ display: location.pathname === "/admin/updateAlumni" ? 'inline' : 'none' }} className="fa-solid fa-trash mx-2" onClick={() => { handleDelete(im._id) }} ></i>
                                <i style={{ display: location.pathname === "/admin/updateAlumni" ? 'inline' : 'none' }} className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateImg(im) }}></i>
                            </div>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Update Alumni Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="ename" name="ename" value={img.ename} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="ebatch" name="ebatch" value={img.ebatch} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="emarks" name="emarks" value={img.emarks} onChange={onChange} />
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
                ))}
            </div>
        </div>
    )
}

export default AlumniCard
