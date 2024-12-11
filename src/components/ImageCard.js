import React, { useEffect,  useState } from 'react'
import FetchImages from '../Functions/FetchImages';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ImageCard = (props) => {

  const { images, fetchImages } = FetchImages(props.For, props.Function);
  const [img, setImg] = useState({ id: '', edescription: '' })
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateImg = (currentImg) => {
    handleShow();
    setImg({ id: currentImg._id, edescription: currentImg.description })
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
      await props.editImage(img);

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
    <div className='container mt-3'>
      <h1 className='mb-5 titl'>{props.title}</h1>
      <div className="gap-4 cen" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((im) => (
          <div key={im._id} className="card" style={{ width: '18rem' }}>
            <img src={`data:image/jpeg;base64,${im.imgData}`} className="card-img-top object-fit-cover" alt="Some img" />
            <div className="card-body">
              <p className="card-text">{im.description}</p>
              <i style={{ display: props.disp ? 'inline' : 'none' }} className="fa-solid fa-trash mx-2" onClick={() => { handleDelete(im._id) }} ></i>
              <i style={{ display: props.disp ? 'inline' : 'none' }} className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateImg(im) }}></i>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <div className="mb-3">
                      <input type="text" placeholder='Description' className="form-control" id="edescription" name="edescription" value={img.edescription} onChange={onChange} />
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <button type="submit" className="btn btn-primary" onClick={handleSaveChanges}>Save Changes</button>
                </Modal.Footer>
              </Modal>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageCard
