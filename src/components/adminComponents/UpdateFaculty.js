import React, { useContext, useState } from 'react';
import facultyContext from '../../context/faculty/facultyContext';
import FetchImages from '../../Functions/FetchImages';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FacultyCard from '../FacultyCard';
import { useSelector } from 'react-redux';

const UpdateFaculty = () => {
  const authData = useSelector(state => state.Reducer);
  const context = useContext(facultyContext);
  const { faculty, editImage, addImage, deleteImage } = context;

  const [image, setImage] = useState(null)
  const [description, setDescription] = useState({ name: '', designation: '', contact: '', mail: '', address: '', lastDegree: '' })
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { fetchImages } = FetchImages(`${authData.campus==='khaga'?'facultyKhagha':'faculty'}`, 'facultyImage');

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleDescriptionChange = (e) => {
    setDescription({ ...description, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    addImage(image, description.name, description.designation, description.contact, description.mail, description.address, description.lastDegree);
    fetchImages();
    setDescription({ name: '', designation: '', contact: '', mail: '', address: '', lastDegree: '' });
    document.getElementById("image").value = null;
    handleClose();
  };

  return (
    <>
      <div className='d-flex justify-content-between'>
        <h1 className='container'>Faculty Images</h1>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Faculty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <p className='px-2'><b>Add Image</b></p>
              <input className="form-control" type="file" id="image" name='image' accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="mb-3">
              <input type="text" placeholder='Name' className="form-control" id="name" name="name" value={description.name} onChange={handleDescriptionChange} />
            </div>
            <div className="mb-3">
              <input type="text" placeholder='Designation' className="form-control" id="designation" name="designation" value={description.designation} onChange={handleDescriptionChange} />
            </div>
            <div className="mb-3">
              <input type="text" placeholder='Contact' className="form-control" id="contact" name="contact" value={description.contact} onChange={handleDescriptionChange} />
            </div>
            <div className="mb-3">
              <input type="text" placeholder='Mail' className="form-control" id="mail" name="mail" value={description.mail} onChange={handleDescriptionChange} />
            </div>
            <div className="mb-3">
              <input type="text" placeholder='Address' className="form-control" id="address" name="address" value={description.address} onChange={handleDescriptionChange} />
            </div>
            <div className="mb-3">
              <input type="text" placeholder='Last Degree' className="form-control" id="lastDegree" name="lastDegree" value={description.lastDegree} onChange={handleDescriptionChange} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button type="submit" className="btn btn-primary" onClick={handleUpload}>Upload</button>
        </Modal.Footer>
      </Modal>
      <div>
        <FacultyCard deleteImage={deleteImage} banner={faculty} handleShow={handleShow} editImage={editImage} disp="faculty" For={authData.campus==='khaga'?'facultyKhagha':'faculty'} Function='facultyImage' />
      </div>
    </>
  )
}

export default UpdateFaculty
