import React, { useEffect, useState } from 'react'
import FetchImages from '../Functions/FetchImages';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useLocation } from 'react-router-dom';
import '../css/faculty.css';

const FacultyCard = (props) => {
    let location = useLocation();
    const { images, fetchImages } = FetchImages(props.For, props.Function);
    const [ search, setSearch ] = useState('')
    const [img, setImg] = useState({ id: '', ename: '', edesignation: '', econtact: '', email: '', eaddress: '', elastDegree: '' })
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const updateImg = (currentImg) => {
        handleShow();
        setImg({ id: currentImg._id, ename: currentImg.name, edesignation: currentImg.designation, econtact: currentImg.contact, email: currentImg.mail, eaddress: currentImg.address, elastDegree: currentImg.lastDegree })
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
            await props.editImage(img.id, img.ename, img.edesignation, img.econtact, img.email, img.eaddress, img.elastDegree);
            handleClose();

            // Fetch updated images after saving changes
            fetchImages();
        } catch (error) {
            console.error('Error updating image:', error);
        }
    };

    const onChange = (e) => {
        setImg({ ...img, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className='container mt-0'>
                <h1 className='mt-4 mb-5 titl'>{props.title}</h1>
                <div className="gap-4 cen" style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {(location.pathname === "/faculty" || location.pathname === "/khagaFaculty" ) && images.map((im) => (
                        <div key={im._id} className="card" style={{ width: '13rem' }}>
                            <img src={`data:image/jpeg;base64,${im.imgData}`} className="card-img-top crd object-fit-cover" alt="Alumni img" />
                            <div className="card-body d-flex justify-content-between">
                                <div className='details'>
                                    <p className="sz card-text"><b>{im.name}</b></p>
                                    <p className="sz card-text text-secondary">{im.designation}</p>
                                    <p className="sz card-text"><i className="fa-solid fa-phone"></i> : {im.contact}</p>
                                    <p className="sz card-text"><i className="fa-solid fa-envelope"></i> : {im.mail}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {location.pathname === "/admin/updateFaculty" &&
                        <div>
                            <Form>
                                <InputGroup className='my-3 gap-2'>
                                    <Form.Control className='rounded' onChange={(e) => setSearch(e.target.value)} placeholder='Search' />
                                    <Button className='rounded' variant="primary" onClick={props.handleShow}>Add New</Button>
                                </InputGroup>
                            </Form>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Designation</th>
                                        <th>Contact</th>
                                        <th>Mail</th>
                                        <th>Address</th>
                                        <th>Last Degree</th>
                                        <th>--</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {images.filter((im) => {
                                        return search.toLowerCase() === '' ? im : im.name.toLowerCase().includes(search.toLowerCase())
                                    }).map((im) => (
                                        <tr key={im._id}>
                                            <td><img src={`data:image/jpeg;base64,${im.imgData}`} className="object-fit-cover" alt="Alumni img" /></td>
                                            <td>{im.name}</td>
                                            <td>{im.designation}</td>
                                            <td>{im.contact}</td>
                                            <td>{im.mail}</td>
                                            <td>{im.address}</td>
                                            <td>{im.lastDegree}</td>
                                            <td>
                                                <div>
                                                    <i style={{ display: location.pathname === "/admin/updateFaculty" ? 'inline' : 'none' }} className="fa-solid fa-trash mx-2" onClick={() => { handleDelete(im._id) }} ></i>
                                                    <i style={{ display: location.pathname === "/admin/updateFaculty" ? 'inline' : 'none' }} className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateImg(im) }}></i>

                                                    <Modal show={show} onHide={handleClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Update Faculty Details</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <div className="mb-3">
                                                                <input type="text" className="form-control" id="ename" name="ename" value={img.ename} onChange={onChange} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <input type="text" className="form-control" id="edesignation" name="edesignation" value={img.edesignation} onChange={onChange} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <input type="text" className="form-control" id="econtact" name="econtact" value={img.econtact} onChange={onChange} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <input type="text" className="form-control" id="email" name="email" value={img.email} onChange={onChange} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <input type="text" className="form-control" id="eaddress" name="eaddress" value={img.eaddress} onChange={onChange} />
                                                            </div>
                                                            <div className="mb-3">
                                                                <input type="text" className="form-control" id="elastDegree" name="elastDegree" value={img.elastDegree} onChange={onChange} />
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
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default FacultyCard
