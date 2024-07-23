import React, { useContext, useState } from 'react'
import noticeContext from '../../context/notice/noticeContext';
import NoticeBoard from '../NoticeBoard';
import ReactQuill from 'react-quill';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'react-quill/dist/quill.snow.css';
import '../../css/Quill.css'
import { useSelector } from 'react-redux';

const UpdateNoticeBoard = () => {
  const authData = useSelector(state => state.Reducer);
  const context = useContext(noticeContext);
  const { addNote, deleteNote, editNote, getNotes, notes } = context;

  const [note, setNote] = useState('')
  const [desc, setDesc] = useState('')

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note, desc);
    setNote('');
    setDesc('');
    handleClose();
  }

  const onChange = (e) => {
    setNote(e.target.value);
  }

  return (
    <div style={{ marginTop: '100px' }}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body py-2">
            <div>
              <input type="text" placeholder='Title' className="form-control mb-3" id="title" name="title" value={note} onChange={onChange} />
            </div>
            <ReactQuill theme='snow'
              value={desc}
              className='mb-5 height'
              placeholder='Notice Description'
              onChange={setDesc}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='mt-0 mb-0'>
        <div className='d-flex justify-content-between'>
          <h1 className='container text-center'><u>All Notices</u></h1>
          <button style={{ fontSize: '15px' }} type="button" className="btn btn-primary" onClick={handleShow} >
            Add New
          </button>
        </div>
        <NoticeBoard dis='true' campus={authData.campus === 'khaga' ? 'khaga' : 'news'} notes={notes} getNotes={getNotes} deleteNote={deleteNote} editNote={editNote} />
      </div>
    </div>
  )
}

export default UpdateNoticeBoard
