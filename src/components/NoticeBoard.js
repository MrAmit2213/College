import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'react-quill/dist/quill.snow.css';
import '../css/Quill.css';

const host = "http://localhost:5000"

const NoticeBoard = (props) => {
  const [notice, setNotice] = useState([]);
  const [news, setNews] = useState({ id: '', etitle: '' });
  const [enews, setEnews] = useState('')
  const { deleteNote, editNote } = props;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateNews = (cnews) => {
    setNews({ id: cnews._id, etitle: cnews.title })
    setEnews(cnews.news)
    handleShow();
  }

  const fetchNews = () => {
    fetch(`${host}/api/${props.campus==='khaga'?'newsKhagha':'news'}/allNews`)
      .then((res) => res.json())
      .then((data) => setNotice(data.reverse()))
  };

  useEffect(() => {
    fetchNews();
  }, [notice]);

  const handleEdit = () => {
    editNote(news.id, news.etitle, enews)
    handleClose();
  }

  const handleDelete = (id) => {
    deleteNote(id);
  }

  const onChange = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value })
  }

  return (
    <div className='container mt-5' style={{ minHeight: "40vw" }}>
      <div className="card" style={{ width: '100%', marginTop: '30px' }}>
        <h3 className="card-header bg-warning">Notice Board</h3>
        <ul className="list-group list-group-flush">
          <div className="accordion" id="accordionExample">
            {notice.map((note, index) => (
              <div key={note._id}>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls="collapseTwo">
                      <b>{note.title}</b>
                    </button>
                  </h2>
                  <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <li className="accordion-body d-flex justify-content-between">
                      <div className="post__description" dangerouslySetInnerHTML={{ __html: note.news }} />
                      <div>
                        <div>
                          <i style={{ display: props.dis ? 'inline' : 'none' }} className="fa-solid fa-trash mx-2" onClick={() => { handleDelete(note._id) }} ></i>
                          <i style={{ display: props.dis ? 'inline' : 'none' }} className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNews(note) }} ></i>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="modal-body py-2">
                              <div>
                                <input type="text" className="form-control mb-3" id="etitle" name="etitle" value={news.etitle} onChange={onChange} />
                              </div>
                              <ReactQuill theme='snow'
                                value={enews}
                                className='mb-5 height'
                                placeholder='Notice Description'
                                onChange={setEnews}
                              />
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            <Button variant="primary" onClick={handleEdit}>
                              Save Changes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </li>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ul>
      </div>
    </div>
  )
}

export default NoticeBoard
