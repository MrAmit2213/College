import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const host = "http://localhost:5000"
const AdminCard = (props) => {
    const [admin, setAdmin] = useState([]);
    const [adm, setAdm] = useState({ id: '', ename: '', eemail: '', econtact: '', eaddress: '' })
    const [show, setShow] = useState(false);
    const { deleteAdmin, editAdmin } = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateAdm = (currentImg) => {
        handleShow();
        setAdm({ id: currentImg._id, ename: currentImg.name, eemail: currentImg.email, econtact: currentImg.contact, eaddress: currentImg.address })
    }

    const fetchAdmin = () => {
        fetch(`${host}/api/auth/getUser`)
            .then((res) => res.json())
            .then((data) => setAdmin(data))
    };

    useEffect(() => {
        fetchAdmin();
    }, [admin]);

    const handleDelete = (id) => {
        deleteAdmin(id);
    }

    const handleSaveChanges = async () => {
        try {
            await editAdmin(adm.id, adm.ename, adm.eemail, adm.econtact, adm.eaddress);
            handleClose();

            // Fetch updated images after saving changes
            fetchAdmin();
        } catch (error) {
            console.error('Error updating image:', error);
        }
    };

    const onChange = (e) => {
        setAdm({ ...adm, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>E-Mail</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th>Campus</th>
                        <th>Role</th>
                        <th>Added Date</th>
                        <th>--</th>
                    </tr>
                </thead>
                <tbody>
                    {admin.map((ad) => (
                        <tr key={ad._id}>
                            <td>{ad.name.substring(0, 1).toUpperCase().concat(ad.name.substring(1))}</td>
                            <td>{ad.email}</td>
                            <td>{ad.contact}</td>
                            <td>{ad.address.substring(0, 1).toUpperCase().concat(ad.address.substring(1))}</td>
                            <td>{ad.campus.substring(0, 1).toUpperCase().concat(ad.campus.substring(1))}</td>
                            <td>{ad.role.substring(0, 1).toUpperCase().concat(ad.role.substring(1))}</td>
                            <td>{ad.date.substring(0, 10)}</td>
                            <td>
                                <div>
                                    <i className="fa-solid fa-trash mx-2" onClick={() => { handleDelete(ad._id) }} ></i>
                                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateAdm(ad) }}></i>

                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Edit Admin Details</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="mb-3">
                                                <input type="text" className="form-control" id="ename" name="ename" value={adm.ename} onChange={onChange} />
                                            </div>
                                            <div className="mb-3">
                                                <input type="text" className="form-control" id="edesignation" name="edesignation" value={adm.eemail} onChange={onChange} />
                                            </div>
                                            <div className="mb-3">
                                                <input type="text" className="form-control" id="econtact" name="econtact" pattern='[0-9]{10}' value={adm.econtact} onChange={onChange} />
                                            </div>
                                            <div className="mb-3">
                                                <input type="text" className="form-control" id="eaddress" name="eaddress" value={adm.eaddress} onChange={onChange} />
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
    )
}

export default AdminCard
