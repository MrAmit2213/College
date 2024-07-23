import React from 'react';
import { useLocation } from 'react-router-dom';

const FeeCard = (props) => {
    let location = useLocation();

    return (
        <div>
            <div className="card" style={{ width: '16rem' }}>
                <div className="card-body bg-secondary d-flex justify-content-between">
                    <h5 className="card-title">{props.class}</h5>
                    {location.pathname === "/admin/updateFeeStructure" &&
                        <i className="fa-solid fa-trash mx-2" onClick={() => { props.handleDelete(props.id) }} ></i>
                    }
                </div>
                <ul className="list-group list-group-flush">
                    {props.fees.map((f, index) => (
                        <li className="list-group-item text-center" key={index}>{f.feeType} -  {f.feeAmount}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default FeeCard