import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FeeStructure from '../FeeStructure';
import { useSelector } from 'react-redux';

const UpdateFeeStructure = () => {
    const authData = useSelector(state => state.Reducer);
    const [className, setClassName] = useState('');
    const [fees, setFees] = useState([{ feeType: '', feeAmount: '' }]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setFees([{ feeType: '', feeAmount: '' }]);
        setClassName('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/api/${authData.campus==='khaga'?'feeKhagha':'fee'}/addFee`, { className, fees });
        } catch (error) {
            alert('Error adding fee details');
        }
        setFees([{ feeType: '', feeAmount: '' }]);
        setClassName('');
        handleClose();
    };

    const handleAddFee = () => {
        setFees([...fees, { feeType: '', feeAmount: '' }]);
    };

    const handleFeeChange = (index, e) => {
        const { name, value } = e.target;
        const newFees = [...fees];
        newFees[index][name] = value;
        setFees(newFees);
    };

    return (
        <>
            <div>
                <div className='d-flex justify-content-between'>
                    <h1 className='container'>Fee Structure</h1>
                    <Button variant="primary" onClick={handleShow}>Add New</Button>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Fee Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5 style={{ display: 'inline' }}>Class : </h5>
                        <input type="text" value={className} onChange={(e) => setClassName(e.target.value)} />
                        <h5 className='mt-3'>Fees :-</h5>
                        {fees.map((fee, index) => (
                            <div className='d-flex gap-3 mb-3' key={index}>
                                <input type="text" name="feeType" value={fee.feeType} onChange={(e) => handleFeeChange(index, e)} placeholder="Fee Type" />
                                <input type="number" name="feeAmount" value={fee.feeAmount} onChange={(e) => handleFeeChange(index, e)} placeholder="Fee Amount" />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddFee}>New Fee</button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}> Close </Button>
                        <Button variant="primary" onClick={handleSubmit}> Save </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <FeeStructure campus={authData.campus==='khaga'} />
        </>
    );
};

export default UpdateFeeStructure;
