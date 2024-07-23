import React, { useContext, useState } from 'react';
import facilitiesContext from '../../context/Facilities/facilitiesContext';
import FetchImages from '../../Functions/FetchImages';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FacilityCard from '../FacilityCard';
import { useSelector } from 'react-redux';

const UpdateFacilities = () => {
  const authData = useSelector(state => state.Reducer);
  const context = useContext(facilitiesContext);
  const { facilities, editImage, addImage, deleteImage } = context;

  const [image, setImage] = useState(null)
  const [description, setDescription] = useState({ title: '', description: '' })
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { fetchImages } = FetchImages(`${authData.campus==='khaga'?'facilitiesKhagha':'facilities'}`, 'facilitiesImage');

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleDescriptionChange = (e) => {
    setDescription({ ...description, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    addImage(image, description.title, description.description);
    fetchImages();
    setDescription({ title: '', description: '' });
    document.getElementById("image").value = null;
    handleClose();
  };
  
  return (
    <>
      <div className='d-flex justify-content-between'>
        <h1 className='container'>Infrastructure</h1>
        <Button variant="primary" onClick={handleShow}>Add New</Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Facilities</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <p className='px-2'><b>Add Image</b></p>
              <input className="form-control" type="file" id="image" name='image' accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="mb-3">
              <input type="text" placeholder='Title' className="form-control" id="title" name="title" value={description.title} onChange={handleDescriptionChange} />
            </div>
            <div className="mb-3">
              <input type="text" placeholder='Description' className="form-control" id="description" name="description" value={description.description} onChange={handleDescriptionChange} />
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
        <FacilityCard deleteImage={deleteImage} banner={facilities} editImage={editImage} disp="facilities" For={authData.campus==='khaga'?'facilitiesKhagha':'facilities'} Function='facilitiesImage'/>
      </div>
    </>
  )
}

export default UpdateFacilities
