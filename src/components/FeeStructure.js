import React, { useEffect, useState } from 'react'
import FeeCard from './FeeCard'
import axios from 'axios';

const FeeStructure = (props) => {
  const [fees, setFees] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/${props.campus?'feeKhagha':'fee'}/getFee`);
      const sortedFees = response.data.sort((a, b) => a.className.localeCompare(b.className));
      setFees(sortedFees);
    } catch (error) {
      console.error('Error fetching fee data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fees]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/${props.campus?'feeKhagha':'fee'}/deleteFee/${id}`);
      
      // After deletion, fetch updated data
      fetchData();
    } catch (error) {
      alert('Error deleting class details');
    }
  };

  return (
    <div className='container mt-3'>
      <h1 className='mb-5'>{props.title}</h1>
      <div className='d-flex flex-wrap gap-5'>
        {fees.map((fee) => (
          <div key={fee._id}>
            <FeeCard campus={props.campus} handleDelete={handleDelete} id={fee._id} class={fee.className} fees={fee.fees} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeeStructure
