import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AdminCard from './AdminCard';
import adminContext from '../../context/admin/adminContext';

const AddAdmin = () => {
  const context = useContext(adminContext);
  const { admins, addAdmin, deleteAdmin, editAdmin } = context;

  const [credentials, setCredentials] = useState({ name: "", email: "", contact: "", address: "", password: "", cpassword: "" });
  const [newShow, setNewShow] = useState(false);
  const [errMsg, setErrMsg] = useState('')

  const handleNewClose = () => {
    setNewShow(false);
    setCredentials({ name: '', email: '', contact: "", address: "", password: '', cpassword: '' })
  }
  const handleNewShow = () => setNewShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      setErrMsg('Password and Confirm Password does not match.')
      return 0;
    }

    const { name, email, contact, address, password } = credentials;
    const role = document.getElementById('role').value;
    const campus = document.getElementById('campus').value;
    addAdmin(name, email, contact, address, campus, role, password)
    handleNewClose();
    setCredentials({ name: '', email: '', contact: "", address: "", password: '', cpassword: '' })
    setErrMsg('')
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className='d-flex justify-content-between'>
        <h1 className='container'>Admins</h1>
        <Button variant="primary" onClick={handleNewShow}>Add New</Button>
      </div>

      <Modal show={newShow} onHide={handleNewClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name='name' value={credentials.name} onChange={onChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} required />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="contact" className="form-label">Contact</label>
              <input type="text" className="form-control" pattern='[0-9]{10}' id="contact" name='contact' value={credentials.contact} onChange={onChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" name='address' value={credentials.address} onChange={onChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Select the Role:</label>
              <select name="role" id="role">
                <option value="admin">Admin</option>
                <option value="owner">Owner</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="campus" className="form-label">Select the Campus:</label>
              <select name="campus" id="campus">
                <option value="khaga">Khaga</option>
                <option value="koderma">Koderma</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} required minLength={5} />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onChange} required minLength={5} />
              <p className='text-danger'>{errMsg}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleNewClose}>
            Close
          </Button>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Upload</button>
        </Modal.Footer>
      </Modal>

      <div className='container mt-5'>
        <AdminCard admins={admins} deleteAdmin={deleteAdmin} editAdmin={editAdmin} />
      </div>
    </>
  )
}

export default AddAdmin
