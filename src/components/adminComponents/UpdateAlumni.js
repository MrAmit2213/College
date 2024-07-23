import React, { useContext, useState } from 'react';
import alumniContext from '../../context/alumni/alumniContext';
import FetchImages from '../../Functions/FetchImages';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AlumniCard from '../AlumniCard';
import { useSelector } from 'react-redux';

const UpdateAlumni = () => {
  const authData = useSelector(state => state.Reducer);
  const context = useContext(alumniContext);
  const { alumni, editImage, addImage, deleteImage } = context;

  const [image, setImage] = useState(null)
  const [description, setDescription] = useState({ name: '', batch: '', marks:'' })
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { fetchImages } = FetchImages(`${authData.campus==='khaga'?'alumniKhagha':'alumni'}`, 'alumniImage');

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleDescriptionChange = (e) => {
    setDescription({ ...description, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    addImage(image, description.name, description.batch, description.marks);
    fetchImages();
    setDescription({ name: '', batch: '', marks:'' });
    document.getElementById("image").value = null;
    handleClose();
  };

  return (
    <>
      <div className='d-flex justify-content-between'>
        <h1 className='container'>Update Alumni</h1>
        <Button variant="primary" onClick={handleShow}>Add New</Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Alumni</Modal.Title>
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
              <input type="text" placeholder='Batch' className="form-control" id="batch" name="batch" value={description.batch} onChange={handleDescriptionChange} />
            </div>
            <div className="mb-3">
              <input type="text" placeholder='Marks' className="form-control" id="marks" name="marks" value={description.marks} onChange={handleDescriptionChange} />
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
        <AlumniCard deleteImage={deleteImage} banner={alumni} editImage={editImage} disp="alumni" For={authData.campus==='khaga'?'alumniKhagha':'alumni'} Function='alumniImage' />
      </div>
    </>
  )
}

export default UpdateAlumni
