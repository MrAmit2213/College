import React, { useContext, useState } from 'react';
import timeTableContext from '../../context/timeTable/timeTableContext';
import ImageCard from '../ImageCard';
import FetchImages from '../../Functions/FetchImages';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

const UpdateTimeTable = () => {
  const authData = useSelector(state => state.Reducer);
  const context = useContext(timeTableContext);
  const { timeTable, editImage, addImage, deleteImage } = context;

  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { fetchImages } = FetchImages(`${authData.campus==='khaga'?'timeTableKhagha':'timeTable'}`, 'timeTable');


  const handleUpload = async (e) => {
    e.preventDefault();
    addImage(image, description);
    fetchImages();
    setDescription('');
    document.getElementById("image").value = null;
    handleClose();
  };

  const onChange = (e) => {
    setDescription(e.target.value)
  }
  const onchange = (e) => {
    setImage(e.target.files[0])
  }
  return (
    <>
      <div className='d-flex justify-content-between'>
        <h1 className='container'>Time-Tables</h1>
        <Button variant="primary" onClick={handleShow}>Add New</Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Time Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <p className='px-2'><b>Image of TimeTable</b></p>
              <input className="form-control" type="file" id="image" name='image' accept="image/*" onChange={onchange} />
            </div>
            <div className="mb-3">
              <input type="text" placeholder='Class' className="form-control" id="description" name="description" value={description} onChange={onChange} />
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
        <ImageCard deleteImage={deleteImage} banner={timeTable} editImage={editImage} For={authData.campus==='khaga'?'timeTableKhagha':'timeTable'} Function='timeTable' disp="true" fetchImages={fetchImages} />
      </div>
    </>
  )
}

export default UpdateTimeTable
