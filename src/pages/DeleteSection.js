import React, { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

const DeleteSection = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(()=> {
        fetch(`http://localhost:4001/api/deletesection/${id}`,{
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(data => {
    Swal.fire({
      icon:'success',
      text: 'Section successfully deleted!'
    })
    
  })
  .catch(err=> {
    return false
  })
    })
  return (
        <Navigate to='/teacher' />
  )
}

export default DeleteSection